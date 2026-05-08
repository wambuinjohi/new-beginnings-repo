import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const productCategories = {
  "Vials & Caps": [
    {
      name: "2 ML Screw Top Vials & Screw Caps ND9 (9-425) with Micro Insert",
      description: "Premium 2ML screw-top vials with integrated micro inserts for precise sample analysis and chromatography applications.",
    },
    {
      name: "1mL Shell Vial with Microvials PE Plug",
      description: "Compact 1ML shell vials with polyethylene plugs and microvial inserts for small sample volumes.",
    },
    {
      name: "Headspace Vials & Caps",
      description: "Specialized vials designed for headspace analysis in gas chromatography with septum caps.",
    },
    {
      name: "EPA VOC TOC Vials & Caps",
      description: "EPA-compliant vials and caps specifically for volatile organic compound and total organic carbon testing.",
    },
    {
      name: "COD Vials & Caps",
      description: "Certified vials and caps designed for chemical oxygen demand analysis with precise measurements.",
    },
    {
      name: "PFAS Suitable Vials",
      description: "Specialized vials for per- and polyfluoroalkyl substances (PFAS) analysis with inert surfaces.",
    },
    {
      name: "Micro Insert",
      description: "Precision micro inserts for reducing sample volume in standard analytical vials.",
    },
    {
      name: "Turbidimeter Sample Cell Vials (20 mL, 30 mL)",
      description: "Clear vials designed for turbidity measurements with standard cell dimensions.",
    },
  ],
  "Syringe Filters & Filtration": [
    {
      name: "Syringe Filters (25mm, 47mm)",
      description: "Standard syringe filters available in multiple sizes for sample preparation and analysis.",
    },
    {
      name: "Syringe Filters (0.22μm and 0.45μm)",
      description: "Precision syringe filters with precise pore sizes for sterile sample filtration.",
    },
    {
      name: "PTFE Hydrophilic Syringe Filter",
      description: "PTFE hydrophilic filters for aqueous sample filtration and analysis.",
    },
    {
      name: "PTFE Hydrophobic Syringe Filter",
      description: "PTFE hydrophobic filters optimized for organic solvents and non-aqueous samples.",
    },
    {
      name: "Nylon Syringe Filter",
      description: "Nylon filters offering excellent solvent resistance for diverse analytical applications.",
    },
    {
      name: "MCE (Mixed Cellulose Ester) Syringe Filter",
      description: "MCE filters ideal for microbiological applications and general laboratory use.",
    },
    {
      name: "PES (Polyethersulfone) Syringe Filter Sterile",
      description: "Sterile PES filters with low protein binding for pharmaceutical and biotech applications.",
    },
    {
      name: "PVDF Hydrophilic Syringe Filter",
      description: "PVDF hydrophilic filters for aggressive chemical environments and specialized applications.",
    },
    {
      name: "Syringeless Filter Vial Captiva Filter Vials",
      description: "Innovative captiva-style filter vials for convenient sample preparation without syringes.",
    },
    {
      name: "Vacuum Syringe Filter",
      description: "Vacuum-compatible syringe filters for use with vacuum filtration systems.",
    },
    {
      name: "Filter Membrane",
      description: "Replacement filter membranes for compatible with various filtration systems.",
    },
  ],
  "Sample Preparation & Extraction": [
    {
      name: "SPE Column (Solid Phase Extraction)",
      description: "High-capacity solid phase extraction columns for comprehensive sample preparation.",
    },
    {
      name: "SPE Cartridge",
      description: "Disposable SPE cartridges with various sorbent chemistries for targeted extractions.",
    },
    {
      name: "Autosampler Vials Cap & Septa",
      description: "Compatible autosampler vials with caps and septa for automated sample injection systems.",
    },
    {
      name: "Micro-Insert",
      description: "Precision micro-inserts designed to reduce sample volume in standard vials.",
    },
  ],
  "Pipetting & Laboratory Consumables": [
    {
      name: "Serological Pipettes",
      description: "Sterile serological pipettes for accurate liquid transfer in cell culture and lab work.",
    },
    {
      name: "Pipette Tips",
      description: "Universal pipette tips compatible with standard pipettors for precise sample handling.",
    },
    {
      name: "Rainin Tips",
      description: "Premium Rainin-brand pipette tips for superior accuracy and compatibility.",
    },
    {
      name: "Gel Loading Tips",
      description: "Specialized fine tips for gel loading in electrophoresis and molecular biology applications.",
    },
    {
      name: "Petri Dish",
      description: "Standard sterile petri dishes for culture growth and microbial analysis.",
    },
    {
      name: "Inoculation Loop",
      description: "Sterile inoculation loops for microbial transfer and streak plating.",
    },
    {
      name: "Cell Strainer & Spreader & Scraper",
      description: "Multi-purpose laboratory tools for cell separation, spreading, and sample preparation.",
    },
    {
      name: "Centrifuge Tubes & Bottles",
      description: "Various capacity centrifuge tubes and bottles for sample separation and storage.",
    },
    {
      name: "ELISA Plate & Deep Well Plate",
      description: "Specialized plates for ELISA assays and high-volume sample handling.",
    },
    {
      name: "PCR Tubes & Strips & Plate",
      description: "Precision tubes and plates designed for PCR amplification and thermal cycling.",
    },
  ],
};


