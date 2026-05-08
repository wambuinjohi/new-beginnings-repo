import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const products = [
  {
    name: "Borosilicate Glass Beakers",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F5378c18201dc4b65804c4ed0e1389866?format=webp&width=800",
  },
  {
    name: "Volumetric Flasks",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fd7ce9b9e10d04f95bce29adb5c6b0148?format=webp&width=800",
  },
  {
    name: "Burettes and Pipettes",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fe783f30d45ed46a0bf3afe60ffdae762?format=webp&width=800",
  },
  {
    name: "Test Tubes and Culture Tubes",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F43e7eaf8b8b140519fbc5e21a6adde9c?format=webp&width=800",
  },
  {
    name: "Measuring Cylinders",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F576e662740994f638d34408e07a31063?format=webp&width=800",
  },
  {
    name: "Conical Flasks",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F9216b9a917e047d9ba8ace110bbf1299?format=webp&width=800",
  },
  {
    name: "Petri Dishes",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F4c7ea0cdab724020919d806605848234?format=webp&width=800",
  },
  {
    name: "Watch Glasses",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F725511ef213c4a1cb38f05fa99b3638c?format=webp&width=800",
  },
  {
    name: "Funnels and Separating Funnels",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Ff0c6a6887fc24bb2b06ebcf748a5a79d?format=webp&width=800",
  },
  {
    name: "Laboratory Bottles",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Faf6291065ebe4d4ea99d5852d358df85?format=webp&width=800",
  },
];


const Glassware = () => {
  usePageMeta({
    title: "Laboratory Glassware | Borosilicate Glass Beakers & Equipment Kenya",
    description: "Premium borosilicate laboratory glassware including beakers, flasks, pipettes, and test tubes. Heat-resistant, chemically inert glass for reliable lab operations. Free quotations.",
    keywords: "laboratory glassware, borosilicate glass, beakers, flasks, volumetric flasks, pipettes, test tubes, laboratory equipment, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/glassware",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Glassware", url: "/products/glassware" },
    ],
  });

  return (
    <ProductPageLayout
      title="Glassware"
      description="Premium laboratory glassware made from high-quality borosilicate glass with low coefficient of expansion for resistance to heat and exceptional resistance to chemical attack."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div className="relative w-full h-48 overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground flex-1">
                Precision-crafted borosilicate glass for reliable laboratory operations.
              </p>
              <Button
                onClick={() => openProductQuotation(product.name)}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-medium"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Request Quotation via WhatsApp
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 prose prose-lg max-w-none">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Premium Laboratory Glassware
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Our laboratory glassware products are an important part of scientific laboratories wherever 
          the highest quality is required. Made from premium borosilicate glass with a low coefficient 
          of expansion, our glassware offers superior resistance to heat and exceptional resistance to 
          chemical attack, ensuring long-lasting performance in demanding laboratory environments.
        </p>
      </div>
    </ProductPageLayout>
  );
};

export default Glassware;
