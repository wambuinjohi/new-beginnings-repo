import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const products = [
  {
    name: "Water Quality Testing Reagents",
    description: "Complete set of reagents for comprehensive water quality testing and analysis.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0fd8d9ea35ed431fafa410b8025ca861%2F69c7948ec5614693b3ce524b574ba443?format=webp&width=800"
  },
  {
    name: "Laboratory Chemistry Solutions",
    description: "High-purity chemical solutions for laboratory testing and analysis.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0fd8d9ea35ed431fafa410b8025ca861%2F6ac512307a02485ea1fcc9eeb16d8832?format=webp&width=800"
  },
  {
    name: "Water Quality Analysis Kit",
    description: "Comprehensive water quality assessment and testing reagents.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0fd8d9ea35ed431fafa410b8025ca861%2F5e23491879d14a0c9fd4c98d15e626bd?format=webp&width=800"
  },
  {
    name: "Laboratory Beakers and Solutions",
    description: "Complete laboratory glassware and chemical solutions for analysis.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0fd8d9ea35ed431fafa410b8025ca861%2F82d2aacedc15470d8b2312a364df9738?format=webp&width=800"
  },
  {
    name: "Beverage Testing Equipment",
    description: "Specialized testing solutions for beverage quality analysis and control.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F54700a0afce24d8da089947a629fd4e5?format=webp&width=800"
  },
  {
    name: "Packaging Testing Equipment",
    description: "Comprehensive packaging and material quality testing solutions.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F390636224eb3470ebf882a5542bf5887?format=webp&width=800"
  },
  {
    name: "Quality Testing Equipment",
    description: "Professional-grade quality control and testing instrumentation.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F08c9c9f6ecce4a3e8247c69ce66443f7?format=webp&width=800"
  },
  {
    name: "Material Strength Testers",
    description: "Equipment for testing material properties and strength analysis.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0fd8d9ea35ed431fafa410b8025ca861%2Fd28b93e464c14e2aac7a8919aa72027b?format=webp&width=800"
  },
  {
    name: "Viscosity Meters",
    description: "Precision instruments for viscosity and flow rate measurement."
  },
  {
    name: "Compression Testing Machines",
    description: "Industrial-grade compression and strength testing equipment."
  },
  {
    name: "Tensile Testing Equipment",
    description: "Professional tensile strength analysis and testing systems."
  },
  {
    name: "Advanced Testing Kits",
    description: "Comprehensive testing solutions for laboratory applications."
  }
];


const LaboratoryTesting = () => {
  usePageMeta({
    title: "Material & Laboratory Testing Equipment | Quality Control Solutions Kenya",
    description: "Advanced laboratory and material testing equipment for beverage, packaging, and quality testing. Complete testing solutions for material analysis and quality control in Kenya.",
    keywords: "laboratory testing, material testing, quality control, testing equipment, QA/QC, beverage testing, packaging testing, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/laboratory-testing",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Laboratory Testing", url: "/products/laboratory-testing" },
    ],
  });

  return (
    <ProductPageLayout
      title="Laboratory and Material Testing"
      description="Professional testing equipment for water quality, beverage, packaging, and material testing. Comprehensive solutions for chemical analysis and quality control across industries."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col ${
              product.image ? "" : "p-6"
            }`}
          >
            {product.image && (
              <div className="relative w-full h-48 overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className={product.image ? "p-6 flex flex-col h-full" : "p-6 flex flex-col h-full"}>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground flex-1">
                {product.description || "Advanced testing equipment for accurate material and quality analysis."}
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

      <div className="mt-16 prose prose-lg max-w-none bg-secondary/50 p-8 rounded-lg">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Material and Water Quality Testing Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our range of laboratory and material testing equipment includes specialized tools for water quality testing,
          beverage analysis, packaging verification, and material strength assessment. We provide comprehensive solutions 
          for chemical analysis, water quality monitoring, material properties evaluation, and quality control to ensure 
          your products meet industry standards and regulatory requirements.
        </p>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Testing Capabilities:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Water quality and purity analysis</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Chemical composition testing</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Material strength and durability testing</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Beverage and food quality control</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Packaging integrity assessment</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Viscosity and flow rate measurement</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Compression and tensile strength analysis</span>
          </li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default LaboratoryTesting;