const ChromatographyConsumables = () => {
  usePageMeta({
    title: "Chromatography & Analytical Consumables | Vials, Filters, SPE Columns Kenya",
    description: "Premium chromatography and analytical laboratory consumables including vials, syringe filters, SPE columns, autosampler vials, and sample preparation products for GC, LC, and analytical testing.",
    keywords: "chromatography consumables, vials, syringe filters, SPE column, autosampler vials, laboratory consumables, analytical supplies, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/chromatography-consumables",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Chromatography & Analytical", url: "/products/chromatography-consumables" },
    ],
  });

  return (
    <ProductPageLayout
      title="Chromatography &amp; Analytical Consumables"
      description="Complete range of chromatography and analytical consumables for GC, LC, and other separation techniques including vials, filters, sample preparation columns, and laboratory supplies."
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
          Professional Chromatography & Analytical Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We supply the highest quality chromatography and analytical consumables for laboratory professionals. Our products are essential for accurate results in gas chromatography (GC), liquid chromatography (LC), and other analytical techniques.
        </p>
        
        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Our Product Range Includes:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li><strong>Vials & Caps:</strong> Standard and specialty vials for headspace, VOC, COD, and PFAS analysis</li>
          <li><strong>Syringe Filters:</strong> Multiple materials (PTFE, Nylon, MCE, PES, PVDF) for different applications</li>
          <li><strong>Sample Preparation:</strong> SPE columns, cartridges, and micro-inserts for sample extraction</li>
          <li><strong>Autosampler Products:</strong> Vials, caps, and septa for automated sample analysis</li>
          <li><strong>Filtration Systems:</strong> Complete vacuum filtration setups and filter membranes</li>
          <li><strong>Laboratory Consumables:</strong> Pipette tips, petri dishes, centrifuge tubes, PCR plates</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Product Specifications:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>✓ Pharmaceutical grade quality</li>
          <li>✓ Compatible with all major analytical instruments</li>
          <li>✓ Pre-sterilized and ready-to-use options available</li>
          <li>✓ Multiple filter materials for different analytes</li>
          <li>✓ Consistent performance and batch quality</li>
          <li>✓ EPA, USP, and international compliance</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Applications:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>Environmental analysis and monitoring</li>
          <li>Water quality testing (VOC, COD, PFAS)</li>
          <li>Pharmaceutical and drug testing</li>
          <li>Food and beverage analysis</li>
          <li>Clinical and laboratory research</li>
          <li>Industrial quality control</li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default ChromatographyConsumables;
