'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import { Autoplay } from 'swiper/modules';

SwiperCore.use([Autoplay]);

export default function Carousel() {
    const products = [
        { name: 'Plastic Shopping Bags1', img: '/products/plastic_bag.jpg' },
        { name: 'Paper Bags', img: '/products/paper_bag.jpg' },
        { name: 'Plastic Pouches', img: '/products/plastic_pouch.jpg' },
        { name: 'Plastic Shopping Bags2', img: '/products/plastic_bag.jpg' },
        { name: 'Paper Bags2', img: '/products/paper_bag.jpg' },
    ];

    return (
        <section className="bg-white animate-fadeIn py-12 mt-10 ">
            <h2 className=" bg-[var(--brand-red)] text-white h-20 text-3xl font-bold text-center mb-10 flex items-center justify-center">
                Categories we cover
            </h2>

            <Swiper
                spaceBetween={24}  // slightly more spacing for breathing room
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                loop={true}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.name}>
                        <div className="group cursor-pointer max-w-xs mx-auto">
                            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                {/* Aspect ratio wrapper */}
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:brightness-90 transition duration-300"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-center text-gray-900">
                                {product.name}
                            </h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
