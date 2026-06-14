'use client';

import { useEffect, useRef } from 'react';

// Antigravity / "BreathDearMedusae"-inspired background.
// A dense, UNIFORM grid of dots rendered in ONE WebGL draw call — the GPU computes
// every dot's breathing flow + cursor-repel in parallel (vertex shader), so it stays
// smooth even with thousands of dots. Falls back to the plain CSS gradient if WebGL
// is unavailable or the user prefers reduced motion.
const VERT = `
attribute vec2 a_pos;
attribute float a_rand;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_dpr;
uniform float u_scroll;
varying float v_red;
varying float v_alpha;
void main() {
  vec2 p = a_pos;
  float t = u_time;
  vec2 q = a_pos * 0.006;
  // layered fluid flow — slow, organic, non-repetitive wandering (never static)
  vec2 disp;
  disp.x = sin(q.y + t * 0.6) + 0.5 * sin(q.y * 2.1 - t * 0.9 + q.x) + 0.3 * cos(q.x * 1.7 + t * 0.5);
  disp.y = cos(q.x + t * 0.5) + 0.5 * cos(q.x * 2.3 + t * 0.8 - q.y) + 0.3 * sin(q.y * 1.9 - t * 0.6);
  disp *= 14.0;
  // subtle scroll reaction (the only interaction on touch devices, no cursor there)
  disp.y += u_scroll;
  disp.x += sin(a_pos.y * 0.01 + t) * u_scroll * 0.3;
  // cursor repel: tiny strong core + very wide gentle gradient (affects more dots)
  vec2 toP = a_pos - u_mouse;
  float dist = length(toP);
  vec2 dir = dist > 0.001 ? toP / dist : vec2(0.0);
  float core = smoothstep(1.0, 0.0, dist);
  float halo = smoothstep(500.0, 0.0, dist);
  disp += dir * (core * 16.0 + halo * 8.0);
  p += disp;
  vec2 clip = (p / u_res) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (2.0 + a_rand * 1.6) * u_dpr;
  v_red = step(0.88, a_rand);
  v_alpha = 0.78 + a_rand * 0.22;
}`;

const FRAG = `
precision mediump float;
varying float v_red;
varying float v_alpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float edge = smoothstep(0.5, 0.25, d);
  vec3 col = vec3(0.0);
  gl_FragColor = vec4(col, v_alpha * edge);
}`;

const SPACING = 22; // px between dots — smaller = denser

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return; // no WebGL → CSS gradient/glow only

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const aPos = gl.getAttribLocation(program, 'a_pos');
    const aRand = gl.getAttribLocation(program, 'a_rand');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uDpr = gl.getUniformLocation(program, 'u_dpr');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');

    const posBuf = gl.createBuffer();
    const randBuf = gl.createBuffer();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let count = 0;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      count = cols * rows;
      const pos = new Float32Array(count * 2);
      const rnd = new Float32Array(count);
      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          pos[i * 2] = x * SPACING;
          pos[i * 2 + 1] = y * SPACING;
          rnd[i] = Math.random();
          i++;
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, randBuf);
      gl.bufferData(gl.ARRAY_BUFFER, rnd, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(aRand);
      gl.vertexAttribPointer(aRand, 1, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uDpr, dpr);
    };

    const mouse = { x: -1000, y: -1000 };
    const cur = { x: -1000, y: -1000 };
    const EASE = 0.15; // small lag — smooths the reaction without a slow tracker
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // scroll velocity → subtle field reaction (drives the effect on touch devices)
    let lastScroll = window.scrollY;
    let scrollVel = 0;
    const onScroll = () => {
      const y = window.scrollY;
      scrollVel += y - lastScroll;
      lastScroll = y;
      scrollVel = Math.max(-160, Math.min(160, scrollVel));
    };

    let raf = 0;
    let start = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      cur.x += (mouse.x - cur.x) * EASE;
      cur.y += (mouse.y - cur.y) * EASE;
      scrollVel *= 0.88; // decay so the slosh settles after scrolling stops
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uTime, ((now - start) / 1000) * 0.6);
      gl.uniform1f(uScroll, scrollVel * 0.08);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    build();

    if (reduce) {
      gl.uniform2f(uMouse, -1000, -1000);
      gl.uniform1f(uTime, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
      window.addEventListener('resize', build);
      return () => window.removeEventListener('resize', build);
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (!raf) {
        start = performance.now() - 1; // resume time roughly
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener('resize', build);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="ag-bg" aria-hidden="true">
      <div className="ag-glow" />
      <canvas ref={canvasRef} className="ag-canvas" />
      <div className="ag-veil" />
    </div>
  );
}
