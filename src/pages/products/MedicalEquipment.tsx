import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const products = [
  {
    name: "Pipette Tips",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fbce652f272074484ac01050ee775f3f1?format=webp&width=800",
  },
  {
    name: "Hematology Analyzer (5 Parts)",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F578a166eb1ce4005879eef3bda106708?format=webp&width=800",
  },
  {
    name: "Nucleic Acid Extractor",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fda1cd2d81ab8427b817506417f0e68c5?format=webp&width=800",
  },
  {
    name: "Microwave Digestion System",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fe84858be539f4c3f9f53bce00246096d?format=webp&width=800",
  },
  {
    name: "BOD Refrigerated Incubator (ICB-E Series)",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fb394031618e147f38d71c6d9e56a5bf3?format=webp&width=800",
  },
  {
    name: "Nucleic Acid Extractor (Automatic, NAE-0132)",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fb6c76b55e63e4418ae98c7cdfb0714a8?format=webp&width=800",
  },
  {
    name: "Medical Diagnostic Equipment",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F76312366742f419e94f26f729d13e449?format=webp&width=800",
  },
  {
    name: "Laboratory Diagnostic Tools",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F5d818cbb7b2f4b81ba47d24ec8779359?format=webp&width=800",
  },
  {
    name: "Clinical Analysis Systems",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fe07f8060665d4f59b889165ae41d1156?format=webp&width=800",
  },
  {
    name: "Automated Lab Analyzer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F077dbd4cb9674f19a9fb4b48eb75a45b?format=webp&width=800",
  },
  {
    name: "Refrigerated Incubator",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fe45838bc380248c489c4550b7d85618f?format=webp&width=800",
  },
  {
    name: "PCR Thermal Cycler",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fa46fc0c0984a47b2a9e29bc9144fa222?format=webp&width=800",
  },
  {
    name: "Biosafety Cabinet",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F36aa2c02fef948daae60d4155d865056?format=webp&width=800",
  },
  {
    name: "Centrifuge",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F0ef090b846c840d9ae32b44e2d421804?format=webp&width=800",
  },
  {
    name: "Ultra-low Freezer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F6320ee4d6ce74ea0b63523c1e88a0b0b?format=webp&width=800",
  },
  {
    name: "Refrigerator for Lab",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F5da62c330afc4db9af2b8005dacc4d38?format=webp&width=800",
  },
  {
    name: "Water Bath",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F68959f0861694b058be12078c3a55599?format=webp&width=800",
  },
  {
    name: "Tube Storage System",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F0f0ea98d302d4ee3ae05cd47edce93c6?format=webp&width=800",
  },
  {
    name: "Liquid Nitrogen Container",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fb3dc6754d2f0489c8b229d98c5567f72?format=webp&width=800",
  },
  {
    name: "Sample Preparation System",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fafc69debbc5841f7904f976471c32cf5?format=webp&width=800",
  },
  {
    name: "Pipette Dispenser",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F6f1aaf2fe8da4067b92524d7934e4147?format=webp&width=800",
  },
  {
    name: "Spectrophotometer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F7dddeaa1bf9d4c728e321d51d82f07fe?format=webp&width=800",
  },
  {
    name: "Incubator Cabinet",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fe63a09004912472e9c56768675c376fb?format=webp&width=800",
  },
  {
    name: "Laminar Flow Hood",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F3836e4c1f53d4cc49f2e903c7dd764d5?format=webp&width=800",
  },
  {
    name: "Elution System",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F1fd54fedf61d432daf6caca7ba5630e8?format=webp&width=800",
  },
  {
    name: "Sample Evaporator",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fe4b7d06f5f364bc7a0e2e14ebc2dfd03?format=webp&width=800",
  },
  {
    name: "Portable Ultrasound",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F3f5ff362166144f5a61dc2dfeb2b4347?format=webp&width=800",
  },
  {
    name: "Chemistry Analyzer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Ff15631c413a04158b016ecf8e3ecfd32?format=webp&width=800",
  },
  {
    name: "Coagulation Analyzer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Ffa613ad01e12402eb9cda7ad07b973b1?format=webp&width=800",
  },
  {
    name: "Immunoassay Analyzer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F6af949af32d64df1aeb27305ec768122?format=webp&width=800",
  },
  {
    name: "Urinalysis System",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F76119edd70c648919d6c4d9f4d9d577a?format=webp&width=800",
  },
  {
    name: "Blood Gas Analyzer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F0ef090b846c840d9ae32b44e2d421804?format=webp&width=800",
  },
  {
    name: "Cell Counter",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Ff9e1968e90674397891c48c78c45e2fe?format=webp&width=800",
  },
  {
    name: "Plate Reader",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F3414403b159444f785f0b75a24c5eda1?format=webp&width=800",
  },
  {
    name: "Shaker Incubator",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F1e031da453f941c49359be0032f7e9b3?format=webp&width=800",
  },
  {
    name: "Vacuum Pump",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F6b7b71c472ee4cee85cc4c5f06a79b59?format=webp&width=800",
  },
  {
    name: "Magnetic Stirrer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F363fe4e0b4e2426e863ec1264256f578?format=webp&width=800",
  },
  {
    name: "Digital Balance",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fed325cb440134fe387416716c5412df6?format=webp&width=800",
  },
  {
    name: "pH Meter with App",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F92986037c7e847e68a92f4ecdff3a2dd?format=webp&width=800",
  },
  {
    name: "Autoclave Sterilizer",
    image: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F7caedf144cdb44aa8dde1444b0c64e04?format=webp&width=800",
  },
];


const MedicalEquipment = () => {
  usePageMeta({
    title: "Medical Equipment | Laboratory Instruments | Moris Enterprises Kenya",
    description: "Discover premium medical equipment and laboratory instruments including hematology analyzers, nucleic acid extractors, and microwave digestion systems.",
    keywords: "medical equipment, laboratory instruments, hematology analyzer, diagnostic equipment, Kenya",
    type: "article",
  });

  return (
    <ProductPageLayout
      title="Medical Equipment"
      description="Our comprehensive range of medical equipment includes cutting-edge diagnostic tools and laboratory instruments designed for accuracy and reliability in healthcare settings."
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
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground flex-1">
                Professional-grade medical equipment for accurate diagnostics and analysis.
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
          Quality Medical Equipment
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We provide a comprehensive selection of medical equipment designed to meet the demanding needs 
          of modern healthcare facilities. Our products combine precision, reliability, and ease of use 
          to support accurate diagnostics and efficient laboratory workflows.
        </p>
      </div>
    </ProductPageLayout>
  );
};

export default MedicalEquipment;
