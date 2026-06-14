import { Resend } from 'resend';
import { getEmailConfig } from '@/lib/email-config';

export const runtime = 'nodejs';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function POST(req) {
  try {
    const { name, phone, email, company, message } = await req.json();

    if (!name || !message) {
      return Response.json({ success: false, error: 'Name and message are required.' }, { status: 400 });
    }

    const { resendApiKey: apiKey, contactEmail: to } = await getEmailConfig();
    if (!apiKey || !to) {
      console.error('Email not configured: missing Resend API key or recipient email');
      return Response.json({ success: false, error: 'Email is not configured on the server.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Meckon Website <onboarding@resend.dev>',
      to,
      replyTo: email || undefined,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2 style="color: #E20008;">New enquiry received</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Phone:</strong> ${esc(phone) || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email ? `<a href="mailto:${esc(email)}" style="color:#1a73e8;">${esc(email)}</a>` : 'Not provided'}</p>
          <p><strong>Company:</strong> ${esc(company) || 'Not provided'}</p>
          <hr style="border:none; border-top:1px solid #ddd; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.5;">${esc(message)}</p>
          <hr style="border:none; border-top:1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Sent from the Meckon Flexipack website contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ success: false, error: error.message || 'Failed to send email.' }, { status: 502 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
