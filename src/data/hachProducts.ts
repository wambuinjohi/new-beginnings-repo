// HACH Instruments product catalog with SEO metadata
export interface HachProduct {
  id: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  keywords: string;
  specifications?: {
    model?: string;
    measurementRange?: string;
    application?: string;
    powerSupply?: string;
  };
  category: string;
  subCategory?: string;
  priceRange?: { minPrice: number; maxPrice: number; currency: string };
  availability?: string;
}

export const hachSubCategories = [
  { slug: "all", label: "HACH Instruments" },
  { slug: "cod", label: "COD Determination" },
  { slug: "ammonia-nitrogen", label: "Ammonia Nitrogen" },
  { slug: "total-phosphorus", label: "Total Phosphorus" },
  { slug: "total-nitrogen", label: "Total Nitrogen" },
  { slug: "heavy-metal", label: "Heavy Metal" },
  { slug: "disinfection-residue", label: "Disinfection Residue" },
  { slug: "refractometer", label: "Refractometer" },
  { slug: "other", label: "Other Testing" },
];

const PLACEHOLDER = "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80";

export const hachProducts: HachProduct[] = [
  {
    id: "hach-dr3900-vis-spectrophotometer",
    name: "HACH DR3900 Laboratory VIS Spectrophotometer",
    title: "HACH DR3900 Laboratory VIS Spectrophotometer | Moris One Enterprises",
    description: "HACH DR3900 visible-light laboratory spectrophotometer for routine water-quality analysis. RFID-enabled, pre-programmed methods for COD, nutrients, metals and disinfection residue. Supplied and supported in Kenya by Moris One Enterprises.",
    shortDescription: "Benchtop visible-light spectrophotometer with 240+ pre-programmed water-quality methods.",
    image: PLACEHOLDER,
    imageAlt: "HACH DR3900 Laboratory VIS Spectrophotometer benchtop unit",
    keywords: "HACH DR3900, HACH spectrophotometer Kenya, water quality spectrophotometer, lab VIS spectrophotometer, COD analyzer Kenya",
    specifications: {
      model: "DR3900",
      measurementRange: "320 – 1100 nm",
      application: "Drinking water, wastewater, process water analysis",
      powerSupply: "100 – 240 V AC",
    },
    category: "HACH Instruments",
    subCategory: "all",
    priceRange: { minPrice: 850000, maxPrice: 1100000, currency: "KES" },
    availability: "Available on Order",
  },
  {
    id: "hach-dr6000-uv-vis-spectrophotometer",
    name: "HACH DR6000 UV-Visible Spectrophotometer",
    title: "HACH DR6000 UV-Visible Spectrophotometer | Moris One Enterprises",
    description: "HACH DR6000 high-performance UV/VIS spectrophotometer for advanced laboratory water analysis. Supports user-defined methods, scanning and time-course measurements. Sourced and serviced by Moris One Enterprises in Kenya.",
    shortDescription: "Advanced UV/VIS benchtop spectrophotometer for research-grade water analysis.",
    image: PLACEHOLDER,
    imageAlt: "HACH DR6000 UV-Visible Spectrophotometer",
    keywords: "HACH DR6000, UV VIS spectrophotometer Kenya, advanced water analysis, HACH lab instrument",
    specifications: {
      model: "DR6000",
      measurementRange: "190 – 1100 nm",
      application: "Research and routine water-quality testing",
      powerSupply: "100 – 240 V AC",
    },
    category: "HACH Instruments",
    subCategory: "all",
    priceRange: { minPrice: 1300000, maxPrice: 1700000, currency: "KES" },
    availability: "Available on Order",
  },
  {
    id: "hach-dr1900-portable-spectrophotometer",
    name: "HACH DR1900 Portable Spectrophotometer",
    title: "HACH DR1900 Portable Spectrophotometer | Field Water Testing Kenya",
    description: "HACH DR1900 portable spectrophotometer for in-field water quality testing. Rugged, battery-powered design with 220+ pre-programmed methods. Ideal for remote site monitoring across Kenya.",
    shortDescription: "Rugged portable spectrophotometer engineered for field water-quality testing.",
    image: PLACEHOLDER,
    imageAlt: "HACH DR1900 Portable Spectrophotometer",
    keywords: "HACH DR1900, portable spectrophotometer Kenya, field water testing, portable HACH analyzer",
    specifications: {
      model: "DR1900",
      measurementRange: "340 – 800 nm",
      application: "Field water quality monitoring",
      powerSupply: "4 x AA batteries / USB",
    },
    category: "HACH Instruments",
    subCategory: "all",
    priceRange: { minPrice: 480000, maxPrice: 620000, currency: "KES" },
    availability: "Available on Order",
  },
  {
    id: "hach-dr1010-cod-rapid",
    name: "HACH DR1010 COD Rapid Determination Instrument",
    title: "HACH DR1010 COD Rapid Determination Instrument | Wastewater Testing Kenya",
    description: "HACH DR1010 dedicated COD analyzer for rapid chemical-oxygen-demand determination. Single-parameter design for high-throughput wastewater laboratories. Available in Kenya from Moris One Enterprises.",
    shortDescription: "Dedicated rapid-result COD analyzer for wastewater laboratories.",
    image: PLACEHOLDER,
    imageAlt: "HACH DR1010 COD Rapid Determination Instrument",
    keywords: "HACH DR1010, COD analyzer Kenya, rapid COD determination, wastewater COD instrument",
    specifications: {
      model: "DR1010",
      measurementRange: "0 – 15,000 mg/L COD",
      application: "Chemical Oxygen Demand testing",
      powerSupply: "100 – 240 V AC",
    },
    category: "HACH Instruments",
    subCategory: "cod",
    priceRange: { minPrice: 320000, maxPrice: 420000, currency: "KES" },
    availability: "Available on Order",
  },
  {
    id: "hach-ht200s-cod-digester",
    name: "HACH HT200S COD High-Temperature Dissolver",
    title: "HACH HT200S COD High-Temperature Digester | Moris One Enterprises",
    description: "HACH HT200S high-temperature COD digestion block. Reaches 165°C in minutes with pre-programmed digestion programs. Pairs with HACH spectrophotometers for full COD workflows.",
    shortDescription: "Compact high-temperature digestion block for COD sample preparation.",
    image: PLACEHOLDER,
    imageAlt: "HACH HT200S COD High-Temperature Dissolver",
    keywords: "HACH HT200S, COD digester Kenya, high temperature dissolver, sample digestion HACH",
    specifications: {
      model: "HT200S",
      measurementRange: "Up to 165°C",
      application: "COD sample digestion",
      powerSupply: "230 V AC",
    },
    category: "HACH Instruments",
    subCategory: "cod",
    priceRange: { minPrice: 280000, maxPrice: 360000, currency: "KES" },
    availability: "Available on Order",
  },
  {
    id: "hach-drb200-heating-digester",
    name: "HACH DRB200 Heating Digester",
    title: "HACH DRB200 Heating Digester | COD & Nutrient Sample Prep Kenya",
    description: "HACH DRB200 heating digester for COD, total nitrogen and total phosphorus sample preparation. Selectable temperature programs and dual-block options. Supplied in Kenya by Moris One Enterprises.",
    shortDescription: "Versatile heating digester for COD, total nitrogen and total phosphorus prep.",
    image: PLACEHOLDER,
    imageAlt: "HACH DRB200 Heating Digester",
    keywords: "HACH DRB200, heating digester Kenya, COD digestion block, total nitrogen prep",
    specifications: {
      model: "DRB200",
      measurementRange: "37°C – 165°C",
      application: "COD, TN, TP sample digestion",
      powerSupply: "115 / 230 V AC",
    },
    category: "HACH Instruments",
    subCategory: "cod",
    priceRange: { minPrice: 240000, maxPrice: 320000, currency: "KES" },
    availability: "Available on Order",
  },
  {
    id: "hach-dr300-chlorine-dioxide",
    name: "HACH DR300 Chlorine Dioxide Pocket Colorimeter",
    title: "HACH DR300 Chlorine Dioxide Pocket Colorimeter | Disinfection Residue Kenya",
    description: "HACH DR300 pocket colorimeter pre-configured for chlorine dioxide measurement. Compact, IP67-rated design ideal for water treatment plants and disinfection residue checks across Kenya.",
    shortDescription: "Pocket-sized chlorine dioxide colorimeter for in-field disinfection residue checks.",
    image: PLACEHOLDER,
    imageAlt: "HACH DR300 Chlorine Dioxide Pocket Colorimeter",
    keywords: "HACH DR300, pocket colorimeter Kenya, chlorine dioxide test, disinfection residue analyzer",
    specifications: {
      model: "DR300 - ClO2",
      measurementRange: "0.02 – 5.00 mg/L ClO2",
      application: "Chlorine dioxide residue testing",
      powerSupply: "2 x AAA batteries",
    },
    category: "HACH Instruments",
    subCategory: "disinfection-residue",
    priceRange: { minPrice: 95000, maxPrice: 130000, currency: "KES" },
    availability: "Available on Order",
  },
  {
    id: "hach-dr300-ozone",
    name: "HACH DR300 Pocket Ozone Colorimeter",
    title: "HACH DR300 Pocket Ozone Colorimeter | Ozone Residue Testing Kenya",
    description: "HACH DR300 pocket colorimeter pre-configured for dissolved ozone measurement. Reliable, single-parameter device for water treatment plant operators. Available from Moris One Enterprises in Kenya.",
    shortDescription: "Pocket ozone colorimeter for fast dissolved-ozone residue verification.",
    image: PLACEHOLDER,
    imageAlt: "HACH DR300 Pocket Ozone Colorimeter",
    keywords: "HACH DR300 ozone, pocket ozone colorimeter, ozone residue testing Kenya, water treatment ozone",
    specifications: {
      model: "DR300 - O3",
      measurementRange: "0.01 – 1.50 mg/L O3",
      application: "Dissolved ozone testing",
      powerSupply: "2 x AAA batteries",
    },
    category: "HACH Instruments",
    subCategory: "disinfection-residue",
    priceRange: { minPrice: 95000, maxPrice: 130000, currency: "KES" },
    availability: "Available on Order",
  },
];

export function getHachProductBySlug(slug: string): HachProduct | undefined {
  return hachProducts.find((p) => p.id.toLowerCase() === slug.toLowerCase());
}
