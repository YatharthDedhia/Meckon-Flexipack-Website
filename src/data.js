export const contacts = {
  company: {
    location: 'Mumbai, India',
    phone: '+91 9820010127',
    email: 'meckonflexipack@gmail.com',
    address: "Shop No. 3, Moreshwar Dham CHS, Liberty Garden, Somwari Bazar, Cross Rd Number 3, Malad West, Mumbai-400064",
    gstin: "GSTIN: 27AAPFM3217Q1ZN",
  },
  team: [
    { name: 'Yomesh Dedhia', email: 'yomesh@gmail.com', phone: '+91 9820010127' },
    { name: 'Rashesh Dedhia', email: 'raddedhia@gmail.com', phone: '+91 9892533324' },
  ],
};

export const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Products', href: '/products' },
];

export const pageContent = {
  hero: {
    title: 'Meckon Flexipack,',
    subtitle: 'Redefining packaging excellence.',
    paragraphs: [
      "With decades of expertise, we deliver innovative and sustainable packaging solutions designed to elevate your brand.",
      "Beyond aesthetics, we focus on functionality, durability, and environmental responsibility—partnering with you from concept to production.",
      "Whether carry bags, flexible packaging, or custom solutions, Meckon Flexipack uses cutting-edge technology and sustainable materials to meet today's demands."
    ],
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
    heroImage: '/hero1.jpg'
  },
  about: {
    heading: 'About The Company',
    paragraphs: [
      "Meckon Flexipack has been a leader in the packaging industry for over 35 years, delivering innovative and sustainable packaging solutions worldwide. Specializing in both paper and plastic packaging products such as carry bags, flexible packaging films, and custom printed solutions, we are committed to helping brands enhance their customer experience while reducing environmental impact.",
      "Our team leverages cutting-edge technology and a deep understanding of materials to create packaging that not only looks exceptional but also offers durability and functionality tailored to meet diverse market needs. Sustainability remains at the core of our mission, as we strive to provide eco-friendly alternatives that support a circular economy."
    ],
    image: '/logo.png'
  },
  history: {
    heading: 'Our History',
    paragraphs: [
      "Founded in the 1980s, Meckon Flexipack started as a small packaging manufacturer and has evolved into a trusted global provider. Through decades of growth, we have continuously adapted to the changing market needs while maintaining the highest standards of quality and innovation.",
      "From humble beginnings focused on simple plastic bags, we expanded into the paper packaging sector, responding to the growing demand for sustainable packaging options. Our journey reflects our commitment to innovation, customer satisfaction, and environmental stewardship."
    ]
  }
};


export const stats = [
  { value: '35+', label: 'Years Experience' },
  { value: '10k+', label: 'Unique Customers' },
  { value: '20k+', label: 'Projects Completed' },
  { value: '20+', label: 'High Quality Products' }
];

export const clients = [
  { name: 'Client A', logo: '/clients/client1.png' },
  { name: 'Client B', logo: '/clients/client1.png' },
  { name: 'Client C', logo: '/clients/client1.png' },
  { name: 'Client D', logo: '/clients/client1.png' },
  { name: 'Client E', logo: '/clients/client1.png' },
  { name: 'Client F', logo: '/clients/client1.png' }
];

export const productsData = {
  categories: [
    {
      name: 'Plastic Bags',
      id: 'plasticbags',
      link: '/products#plasticbags',
      overview: { name: 'Plastic Bags', img: '/products/plastic_bag.jpg' },
      products: [
        { name: 'Clear Plastic Bag', img: '/products/plastic_bag.jpg' },
        { name: 'Zip Lock Plastic Bag', img: '/products/plastic_bag.jpg' },
        { name: 'Biodegradable Plastic Bag', img: '/products/plastic_bag.jpg' },
      ],
    },
    {
      name: 'Flexible Packaging',
      id: 'flexiblepackaging',
      link: '/products#flexiblepackaging',
      overview: { name: 'Flexible Packaging', img: '/products/flexible_packaging.png' },
      products: [
        { name: 'Stand-up Pouch', img: '/products/flexible_packaging.png' },
        { name: 'Resealable Bag', img: '/products/flexible_packaging.png' },
        { name: 'Vacuum Sealed Bag', img: '/products/flexible_packaging.png' },
        { name: 'Printed Flexible Film', img: '/products/flexible_packaging.png' },
        { name: 'Retort Pouch', img: '/products/flexible_packaging.png' },
      ],
    },
  ]
};
