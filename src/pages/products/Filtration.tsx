import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const productCategories = {
  "Filter Papers & Materials": [
    { name: "Chemical Analysis Filter Paper", description: "General-purpose filter paper for chemical analysis and laboratory filtration applications." },
    { name: "Glass Microfiber Filters", description: "High-performance glass microfiber filters with fine capillary structure for superior absorption." },
    { name: "Filter papers - all grades and brands", description: "Comprehensive selection of filter papers in various grades for different analytical needs." },
    { name: "pH Indicator Paper", description: "Calibrated pH indicator paper strips for quick pH determination across various ranges." },
    { name: "Test Strips kits", description: "Complete test strip kits for rapid chemical and water quality analysis." },
    { name: "Washable Artificial Leather Paper", description: "Durable washable filter material for reusable laboratory applications." },
    { name: "Thimble Filters", description: "Extraction thimbles for use in Soxhlet and other extraction apparatus." },
    { name: "Cellulose Extraction Thimbles", description: "High-purity cellulose thimbles designed for solvent extraction processes." },
  ],
  "Syringe Filtration": [
    { name: "Syringe Filters (multiple sizes)", description: "Versatile syringe filters available in standard and custom sizes for sample preparation." },
    { name: "PTFE Hydrophilic Filters", description: "PTFE filters optimized for aqueous solutions and hydrophilic applications." },
    { name: "PTFE Hydrophobic Filters", description: "PTFE filters designed for organic solvents and hydrophobic sample filtration." },
    { name: "Nylon Syringe Filters", description: "Nylon filters with excellent chemical compatibility for diverse sample types." },
    { name: "MCE Syringe Filters", description: "Mixed cellulose ester filters ideal for microbiological and general laboratory use." },
    { name: "PES (Polyethersulfone) Syringe Filters", description: "PES filters with low protein binding for pharmaceutical and biotech applications." },
    { name: "PVDF Hydrophilic Filters", description: "PVDF filters for aggressive chemical environments with superior durability." },
  ],
  "Membrane Filters": [
    { name: "Membrane filters (multiple types)", description: "Diverse membrane filter types for various separation and filtration applications." },
    { name: "Filter membranes", description: "Replacement filter membranes compatible with standard filtration systems." },
    { name: "Nucleopore membranes", description: "Polycarbonate track-etched membranes with uniform pore sizes for precision filtering." },
    { name: "Nylon membranes", description: "Nylon membrane filters for general filtration and sample preparation." },
    { name: "Cellulose acetate membranes", description: "Cellulose acetate filters for use in various laboratory and analytical applications." },
  ],
  "Filtration Systems": [
    { name: "Vacuum pump (oil-free)", description: "Energy-efficient oil-free vacuum pump for clean filtration systems." },
    { name: "Stainless steel Manifold set (3 branch)", description: "3-position stainless steel manifold for simultaneous multiple sample filtration." },
    { name: "Stainless steel Manifold set (6 branch)", description: "6-position stainless steel manifold enabling high-throughput sample processing." },
    { name: "Vacuum filtration apparatus", description: "Complete vacuum filtration system setup for laboratory sample preparation." },
    { name: "SPE Cartridge systems", description: "Solid phase extraction cartridge systems for targeted sample preparation." },
    { name: "Bottle-Top-Dispensers", description: "Convenient bottle-top dispensers for media and reagent distribution." },
    { name: "QuEChERS filtration kits", description: "Complete QuEChERS kits for pesticide residue analysis in food matrices." },
  ],
  "Sample Preparation": [
    { name: "Cuvettes", description: "Standard and specialized cuvettes for spectrophotometric analysis." },
    { name: "SPE Cartridge", description: "Disposable solid phase extraction cartridges for sample cleanup and enrichment." },
    { name: "Filter Bags", description: "Mesh filter bags for sample extraction and particle size separation." },
    { name: "Filter Capsules", description: "Sealed filter capsules for pressurized filtration applications." },
    { name: "Glass Distiller Reactor", description: "Laboratory-grade glass reactor for distillation and solvent purification." },
    { name: "Handheld Crimper & Decappers", description: "Manual tools for vial capping and uncapping in sample preparation." },
  ],
  "Specialized Filtration": [
    { name: "Respirators", description: "Protective respirators with filtration media for safe laboratory operation." },
    { name: "Vial & caps & septa", description: "Complete vial closure system including caps and septa for secure sample storage." },
    { name: "ELISA Plate", description: "96-well plates designed for ELISA immunoassay applications." },
  ],
};


