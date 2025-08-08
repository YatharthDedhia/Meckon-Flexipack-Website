import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-red)] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Our Products</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/products#plasticbags" className="hover:underline">
                Plastic Bags
              </Link>
            </li>
            <li>
              <Link href="/products#paperbags" className="hover:underline">
                Paper Bags
              </Link>
            </li>
            <li>
              <Link href="/products#flexiblepackaging" className="hover:underline">
                Flexible Packaging
              </Link>
            </li>
            <li>
              <Link href="/products#monocartons" className="hover:underline">
                Monocartons
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="text-sm">Mumbai, India</p>
          <p className="text-sm">+91 9820010127</p>
          <p className="text-sm">meckonflexipack@gmail.com</p>
        </div>
      </div>
      <div className="text-center mt-6 text-xs">
        © {new Date().getFullYear()} Meckon Flexipack. All rights reserved.
      </div>
    </footer>
  );
}
