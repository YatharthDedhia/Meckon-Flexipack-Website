import Carousel from '@/components/Carousel';
import Categories from '@/components/Categories';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen">
      {/* Image for small devices: above the text */}
      <div className="block md:hidden w-full h-60 relative">
        <Image
          src="/hero1.jpg"
          alt="Packaging products showcase"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Fixed background image for md+ devices */}
      <div className="hidden md:block fixed inset-0 -z-10">
        <Image
          src="/hero1.jpg"
          alt="Packaging products showcase"
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      {/* Content container */}
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-end md:pr-0 h-full max-w-7xl mx-auto px-4 -my-10 py-0 md:py-10">
        <div className="md:bg-white text-[var(--brand-red)] rounded-md max-w-2xl w-full md:w-auto px-8 py-12 md:px-15 md:py-30 text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Meckon Flexipack,{' '}
            <span className="text-black">Redefining packaging excellence.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-800 max-w-lg mx-auto md:mx-0">
            With <strong>decades of expertise</strong>, we deliver <strong>innovative</strong> and <strong>sustainable packaging solutions</strong> designed to elevate your brand.
          </p>

          <p className="mt-4 text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
            Beyond aesthetics, we focus on <strong>functionality</strong>, <strong>durability</strong>, and <strong>environmental responsibility</strong>—partnering with you from concept to production.
          </p>

          <p className="mt-4 text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
            Whether <strong>carry bags</strong>, <strong>flexible packaging</strong>, or <strong>custom solutions</strong>, Meckon Flexipack uses <strong>cutting-edge technology</strong> and <strong>sustainable materials</strong> to meet today's demands.
          </p>

          <a
            href="/contact"
            className="inline-block mt-10 border-2 border-[var(--brand-red)] text-[var(--brand-red)] px-8 py-3 rounded font-semibold hover:bg-[var(--brand-red)] hover:text-white transition-all duration-300"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </section>


      {/* About Section */}
      {/* <section className=" bg-white mx-auto px-4 py-16 my-12">
        <h2 className="text-3xl font-bold text-center text-[var(--brand-red)]">About Us</h2>
        <p className="mt-6 text-center max-w-3xl mx-auto text-gray-700">
          At Meckon Flexipack, we bring decades of expertise to redefine packaging experiences.
          From innovative designs and sustainable solutions to precision manufacturing, we craft
          packaging that amplifies your brand.
        </p>
      </section> */}

      {/* Stats */}
      <section className=" bg-white py-0 animate-fadeIn">
        <h2 className=" h-20 text-3xl font-bold  bg-[var(--brand-red)] text-white flex items-center justify-center">Our Experience</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center">
          {[
            { value: '35+', label: 'Years Experience' },
            { value: '10k+', label: 'Unique Customers' },
            { value: '20k+', label: 'Projects Completed' },
            { value: '20+', label: 'High Quality Products' }
          ].map((stat) => (
            <div
              key={stat.label}
              className="h-50 group transition-transform transform transition-colors duration-300 p-4 cursor-pointer hover:bg-[var(--brand-red)]"
            >
              <p className="mt-10 text-3xl font-bold text-[var(--brand-red)] group-hover:text-white transition-colors duration-300">{stat.value}</p>
              <p className="text-gray-700 group-hover:text-white transition-colors duration-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Products */}

      {/* <Carousel /> */}
      <Categories />


      {/* <section className="bg-white mx-auto animate-fadeIn"> */}
      {/* <h2 className="text-3xl font-bold text-center text-[var(--brand-red)] mb-8">Our Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Plastic Shopping Bags', img: '/products/plastic-bags.jpg' },
            { name: 'Compostable Bags', img: '/products/compostable-bags.jpg' },
            { name: 'Paper Bags', img: '/products/paper_bag.jpg' },
            { name: 'Flexible Packaging', img: '/products/flexible-packaging.jpg' },
            { name: 'Monocartons', img: '/products/monocartons.jpg' },
            { name: 'Rigid Box', img: '/products/rigid-box.jpg' },
            { name: 'Paper Cups', img: '/products/paper-cups.jpg' },
            { name: 'Corrugated Boxes', img: '/products/corrugated-boxes.jpg' },
          ].map((product) => (
            <div key={product.name} className="group cursor-pointer">
              <div className="border border-gray-300 rounded overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 hover:border-[var(--brand-red)]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:brightness-90 transition duration-300"
                />
              </div>
              <h3 className="mt-3 text-center font-semibold text-black">{product.name}</h3>
            </div>
          ))}
          </div> */}
      {/* </section> */}




      {/* Clients and Partners*/}
      <section className="bg-white mt-12 pb-10">
        <h2 className=" h-20 text-3xl font-bold  bg-[var(--brand-red)] text-white mb-12 flex items-center justify-center">Our Partners & Clients</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {[
            { name: 'Client A', logo: '/clients/client1.png' },
            { name: 'Client B', logo: '/clients/client1.png' },
            { name: 'Client C', logo: '/clients/client1.png' },
            { name: 'Client D', logo: '/clients/client1.png' },
            { name: 'Client E', logo: '/clients/client1.png' },
            { name: 'Client F', logo: '/clients/client1.png' }
          ].map(({ name, logo }) => (
            <div
              key={name}
              className="w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition duration-300 cursor-pointer"
              title={name}
            >
              <img
                src={logo}
                alt={name}
                className="max-h-25 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
