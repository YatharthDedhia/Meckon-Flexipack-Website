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

// Why we are chosen — capability highlights surfaced on the home page
export const highlights = [
  {
    title: 'Sustainable Materials',
    description: 'Biodegradable, compostable and recyclable options engineered for a circular economy.',
    icon: 'leaf',
  },
  {
    title: 'Custom Printing',
    description: 'High-resolution flexographic & rotogravure printing to put your brand on every pack.',
    icon: 'print',
  },
  {
    title: 'In-House Manufacturing',
    description: 'Extrusion, lamination, sealing and finishing under one roof for tight quality control.',
    icon: 'factory',
  },
  {
    title: 'Food-Grade Compliance',
    description: 'FSSAI-compliant, food-safe films and pouches suitable for direct contact use.',
    icon: 'shield',
  },
];

export const stats = [
  { value: '35+', label: 'Years Experience' },
  { value: '10k+', label: 'Unique Customers' },
  { value: '20k+', label: 'Projects Completed' },
  { value: '25+', label: 'Product Variants' }
];

export const clients = [
  { name: 'FreshMart', logo: '/clients/client1.png' },
  { name: 'GreenLeaf Foods', logo: '/clients/client1.png' },
  { name: 'UrbanKart', logo: '/clients/client1.png' },
  { name: 'Spice Route', logo: '/clients/client1.png' },
  { name: 'DailyBasket', logo: '/clients/client1.png' },
  { name: 'PureHarvest', logo: '/clients/client1.png' },
  { name: 'MetroBazaar', logo: '/clients/client1.png' },
  { name: 'NovaRetail', logo: '/clients/client1.png' },
  { name: 'Coastal Organics', logo: '/clients/client1.png' },
  { name: 'Bombay Provisions', logo: '/clients/client1.png' },
];

export const productsData = {
  categories: [
    {
      name: 'Plastic Bags',
      id: 'plasticbags',
      link: '/products#plasticbags',
      description: 'Durable, lightweight carry and packing bags available in clear, coloured and eco-friendly grades.',
      overview: { name: 'Plastic Bags', img: '/products/plastic_bag.jpg' },
      products: [
        { name: 'Clear Plastic Bag', img: '/products/plastic_bag.jpg' },
        { name: 'Zip Lock Plastic Bag', img: '/products/plastic_bag.jpg' },
        { name: 'Biodegradable Plastic Bag', img: '/products/plastic_bag.jpg' },
        { name: 'D-Cut Shopping Bag', img: '/products/plastic_bag.jpg' },
        { name: 'HM Garbage Bag', img: '/products/plastic_bag.jpg' },
        { name: 'LD Liner Bag', img: '/products/plastic_bag.jpg' },
      ],
    },
    {
      name: 'Paper Bags',
      id: 'paperbags',
      link: '/products#paperbags',
      description: 'Premium kraft and printed paper bags — a sustainable, fully recyclable alternative to plastic.',
      overview: { name: 'Paper Bags', img: '/products/paper_bag.jpg' },
      products: [
        { name: 'Kraft Paper Bag', img: '/products/paper_bag.jpg' },
        { name: 'Handle Carry Bag', img: '/products/paper_bag.jpg' },
        { name: 'Grocery Paper Bag', img: '/products/paper_bag.jpg' },
        { name: 'Printed Paper Bag', img: '/products/paper_bag.jpg' },
        { name: 'Food-Grade Paper Bag', img: '/products/paper_bag.jpg' },
      ],
    },
    {
      name: 'Flexible Packaging',
      id: 'flexiblepackaging',
      link: '/products#flexiblepackaging',
      description: 'Multi-layer laminated films and pouches that protect, preserve and showcase your product.',
      overview: { name: 'Flexible Packaging', img: '/products/flexible_packaging.png' },
      products: [
        { name: 'Stand-up Pouch', img: '/products/flexible_packaging.png' },
        { name: 'Resealable Bag', img: '/products/flexible_packaging.png' },
        { name: 'Vacuum Sealed Bag', img: '/products/flexible_packaging.png' },
        { name: 'Printed Flexible Film', img: '/products/flexible_packaging.png' },
        { name: 'Retort Pouch', img: '/products/flexible_packaging.png' },
        { name: 'Three-Side Seal Pouch', img: '/products/flexible_packaging.png' },
      ],
    },
    {
      name: 'Plastic Pouches',
      id: 'plasticpouches',
      link: '/products#plasticpouches',
      description: 'Form-fit pouches for liquids, powders and granules with custom spouts, zippers and gussets.',
      overview: { name: 'Plastic Pouches', img: '/products/plastic_pouch.jpg' },
      products: [
        { name: 'Spout Pouch', img: '/products/plastic_pouch.jpg' },
        { name: 'Center-Seal Pouch', img: '/products/plastic_pouch.jpg' },
        { name: 'Gusseted Pouch', img: '/products/plastic_pouch.jpg' },
        { name: 'Transparent Packaging Pouch', img: '/products/plastic_pouch.jpg' },
        { name: 'Zipper Pouch', img: '/products/plastic_pouch.jpg' },
      ],
    },
    {
      name: 'Paper Packaging',
      id: 'paperpackaging',
      link: '/products#paperpackaging',
      description: 'Compostable wraps, cartons and paper pouches for food-service and retail brands.',
      overview: { name: 'Paper Packaging', img: '/products/paper_packaging.jpg' },
      products: [
        { name: 'Food Wrapping Paper', img: '/products/paper_packaging.jpg' },
        { name: 'Corrugated Carton', img: '/products/paper_packaging.jpg' },
        { name: 'Paper Pouch', img: '/products/paper_packaging.jpg' },
        { name: 'Compostable Packaging', img: '/products/paper_packaging.jpg' },
        { name: 'Custom Printed Carton', img: '/products/paper_packaging.jpg' },
      ],
    },
  ]
};
