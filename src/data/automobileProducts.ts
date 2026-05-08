// Centralized automobile products data with SEO metadata for each product
export interface AutomobileProduct {
  id: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  keywords: string;
  specifications?: {
    grade?: string;
    loadCapacity?: string;
    material?: string;
    application?: string;
  };
  category: string;
  price?: string;
  priceRange?: {
    minPrice: number;
    maxPrice: number;
    currency: string;
  };
  availability?: string;
}

export const automobileProducts: AutomobileProduct[] = [
  {
    id: "komu-coils-blue",
    name: "KOMU Coils Springs - Blue",
    title: "KOMU Blue Suspension Coil Springs | Premium Auto Parts Kenya",
    description: "KOMU Blue suspension coil springs - premium-grade automotive suspension components. High tensile strength, corrosion-resistant finish. Load-bearing capacity engineered for sedan vehicles. Professional automotive parts supplier in Kenya.",
    shortDescription: "KOMU Blue suspension coil springs - premium-grade automotive suspension components.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F03ba6d13283e4f6e88691a5c602fc9e3%2F8564aa54272b435f8016c3550366fdc1?format=webp&width=800",
    imageAlt: "KOMU Blue Suspension Coil Springs",
    keywords: "KOMU blue coils, KOMU blue springs, suspension coils, coil springs Kenya, sedan suspension, KOMU springs",
    specifications: {
      grade: "Standard Sedan Grade",
      loadCapacity: "Medium Load",
      material: "High-tensile steel with corrosion-resistant finish",
      application: "Sedan vehicle suspension",
    },
    category: "Suspension Springs",
    priceRange: {
      minPrice: 4500,
      maxPrice: 6500,
      currency: "KES",
    },
    availability: "In Stock",
  },
  {
    id: "komu-coils-yellow",
    name: "KOMU Coils Springs - Yellow",
    title: "KOMU Yellow Heavy-Duty Suspension Springs | Commercial Vehicle Parts",
    description: "KOMU Yellow suspension springs - premium coil springs for enhanced vehicle suspension. Superior load-bearing capacity for commercial vehicles. Durable automotive suspension components for Kenya's demanding roads.",
    shortDescription: "KOMU Yellow suspension springs with superior load-bearing capacity for commercial vehicles.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F03ba6d13283e4f6e88691a5c602fc9e3%2Fcc3a9f9a91fc4250a63e8a11a65028bd?format=webp&width=800",
    imageAlt: "KOMU Yellow Heavy-Duty Suspension Springs",
    keywords: "KOMU yellow coils, KOMU yellow springs, heavy-duty suspension, commercial vehicle springs, KOMU automotive",
    specifications: {
      grade: "Commercial Grade",
      loadCapacity: "High Load",
      material: "Heavy-duty steel with protective finish",
      application: "Commercial vehicle suspension",
    },
    category: "Suspension Springs",
    priceRange: {
      minPrice: 7500,
      maxPrice: 9500,
      currency: "KES",
    },
    availability: "In Stock",
  },
  {
    id: "komu-coils-dark-blue",
    name: "KOMU Coils Springs - Dark Blue",
    title: "KOMU Dark Blue Heavy-Duty Coil Springs | Professional Auto Parts",
    description: "KOMU Dark Blue coil springs - heavy-duty suspension components for reliable vehicle performance. Engineered for longevity and stability. Professional-grade KOMU springs trusted by automotive service centers across Kenya.",
    shortDescription: "KOMU Dark Blue heavy-duty coil springs engineered for longevity and stability.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F03ba6d13283e4f6e88691a5c602fc9e3%2F278e671287c74a3db3a9a7e0e1513949?format=webp&width=800",
    imageAlt: "KOMU Dark Blue Heavy-Duty Coil Springs",
    keywords: "KOMU dark blue coils, KOMU dark blue springs, heavy-duty springs, automotive suspension Kenya",
    specifications: {
      grade: "Heavy-Duty Grade",
      loadCapacity: "Maximum Load",
      material: "Premium heavy-duty steel",
      application: "Heavy-duty vehicle suspension",
    },
    category: "Suspension Springs",
    priceRange: {
      minPrice: 8500,
      maxPrice: 11000,
      currency: "KES",
    },
    availability: "In Stock",
  },
  {
    id: "komu-coils-orange-red",
    name: "KOMU Coils Springs - Orange/Red",
    title: "KOMU Orange-Red Heavy-Duty Suspension Springs | Truck Parts Kenya",
    description: "KOMU Orange-Red suspension coil springs - high-performance springs for heavy-duty automotive applications. Maximum durability for trucks and commercial vehicles. KOMU coils engineered for superior suspension control.",
    shortDescription: "KOMU Orange-Red high-performance springs for heavy-duty automotive applications.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F03ba6d13283e4f6e88691a5c602fc9e3%2Fa138c58dc0d44e1c80507118fe1a6ae8?format=webp&width=800",
    imageAlt: "KOMU Orange-Red Heavy-Duty Suspension Springs",
    keywords: "KOMU orange red coils, KOMU red springs, truck suspension, heavy-duty automotive, KOMU Kenya",
    specifications: {
      grade: "Maximum Performance Grade",
      loadCapacity: "Maximum Load",
      material: "High-performance steel alloy",
      application: "Truck and heavy commercial vehicles",
    },
    category: "Suspension Springs",
    priceRange: {
      minPrice: 9500,
      maxPrice: 12500,
      currency: "KES",
    },
    availability: "In Stock",
  },
  {
    id: "komu-coils-standard",
    name: "KOMU Coils Springs - Standard",
    title: "KOMU Standard Suspension Coil Springs | Reliable Auto Repair Parts",
    description: "KOMU Standard suspension coil springs - reliable automotive springs for routine vehicle maintenance. Consistent performance for everyday repair needs. KOMU springs - trusted choice for professional auto repair in Kenya.",
    shortDescription: "KOMU Standard suspension coil springs for reliable routine vehicle maintenance.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F03ba6d13283e4f6e88691a5c602fc9e3%2Ff89232996c3b4494b45abcf5e8d2d4b4?format=webp&width=800",
    imageAlt: "KOMU Standard Suspension Coil Springs",
    keywords: "KOMU standard coils, KOMU standard springs, reliable suspension, auto repair springs Kenya",
    specifications: {
      grade: "Standard Grade",
      loadCapacity: "Standard Load",
      material: "Standard steel with protective coating",
      application: "Standard vehicle suspension maintenance",
    },
    category: "Suspension Springs",
    priceRange: {
      minPrice: 3500,
      maxPrice: 5000,
      currency: "KES",
    },
    availability: "In Stock",
  },
  {
    id: "komu-coils-premium",
    name: "KOMU Coils Springs - Premium Suspension",
    title: "KOMU Premium Suspension Coil Springs | Top-Tier Auto Parts Kenya",
    description: "KOMU Premium suspension springs - top-tier coil springs for complete vehicle suspension overhaul. Superior load capacity and durability. KOMU premium components - engineered for maximum vehicle performance and safety.",
    shortDescription: "KOMU Premium top-tier coil springs for complete vehicle suspension overhaul.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F03ba6d13283e4f6e88691a5c602fc9e3%2F26872f98e1bc469c95cbe083f66457f9?format=webp&width=800",
    imageAlt: "KOMU Premium Suspension Coil Springs",
    keywords: "KOMU premium coils, KOMU premium springs, premium suspension, high-performance springs Kenya",
    specifications: {
      grade: "Premium Grade",
      loadCapacity: "Premium Load Capacity",
      material: "Premium alloy steel with advanced finish",
      application: "Premium vehicle suspension systems",
    },
    category: "Suspension Springs",
    priceRange: {
      minPrice: 10000,
      maxPrice: 14000,
      currency: "KES",
    },
    availability: "In Stock",
  },
  {
    id: "automotive-shock-absorbers",
    name: "Automotive Shock Absorbers",
    title: "Professional Shock Absorbers | KOMU Suspension System Components Kenya",
    description: "Professional-grade shock absorbers designed for optimal vehicle suspension control. Compatible with KOMU suspension systems. Premium quality automotive shock absorbers for Kenya.",
    shortDescription: "Professional-grade shock absorbers for optimal suspension control.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F03ba6d13283e4f6e88691a5c602fc9e3%2Ffad79b65501a4b4b95e1a64b6e08a0e5?format=webp&width=800",
    imageAlt: "Professional Automotive Shock Absorbers",
    keywords: "shock absorbers, suspension shock absorbers, KOMU compatible, shock absorber Kenya, automotive suspension",
    specifications: {
      grade: "Professional Grade",
      application: "Universal shock absorption",
    },
    category: "Shock Absorbers",
    priceRange: {
      minPrice: 6000,
      maxPrice: 9000,
      currency: "KES",
    },
    availability: "In Stock",
  },
];

// Helper function to get a product by ID
export function getProductById(id: string): AutomobileProduct | undefined {
  return automobileProducts.find((product) => product.id === id);
}

// Helper function to get product by slug (case-insensitive)
export function getProductBySlug(slug: string): AutomobileProduct | undefined {
  return automobileProducts.find(
    (product) => product.id.toLowerCase() === slug.toLowerCase()
  );
}

// Helper function to convert product name to slug
export function productNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}
