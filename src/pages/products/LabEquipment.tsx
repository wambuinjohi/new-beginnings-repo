import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const products = [
  {
    name: "Industrial Water Filtration System",
    description: "Complete industrial-scale water filtration and treatment systems.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0fd8d9ea35ed431fafa410b8025ca861%2Fe0787509e94f40caa82c74d39c25422d?format=webp&width=800"
  },
  {
    name: "Advanced Water Treatment Complex",
    description: "Multi-stage water treatment facility with advanced purification technology.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F0fd8d9ea35ed431fafa410b8025ca861%2Fc7c91404507642198bd327e427087af5?format=webp&width=800"
  },
  {
    name: "Hydraulic Testing Equipment",
    description: "Professional hydraulic system testing and analysis equipment.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fb497f80a0afe4ec396063b5fa03d3b87?format=webp&width=800"
  },
  {
    name: "Industrial Motor Components",
    description: "High-precision industrial motor testing and analysis components.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F3d0d08c9b0d14f32bc16dee8955a88d9?format=webp&width=800"
  },
  {
    name: "Mechanical Testing Station",
    description: "Advanced mechanical and materials testing apparatus.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fcd82b34f7afa4b95af8af8a026ccfbe1?format=webp&width=800"
  },
  {
    name: "Fluid Systems Training Kit",
    description: "Educational training system for fluid and water systems.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Ff8cbabb6e8414dbb94a1755955798060?format=webp&width=800"
  },
  {
    name: "Precision Laboratory Setup",
    description: "Professional-grade laboratory testing and analysis setup.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F93e4949a810d4862a35ee41d94366e98?format=webp&width=800"
  },
  {
    name: "Industrial Machine Systems",
    description: "Advanced industrial machinery and control systems.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F9f8ceb98d8a54b1db7d56cbd81d46e44?format=webp&width=800"
  },
  {
    name: "Pneumatic Systems Trainer",
    description: "Comprehensive pneumatic systems training and testing equipment.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F0d3cbf08c0e942c6bc33ac05cbea6a60?format=webp&width=800"
  },
  {
    name: "Hydraulic Fluid Systems",
    description: "High-performance hydraulic fluid systems and analysis tools.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fa30999669320416d8073b1c9fc27e62a?format=webp&width=800"
  },
  {
    name: "Mechanical Precision Balance",
    description: "Ultra-precise analytical balances for laboratory use.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fc0370d7300404e53a9f37cdc71ec7593?format=webp&width=800"
  },
  {
    name: "Industrial Testing Apparatus",
    description: "Comprehensive industrial testing and quality control equipment.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F7cfebb89d2ab4bb38760a06c034e1123?format=webp&width=800"
  },
  {
    name: "CNC Precision Machine",
    description: "Advanced CNC machining center for precision manufacturing.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fe3f563f415e94998a0e955847bf7156f?format=webp&width=800"
  },
  {
    name: "Hydraulic Power Systems",
    description: "Industrial-grade hydraulic power generation and control systems.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fc19c6bb1bf2b4a848f30d2021edd4e29?format=webp&width=800"
  },
  {
    name: "Robotic Training System",
    description: "Modern industrial robotics training and development platform.",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fb3a142c0b1454af7b45fb1c88be99701?format=webp&width=800"
  },
];


const LabEquipment = () => {
  usePageMeta({
    title: "Laboratory Equipment & Filtration Systems | Industrial Water Treatment Kenya",
    description: "Advanced laboratory equipment including water filtration systems, deionized water systems, UV sterilizers, and water quality meters. Complete lab solutions for research and quality control.",
    keywords: "laboratory equipment, water filtration, deionized water, UV sterilizers, water quality, lab instruments, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/lab-equipment",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Lab Equipment", url: "/products/lab-equipment" },
    ],
  });

  return (
    <ProductPageLayout
      title="Lab Equipment & TVET Systems"
      description="Complete range of laboratory equipment and technical vocational training (TVET) systems including hydraulic trainers, pneumatic systems, CNC machines, water treatment systems, and precision analytical instruments."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col`}
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
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground flex-1">
                {product.description}
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
          Advanced Laboratory and Technical Training Equipment
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Our comprehensive product range includes advanced laboratory equipment alongside specialized
          technical and vocational training systems. We supply hydraulic systems, pneumatic trainers,
          CNC machines, robotic systems, mechanical testing apparatus, and industrial water treatment
          systems for educational institutions and technical centers. Combined with traditional laboratory
          instruments such as spectrophotometers, balances, centrifuges, and analytical equipment, we 
          provide complete solutions for both academic laboratories and industrial training facilities.
        </p>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Our Equipment and Services Include:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Industrial water treatment and filtration systems</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Hydraulic and pneumatic training systems</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>CNC and precision machining equipment</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Robotics and automation systems</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Mechanical and materials testing apparatus</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>Precision analytical balances and instruments</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-3">✓</span>
            <span>TVET training platforms and curricula</span>
          </li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default LabEquipment;
