import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const products = [
  {
    name: "Complete PPE Kit",
    description: "Comprehensive personal protective equipment kit with all essential items for complete workplace protection.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fddb43e85526a43be99203887e2c4499b?format=webp&width=800",
  },
  {
    name: "Laboratory Coats and Aprons",
    description: "Professional-grade laboratory coats and aprons for safe chemical and biological handling.",
    image: "https://images.pexels.com/photos/9574539/pexels-photo-9574539.jpeg",
  },
  {
    name: "Safety Goggles and Face Shields",
    description: "Impact-resistant eye protection devices for chemical splash and particle protection.",
    image: "https://images.pexels.com/photos/5726796/pexels-photo-5726796.jpeg",
  },
  {
    name: "Gloves (Nitrile, Latex, and Chemical Resistant)",
    description: "Multiple glove materials for different handling requirements and chemical compatibility.",
    image: "https://images.pexels.com/photos/7337928/pexels-photo-7337928.jpeg",
  },
  {
    name: "Respirators and Face Masks",
    description: "Respiratory protection devices for hazardous fume and particulate protection.",
    image: "https://images.pexels.com/photos/5040585/pexels-photo-5040585.jpeg",
  },
  {
    name: "Safety Shoes and Boots",
    description: "Protective footwear with slip-resistant soles and chemical-resistant materials.",
    image: "https://images.pexels.com/photos/6434707/pexels-photo-6434707.jpeg",
  },
  {
    name: "Ear Protection",
    description: "Noise-reducing earplugs and earmuffs for loud laboratory environments.",
    image: "https://images.pexels.com/photos/8488000/pexels-photo-8488000.jpeg",
  },
  {
    name: "Head Protection - Hard Hats",
    description: "Durable hard hats for protection against falling objects and impact hazards.",
    image: "https://images.pexels.com/photos/34965713/pexels-photo-34965713.jpeg",
  },
  {
    name: "First Aid Kits",
    description: "Complete first aid kits stocked with essential medical supplies and emergency treatments.",
    image: "https://images.pexels.com/photos/6520168/pexels-photo-6520168.jpeg",
  },
  {
    name: "Safety Signage",
    description: "Hazard warning signs and safety labels for proper laboratory hazard communication.",
    image: "https://images.pexels.com/photos/12196671/pexels-photo-12196671.jpeg",
  },
  {
    name: "Spill Control Products",
    description: "Absorbent materials and containment products for chemical spill cleanup.",
    image: "https://images.pexels.com/photos/4867373/pexels-photo-4867373.jpeg",
  },
];


const SafetyProducts = () => {
  usePageMeta({
    title: "Personal Protection Equipment (PPE) | Safety Products Kenya",
    description: "ISO certified personal protection equipment and safety products manufactured with innovative designs and latest technology. Complete PPE solutions for laboratories and industries.",
    keywords: "PPE, personal protective equipment, safety products, protective gear, ISO certified, laboratory safety, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/safety-products",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Safety Products", url: "/products/safety-products" },
    ],
  });

  return (
    <ProductPageLayout
      title="Safety Products"
      description="Complete range of personal protective equipment (PPE) under one roof. ISO certified products manufactured using innovative designs with the latest technology to ensure workplace safety."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const productName = product.name;
          const productImage = product.image;

          return (
            <Card
              key={index}
              className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                productImage ? "overflow-hidden" : "p-6"
              }`}
            >
              {productImage && (
                <div className="relative w-full h-48 overflow-hidden bg-muted">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={productImage ? "p-6 flex flex-col h-full" : "p-6 flex flex-col h-full"}>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {productName}
                </h3>
                <p className="text-muted-foreground flex-1">
                  {product.description}
                </p>
                <Button
                  onClick={() => openProductQuotation(productName)}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-medium"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Request Quotation via WhatsApp
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 prose prose-lg max-w-none">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Comprehensive Safety Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We believe in providing personnel protective equipment under one roof. Our products are 
          certified and manufactured by ISO certified factories using innovative designs with the 
          latest technology. We offer a complete range of Personal Protective Equipment to ensure 
          the safety of your workforce in laboratory and industrial environments.
        </p>
      </div>
    </ProductPageLayout>
  );
};

export default SafetyProducts;
