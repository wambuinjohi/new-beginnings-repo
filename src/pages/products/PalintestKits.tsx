import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const products = [
  {
    name: "Palintest Photometers",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Ffad345ebf2ca45dc907dc570e1a1cf8c?format=webp&width=800",
  },
  {
    name: "Kemio Disinfection Analyzer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F88407a93652f40a0bd04311262195b73?format=webp&width=800",
  },
  {
    name: "Pooltest 6 Photometer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F40220d1cc2f94c1ebd04a7350507cfd2?format=webp&width=800",
  },
  {
    name: "Pool and Spa Test Kit",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fb2e31861251847f9b2a50e4465593e4e?format=webp&width=800",
  },
  {
    name: "Portable Test Case",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F19112d4badcd4e1c8aa68c9e030da16d?format=webp&width=800",
  },
  {
    name: "Water Quality Analyzer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F482f32063dd7487c87b74cebd9d535d4?format=webp&width=800",
  },
  {
    name: "Micro 800 COINC Meter",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F01298927f76d443b83b63458aae9d4e3?format=webp&width=800",
  },
  {
    name: "Digital Test Tablet Reader",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F772cfa081d3a4412af24372d982b0a66?format=webp&width=800",
  },
  {
    name: "Complete Test Kit System",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Febe0a5b3737c484e94878973cee301c8?format=webp&width=800",
  },
  {
    name: "Test Tablet Dispenser",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F25e8d389706b414e8dbe75da15aaf52e?format=webp&width=800",
  },
  {
    name: "Potaest Go Kit",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Feb74fb27c1b74e0aa6dbe2b8031556c7?format=webp&width=800",
  },
];


const PalintestKits = () => {
  usePageMeta({
    title: "Palintest Water Testing Kits & Photometers | Water Quality Analysis Kenya",
    description: "Official distributor of Palintest water testing kits and photometers for rapid water quality analysis. Professional-grade testing solutions for water treatment and monitoring in Kenya.",
    keywords: "Palintest, water testing kits, photometers, water quality, water analysis, testing equipment, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/palintest-kits",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Palintest Kits", url: "/products/palintest-kits" },
    ],
  });

  return (
    <ProductPageLayout
      title="Palintest Kits"
      description="Authorized distributor of Palintest water testing products. Comprehensive range of photometers, test kits, and reagents for accurate water analysis in various applications."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${
              product.image ? "overflow-hidden" : "p-6"
            }`}
          >
            {product.image && (
              <div className="relative w-full h-48 overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className={product.image ? "p-6 flex flex-col h-full" : "p-6 flex flex-col h-full"}>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground flex-1">
                Trusted Palintest solutions for reliable water quality testing.
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
          Palintest Water Testing Excellence
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          As an authorized distributor of Palintest products, we offer a complete range of water testing 
          solutions known for their accuracy and reliability. Palintest's innovative photometers and 
          test kits are trusted worldwide for pool, spa, drinking water, and environmental water testing, 
          providing fast and accurate results for critical water quality parameters.
        </p>
      </div>
    </ProductPageLayout>
  );
};

export default PalintestKits;
