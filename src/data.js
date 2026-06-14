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

// Industries served — surfaced on the home page ("browse by market")
export const industries = [
  { name: 'Food & Beverage', description: 'Food-grade, FSSAI-compliant pouches, wraps and bags.', icon: 'food' },
  { name: 'FMCG & Retail', description: 'Branded carry bags and printed packaging for the shelf.', icon: 'retail' },
  { name: 'Pharmaceutical', description: 'Hygienic, tamper-evident packaging for healthcare products.', icon: 'pharma' },
  { name: 'Agriculture', description: 'Heavy-duty sacks and liners for produce and grains.', icon: 'agri' },
  { name: 'E-commerce', description: 'Durable mailers and courier bags for safe shipping.', icon: 'ecom' },
  { name: 'Apparel & Textiles', description: 'Clear and printed garment bags with a premium finish.', icon: 'apparel' },
];

// "How we work" — concept-to-production process
export const processSteps = [
  { step: 1, title: 'Concept & Consultation', description: 'We map your product, material and branding needs.', icon: 'concept' },
  { step: 2, title: 'Design & Printing', description: 'Custom artwork, printing and prototyping for your brand.', icon: 'design' },
  { step: 3, title: 'Manufacturing', description: 'Extrusion, lamination and sealing under one roof.', icon: 'manufacture' },
  { step: 4, title: 'Quality Check', description: 'Every batch inspected for durability and food safety.', icon: 'qc' },
  { step: 5, title: 'Delivery', description: 'On-time dispatch across India, from concept to doorstep.', icon: 'delivery' },
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
        { name: 'Clear Plastic Bag', img: '/products/plastic_bag.jpg', description: 'Everyday transparent bag for retail and general packing.', features: ['Transparent', 'Lightweight', 'Reusable', 'Custom sizes'], material: 'LDPE / HDPE', sizes: '6×8 in – 18×24 in', moq: '10,000 pcs', applications: 'Retail, grocery, general packing' },
        { name: 'Zip Lock Plastic Bag', img: '/products/plastic_bag.jpg', description: 'Resealable zipper bag that keeps contents fresh and secure.', features: ['Resealable', 'Airtight', 'Transparent', 'Reusable'], material: 'LDPE', sizes: '3×4 in – 12×15 in', moq: '10,000 pcs', applications: 'Food storage, hardware, stationery' },
        { name: 'Biodegradable Plastic Bag', img: '/products/plastic_bag.jpg', description: 'Compostable carry bag that breaks down naturally.', features: ['Compostable', 'Eco-friendly', 'CPCB-compliant', 'Printable'], material: 'Compostable bio-resin', sizes: '8×12 in – 16×20 in', moq: '20,000 pcs', applications: 'Retail, grocery, eco brands' },
        { name: 'D-Cut Shopping Bag', img: '/products/plastic_bag.jpg', description: 'Die-cut handle bag ideal for retail and boutiques.', features: ['Die-cut handle', 'Printable', 'Lightweight', 'Durable'], material: 'HDPE / LDPE', sizes: '10×14 in – 16×20 in', moq: '10,000 pcs', applications: 'Apparel, retail, events' },
        { name: 'HM Garbage Bag', img: '/products/plastic_bag.jpg', description: 'Heavy-grade liner for waste collection and disposal.', features: ['High-strength', 'Leak-proof', 'Bulk rolls', 'Colour-coded'], material: 'HM HDPE', sizes: '17×19 in – 30×37 in', moq: '25,000 pcs', applications: 'Hospitals, offices, municipal waste' },
        { name: 'LD Liner Bag', img: '/products/plastic_bag.jpg', description: 'Low-density liner for bins, drums and bulk packing.', features: ['Flexible', 'Leak-proof', 'Food-safe grade', 'Custom gauge'], material: 'LDPE', sizes: 'Custom to bin / drum', moq: '15,000 pcs', applications: 'Industrial, food, chemicals' },
      ],
    },
    {
      name: 'Paper Bags',
      id: 'paperbags',
      link: '/products#paperbags',
      description: 'Premium kraft and printed paper bags — a sustainable, fully recyclable alternative to plastic.',
      overview: { name: 'Paper Bags', img: '/products/paper_bag.jpg' },
      products: [
        { name: 'Kraft Paper Bag', img: '/products/paper_bag.jpg', description: 'Natural kraft bag, a sturdy recyclable alternative to plastic.', features: ['Recyclable', 'Biodegradable', 'Sturdy', 'Printable'], material: 'Kraft paper 80–150 gsm', sizes: 'Small – Extra large', moq: '5,000 pcs', applications: 'Retail, takeaway, gifting' },
        { name: 'Handle Carry Bag', img: '/products/paper_bag.jpg', description: 'Premium paper bag with twisted or flat handles.', features: ['Twisted handle', 'Premium finish', 'Custom-print', 'Recyclable'], material: 'Kraft / art paper', sizes: 'Boutique – shopping', moq: '5,000 pcs', applications: 'Apparel, boutiques, events' },
        { name: 'Grocery Paper Bag', img: '/products/paper_bag.jpg', description: 'Flat or satchel bag for grocery and produce.', features: ['Food-grade', 'Recyclable', 'Strong base', 'Economical'], material: 'Kraft paper', sizes: '0.5 kg – 5 kg', moq: '10,000 pcs', applications: 'Grocery, produce, bakery' },
        { name: 'Printed Paper Bag', img: '/products/paper_bag.jpg', description: 'Fully branded paper bag with custom artwork.', features: ['Custom-print', 'Multi-colour', 'Recyclable', 'Premium'], material: 'Art / kraft paper', sizes: 'Custom', moq: '5,000 pcs', applications: 'Brand retail, promotions' },
        { name: 'Food-Grade Paper Bag', img: '/products/paper_bag.jpg', description: 'Grease-resistant bag for direct food contact.', features: ['Food-safe', 'Grease-resistant', 'FSSAI-grade', 'Compostable'], material: 'Food-grade paper', sizes: 'Small – medium', moq: '10,000 pcs', applications: 'QSR, bakery, snacks' },
      ],
    },
    {
      name: 'Flexible Packaging',
      id: 'flexiblepackaging',
      link: '/products#flexiblepackaging',
      description: 'Multi-layer laminated films and pouches that protect, preserve and showcase your product.',
      overview: { name: 'Flexible Packaging', img: '/products/flexible_packaging.png' },
      products: [
        { name: 'Stand-up Pouch', img: '/products/flexible_packaging.png', description: 'Self-standing resealable pouch with strong shelf appeal.', features: ['Stand-up', 'Resealable zip', 'High barrier', 'Custom-print'], material: 'PET / PE laminate', sizes: '50 g – 1 kg', moq: '5,000 pcs', applications: 'Snacks, spices, pet food' },
        { name: 'Resealable Bag', img: '/products/flexible_packaging.png', description: 'Zip-seal flexible bag built for repeat use.', features: ['Resealable', 'Moisture barrier', 'Printable', 'Clear window'], material: 'PET / PE', sizes: '100 g – 1 kg', moq: '5,000 pcs', applications: 'Dry foods, nutraceuticals' },
        { name: 'Vacuum Sealed Bag', img: '/products/flexible_packaging.png', description: 'High-barrier pouch for extended shelf life.', features: ['Vacuum-grade', 'High barrier', 'Puncture-resistant', 'Food-safe'], material: 'Nylon / PE', sizes: 'Custom', moq: '10,000 pcs', applications: 'Meat, frozen, ready meals' },
        { name: 'Printed Flexible Film', img: '/products/flexible_packaging.png', description: 'Roll-form printed film for form-fill-seal lines.', features: ['Roll-stock', 'Rotogravure print', 'Custom gauge', 'High-speed FFS'], material: 'BOPP / PET / PE', sizes: 'Custom-width rolls', moq: '500 kg', applications: 'FMCG, dairy, confectionery' },
        { name: 'Retort Pouch', img: '/products/flexible_packaging.png', description: 'Sterilisable pouch for ready-to-eat retort foods.', features: ['Retort-grade', 'High barrier', 'Boil-safe', 'Custom-print'], material: 'PET / AL / PP laminate', sizes: '100 g – 500 g', moq: '10,000 pcs', applications: 'Ready meals, curries, gravies' },
        { name: 'Three-Side Seal Pouch', img: '/products/flexible_packaging.png', description: 'Economical flat pouch sealed on three sides.', features: ['Flat pouch', 'Tear-notch', 'Printable', 'Clear option'], material: 'PET / PE', sizes: 'Sachet – 250 g', moq: '10,000 pcs', applications: 'Samples, sachets, single-serve' },
      ],
    },
    {
      name: 'Plastic Pouches',
      id: 'plasticpouches',
      link: '/products#plasticpouches',
      description: 'Form-fit pouches for liquids, powders and granules with custom spouts, zippers and gussets.',
      overview: { name: 'Plastic Pouches', img: '/products/plastic_pouch.jpg' },
      products: [
        { name: 'Spout Pouch', img: '/products/plastic_pouch.jpg', description: 'Pouch with a spout for liquids and semi-liquids.', features: ['Spout cap', 'Leak-proof', 'Stand-up', 'Custom-print'], material: 'PET / PE laminate', sizes: '100 ml – 1 L', moq: '10,000 pcs', applications: 'Juices, sauces, detergents' },
        { name: 'Center-Seal Pouch', img: '/products/plastic_pouch.jpg', description: 'Back-seam pillow pouch for granular products.', features: ['Pillow seal', 'Economical', 'Printable', 'FFS-ready'], material: 'BOPP / PE', sizes: 'Custom', moq: '10,000 pcs', applications: 'Snacks, grains, powders' },
        { name: 'Gusseted Pouch', img: '/products/plastic_pouch.jpg', description: 'Side / bottom gusset pouch for higher fill volume.', features: ['Side gusset', 'High capacity', 'Stable base', 'Printable'], material: 'PET / PE', sizes: '250 g – 5 kg', moq: '10,000 pcs', applications: 'Flour, rice, pet food' },
        { name: 'Transparent Packaging Pouch', img: '/products/plastic_pouch.jpg', description: 'Crystal-clear pouch that showcases the product inside.', features: ['Crystal clear', 'Glossy', 'Heat-sealable', 'Food-safe'], material: 'PET / PE', sizes: 'Custom', moq: '10,000 pcs', applications: 'Dry fruits, sweets, retail' },
        { name: 'Zipper Pouch', img: '/products/plastic_pouch.jpg', description: 'Reclosable zip pouch for premium dry goods.', features: ['Press-to-close zip', 'Resealable', 'Barrier', 'Matte / gloss'], material: 'PET / PE', sizes: '100 g – 1 kg', moq: '5,000 pcs', applications: 'Coffee, tea, snacks' },
      ],
    },
    {
      name: 'Paper Packaging',
      id: 'paperpackaging',
      link: '/products#paperpackaging',
      description: 'Compostable wraps, cartons and paper pouches for food-service and retail brands.',
      overview: { name: 'Paper Packaging', img: '/products/paper_packaging.jpg' },
      products: [
        { name: 'Food Wrapping Paper', img: '/products/paper_packaging.jpg', description: 'Food-grade wrap for serving and lining.', features: ['Food-safe', 'Grease-resistant', 'Compostable', 'Custom-print'], material: 'Food-grade paper', sizes: 'Sheets / rolls', moq: 'Custom', applications: 'QSR, bakery, street food' },
        { name: 'Corrugated Carton', img: '/products/paper_packaging.jpg', description: 'Sturdy corrugated box for shipping and storage.', features: ['Multi-ply', 'Stackable', 'Recyclable', 'Custom-print'], material: 'Corrugated board', sizes: 'Custom to product', moq: '1,000 pcs', applications: 'E-commerce, FMCG, transit' },
        { name: 'Paper Pouch', img: '/products/paper_packaging.jpg', description: 'Kraft pouch with optional window for dry goods.', features: ['Recyclable', 'Window option', 'Heat-seal', 'Printable'], material: 'Kraft + PLA liner', sizes: '100 g – 1 kg', moq: '10,000 pcs', applications: 'Snacks, coffee, grains' },
        { name: 'Compostable Packaging', img: '/products/paper_packaging.jpg', description: 'Fully compostable wrap and pouch range.', features: ['Compostable', 'Plant-based', 'Home-compost option', 'Custom-print'], material: 'PLA / paper composite', sizes: 'Custom', moq: 'Custom', applications: 'Eco brands, organic foods' },
        { name: 'Custom Printed Carton', img: '/products/paper_packaging.jpg', description: 'Premium printed folding carton for retail shelves.', features: ['Folding carton', 'Premium print', 'Special coatings', 'Die-cut'], material: 'Duplex / SBS board', sizes: 'Custom', moq: '2,000 pcs', applications: 'Cosmetics, pharma, FMCG' },
      ],
    },
  ]
};
