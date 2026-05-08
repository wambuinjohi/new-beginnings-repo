import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const products = [
  {
    name: "Biochemicals",
    description: "High-purity biochemical compounds for research and diagnostic applications including proteins, enzymes, and cofactors.",
  },
  {
    name: "Fine Chemicals",
    description: "Specialized fine chemicals for pharmaceutical, cosmetic, and industrial synthesis applications.",
  },
  {
    name: "Enzyme Substrates",
    description: "Substrate molecules designed for enzymatic assays and biochemical research.",
  },
  {
    name: "Antibiotics",
    description: "Pharmaceutical-grade antibiotics for research, quality control, and therapeutic use.",
  },
  {
    name: "Buffers",
    description: "pH buffers and buffering systems for maintaining stable solution environments in laboratory work.",
  },
  {
    name: "Stains and Indicators",
    description: "Dyes and indicator compounds for microscopy, histology, and analytical applications.",
  },
  {
    name: "Bio Chemicals",
    description: "Specialized biochemical reagents for molecular biology and life science research.",
  },
  {
    name: "Ion Pair Reagents",
    description: "Reagents for ion-pair chromatography enabling separation of charged molecules.",
  },
  {
    name: "Speciality Chemicals",
    description: "Custom and specialty chemical formulations for unique laboratory and industrial requirements.",
  },
  {
    name: "Standard Solutions",
    description: "Calibrated standard solutions with known concentrations for analytical validation and calibration.",
  },
  {
    name: "Acids HPLC/AR Grade",
    description: "Ultra-pure acids suitable for HPLC and analytical reagent grade applications.",
  },
  {
    name: "Laboratory Testing Kits",
    description: "Complete testing kits with all reagents needed for specific analytical determinations.",
  },
];

const LaboratoryChemicals = () => {
  usePageMeta({
    title: "Laboratory Chemicals & Reagents | High-Purity Biochemicals Kenya",
    description: "High-purity laboratory chemicals including biochemicals, fine chemicals, enzyme substrates, antibiotics, buffers, stains, and HPLC-grade acids. Premium quality reagents for research and industrial applications.",
    keywords: "laboratory chemicals, reagents, biochemicals, fine chemicals, enzyme substrates, antibiotics, buffers, HPLC acids, analytical grade, Kenya, supplier",
    type: "article",
    canonical: "https://morisenterprises.com/products/laboratory-chemicals",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Laboratory Chemicals", url: "/products/laboratory-chemicals" },
    ],
  });

  return (
    <ProductPageLayout
      title="Laboratory Chemicals and Reagents"
      description="Comprehensive range of high-purity laboratory chemicals and reagents including biochemicals, fine chemicals, enzyme substrates, and analytical-grade acids for research and industrial applications."
    >
      <div className="mb-12">
        <h2 className="text-3xl font-display font-bold text-foreground mb-8 text-center">
          Our Premium Chemical Grades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg overflow-hidden shadow-lg h-48">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3239eaca6122445697efae1f67bac1c1%2F9780a113573e48a891da0c86f3fde2fc?format=webp&width=800"
              alt="Chemical grades word cloud"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-48">
            <img
              src="https://cdn.builder.io/o/assets%2F3239eaca6122445697efae1f67bac1c1%2F42ca9aac2f424def8a67c3b90bff0919?alt=media&token=f0b501a7-4b5c-4c7b-a1f4-5cb0f806b4f7&apiKey=3239eaca6122445697efae1f67bac1c1"
              alt="Laboratory chemical containers"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-48">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3239eaca6122445697efae1f67bac1c1%2Fc98dd259853340b1ab6e3f3920293686?format=webp&width=800"
              alt="Colored chemical solutions"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg h-48 md:col-start-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3239eaca6122445697efae1f67bac1c1%2F0b05b5e730524dc4ae4d35e385b0c2e9?format=webp&width=800"
              alt="Laboratory equipment and bottles"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
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
          </Card>
        ))}
      </div>

      <div className="mt-12 prose prose-lg max-w-none">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Quality Laboratory Chemicals
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We supply a comprehensive range of biochemicals, fine chemicals, enzyme substrates, antibiotics, 
          buffers, stains-indicators, bio chemicals, ion pair reagents, speciality chemicals, standard 
          solutions, and acids in HPLC/AR grades. Our products meet the highest quality standards and 
          are suitable for research, quality control, and industrial applications.
        </p>
      </div>
    </ProductPageLayout>
  );
};

export default LaboratoryChemicals;