const Filtration = () => {
  usePageMeta({
    title: "Filtration Products & Materials | Syringe Filters, Membranes, SPE Columns Kenya",
    description: "Complete filtration solutions including syringe filters, membrane filters, filter papers, vacuum filtration systems, and sample preparation products for analytical and laboratory applications.",
    keywords: "filtration, syringe filters, membrane filters, filter papers, vacuum filtration, SPE columns, sample preparation, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/filtration",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Filtration", url: "/products/filtration" },
    ],
  });

  return (
    <ProductPageLayout
      title="Filtration Products &amp; Systems"
      description="Comprehensive filtration solutions for analytical chemistry, sample preparation, and laboratory applications including syringe filters, membranes, filter papers, and complete vacuum filtration systems."
    >
      {/* Product Categories */}
      <div className="space-y-12">
        {Object.entries(productCategories).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((product, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    {product.description}
                  </p>
                  <Button
                    onClick={() => openProductQuotation(product.name)}
                    className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-medium text-sm"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Quote via WhatsApp
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Description */}
      <div className="mt-16 prose prose-lg max-w-none">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Professional Filtration Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Moris Enterprises supplies complete filtration products and systems for analytical chemistry, environmental testing, pharmaceutical quality control, and research laboratories. Our extensive product range covers syringe filtration, vacuum filtration, membrane separation, and sample preparation.
        </p>
        
        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Our Product Range Includes:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li><strong>Syringe Filters:</strong> Multiple materials (PTFE, Nylon, MCE, PES, PVDF) for different analytes and applications</li>
          <li><strong>Membrane Filters:</strong> Polycarbonate, nylon, cellulose acetate, and specialty membranes</li>
          <li><strong>Filter Papers:</strong> Chemical analysis papers, glass microfiber, and specialty grades</li>
          <li><strong>Vacuum Filtration Systems:</strong> Complete setups with oil-free pumps and manifolds</li>
          <li><strong>SPE & Sample Prep:</strong> Solid phase extraction cartridges and QuEChERS kits</li>
          <li><strong>Specialized Products:</strong> Cuvettes, filter bags, capsules, and laboratory consumables</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Filter Material Selection Guide:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li><strong>PTFE:</strong> Hydrophobic for organic solvents, hydrophilic for aqueous solutions</li>
          <li><strong>Nylon:</strong> Excellent for aqueous samples, solvent resistant</li>
          <li><strong>MCE:</strong> For microbiological applications and particle removal</li>
          <li><strong>PES:</strong> High flow rates, low protein binding</li>
          <li><strong>PVDF:</strong> Chemical resistant, suitable for aggressive solvents</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Applications:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>High-performance liquid chromatography (HPLC) sample preparation</li>
          <li>Gas chromatography (GC) sample filtration</li>
          <li>Environmental water and soil testing</li>
          <li>Pharmaceutical quality control and testing</li>
          <li>Food and beverage analysis</li>
          <li>Microbiological analysis and sterilization</li>
          <li>Clinical laboratory diagnostics</li>
          <li>Industrial process water testing</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Quality Assurance:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>✓ ISO 9001 certified manufacturing</li>
          <li>✓ Pharmaceutical grade purity</li>
          <li>✓ Low extractables and low protein binding</li>
          <li>✓ Sterile options available</li>
          <li>✓ Consistent batch-to-batch performance</li>
          <li>✓ Compatible with all major analytical instruments</li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default Filtration;
