import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const productCategories = {
  "Culture Media & Agars (500g)": [
    { name: "R2A Agar", description: "Low-nutrient agar for isolation of slow-growing heterotrophic bacteria from water.", image: "https://cdn.builder.io/api/v1/image/assets%2Fe9044b82bebf49928ccb9f4ba8ad01b9%2F07c22b9125e34c85832e67fc4f3c1d61?format=webp&width=800" },
    { name: "AATCC Bacteriostasis Agar", description: "Specialized agar for evaluating bacteriostatic properties of textiles." },
    { name: "Alkaline Peptone Water", description: "Enrichment medium for isolation of Vibrio species." },
    { name: "Antibiotic Assay Medium", description: "Standardized medium for antibiotic potency testing and microbiological assays." },
    { name: "Azotobacter Agar (Mannitol)", description: "Selective medium for isolation of Azotobacter nitrogen-fixing bacteria." },
    { name: "b-Streptococcus Selective Agar Base", description: "Selective medium for β-hemolytic Streptococcus isolation." },
    { name: "B.T.B. Lactose Agar", description: "Differential agar for detecting lactose fermentation in gram-negative bacteria." },
    { name: "Bacillus Cereus Agar", description: "Selective agar for Bacillus cereus identification in food samples." },
    { name: "EMB Agar", description: "Eosin-methylene blue agar for gram-negative bacteria isolation and differentiation." },
    { name: "M-FC Agar", description: "Fecal coliform medium for water quality testing." },
    { name: "Soya Bean Casein Digest Agar (TS Agar)", description: "General-purpose medium for routine microbiological culture and cultivation." },
    { name: "Malt Extract Agar", description: "Selective medium for fungal isolation and yeasts cultivation." },
    { name: "Brilliant Green Agar", description: "Selective medium for Salmonella isolation from clinical and food samples." },
    { name: "Urea Base Agar", description: "Medium for urease-positive organism identification." },
    { name: "Azide Dextrose Agar", description: "Selective medium for gram-positive bacteria enumeration." },
    { name: "Triple Sugar Iron Agar", description: "Differential medium for identifying enteric bacteria." },
    { name: "Peptone Water", description: "Basic enrichment medium for bacterial growth and maintenance." },
    { name: "Buffered Peptone Agar", description: "Phosphate-buffered medium for stable pH during microbial cultivation." },
    { name: "Chapman Stone Agar", description: "Selective medium for Staphylococcus aureus isolation." },
    { name: "CLED Agar", description: "Cystine-lactose-electrolyte-deficient medium for urinary pathogen isolation." },
    { name: "Sabouraud Dextrose Agar", description: "Standard medium for fungal and yeast culture." },
    { name: "D-Glucose Agar", description: "Glucose-based medium for fermentation testing." },
    { name: "XLD Agar", description: "Xylose-lysine-desoxycholate agar for Shigella and Salmonella isolation." },
    { name: "TBX Agar", description: "Chromogenic agar for E. coli detection in water testing." },
    { name: "Mueller Hinton Agar", description: "Standard medium for antimicrobial susceptibility testing." },
    { name: "Nutrient Agar", description: "General-purpose non-selective medium for routine bacterial cultivation." },
    { name: "Rappaport Vasiliaddis Agar", description: "Selective enrichment medium for Salmonella isolation." },
    { name: "Salmonella Shigella Agar", description: "Differential medium for Salmonella and Shigella isolation." },
    { name: "Luria Bertani Agar", description: "Rich medium used in molecular biology and genetic research." },
    { name: "Violet Red Bile Agar", description: "Selective medium for gram-negative bacteria enumeration." },
    { name: "Baird Parker Agar Base", description: "Selective medium for Staphylococcus aureus detection." },
    { name: "Potato Dextrose Agar", description: "Medium for fungal cultivation and maintenance." },
    { name: "MacConkey Agar", description: "Selective differential agar for gram-negative bacteria identification." },
    { name: "Plate Count Agar", description: "Standard medium for total aerobic plate count." },
    { name: "Yeast Extract Agar", description: "Enriched medium for yeast cultivation." },
    { name: "Endo Agar", description: "Selective agar for coliform detection." },
    { name: "Blood Agar Base (Infusion Agar Base)", description: "Blood agar for hemolysis detection and gram-positive bacteria culture." },
    { name: "Mannitol Salt Agar", description: "Selective differential agar for Staphylococcus aureus isolation." },
    { name: "Rose Bengal Agar", description: "Selective medium for fungal isolation." },
    { name: "Kligler Iron Agar", description: "Differential medium for gram-negative enteric bacteria identification." },
    { name: "Brain Heart Infusion Agar", description: "Rich medium for fastidious organisms cultivation." },
    { name: "Agar Powder for Bacteriology", description: "High-purity agar for custom media preparation." },
    { name: "Infusion Agar Base", description: "Nutrient-rich base for preparing specialized media." },
    { name: "Beef Extract Agar", description: "Beef-based enriched agar for bacterial growth." },
    { name: "Orange Serum Agar", description: "Medium for Lactobacillus isolation and cultivation." },
    { name: "Cetrimide Agar Base", description: "Selective medium for Pseudomonas aeruginosa isolation." },
    { name: "CLED Agar with Bromothymol Blue", description: "Enhanced CLED medium with color indicator for urinary pathogens." },
    { name: "Microbial Content Test Agar", description: "General-purpose agar for microbial contamination testing." },
    { name: "Letheen Agar", description: "Neutralizing agar for disinfectant/preservative testing." },
    { name: "Pseudomonas Agar Base", description: "Selective medium for Pseudomonas species isolation." },
    { name: "Acetate Agar", description: "Medium for acetate utilization testing." },
    { name: "Kings B Agar Medium", description: "Selective medium for Pseudomonas fluorescens isolation." },
    { name: "Slantez Bartley Agar", description: "Medium for fecal enterococci detection." },
    { name: "Bile Aesculin Azide Agar", description: "Selective medium for Enterococcus identification." },
    { name: "CCA-Chromogenic Coliform Agar", description: "Chromogenic agar for coliform and E. coli detection." },
    { name: "Brucella Agar Base", description: "Enriched medium for Brucella species cultivation." },
    { name: "Deoxycholate Lactose Agar", description: "Selective medium for gram-negative bacteria isolation." },
    { name: "Chocolate Agar", description: "Enriched medium for fastidious gram-negative bacteria." },
    { name: "Brilliant Green Bile Agar", description: "Selective medium for gram-negative enterobacteria." },
    { name: "Dichloran Rose Bengal Chloramphenicol Agar (DRBC)", description: "Selective medium for fungal enumeration in food samples." },
    { name: "Iron Sulphite Agar", description: "Differential agar for sulfite-reducing bacteria detection." },
    { name: "Slanetz and Bartley Medium", description: "Medium for fecal streptococcus detection in water." },
    { name: "MRS Agar (De-Man Rogosa Sharpe Agar)", description: "Selective medium for Lactobacillus and lactic acid bacteria." },
    { name: "TCBS Agar", description: "Selective agar for Vibrio species isolation." },
    { name: "Simmons Citrate Agar", description: "Differential medium for citrate utilization testing." },
    { name: "Total Plate Count Agar", description: "Standard agar for enumerating viable aerobic bacteria." },
    { name: "Tergitol 7 Agar Base", description: "Selective medium for coliform bacteria detection." },
    { name: "Bismuth Sulphite Agar", description: "Selective medium for Salmonella isolation." },
    { name: "SIM MEDIUM", description: "Medium for sulfide, indole, and motility testing." },
    { name: "Malachite Green Agar", description: "Selective medium for Bacillus spore germination." },
    { name: "Dichloran-Glycerol (DG-18) Agar", description: "Low-water activity medium for xerophilic fungal isolation." },
    { name: "Tryptone Soya Agar", description: "Versatile general-purpose medium for bacteria and fungi." },
    { name: "Iron Sulfite Agar", description: "Medium for detecting sulfite-reducing bacteria." },
    { name: "Tryptone Soya Yeast Extract Agar (TSYE)", description: "Enriched medium for fastidious organism cultivation." },
    { name: "L-Lysine Decarboxylase Broth (LDC)", description: "Biochemical test medium for bacterial identification." },
    { name: "Bolton Selective Enrichment Broth", description: "Enrichment medium for Campylobacter isolation." },
    { name: "Eugon LT 100 Broth", description: "Broth formulation for fastidious organism isolation." },
    { name: "Eugon LT 100 Agar", description: "Agar for low-nutrient fastidious bacteria cultivation." },
    { name: "Corn Meal Agar with 1% Polysorbate 80", description: "Medium for yeast morphology examination." },
    { name: "Cefixime Tellurite Sorbitol MacConkey (CT-SMAC)", description: "Chromogenic medium for Shiga toxin-producing E. coli detection." },
    { name: "Camplobacter Agar Base", description: "Selective medium for Campylobacter jejuni isolation." },
    { name: "Cysterine Lactose Electroiyte Deficient", description: "Selective medium for urinary pathogen isolation." },
    { name: "Hektoen Enteric Agar (RDM-HEA-01)", description: "Differential medium for Salmonella and Shigella isolation." },
    { name: "Tryptose Sulphite Cycloserine Agar Base (TSCAB)", description: "Selective medium for Clostridium difficile detection." },
    { name: "Sheep Blood Agar Base (RDM-SBA-01)", description: "Enriched blood agar for gram-positive and fastidious organism culture." },
  ],
  "Broths & Fermentation Media (500g)": [
    { name: "Soya Bean Casein Digest Medium (TS Broth)", description: "Standard broth for non-selective microbial growth and enumeration.", image: "https://cdn.builder.io/api/v1/image/assets%2Fe9044b82bebf49928ccb9f4ba8ad01b9%2Fb2b0cfbcc0414644adb624adeb1e4292?format=webp&width=800" },
    { name: "Malt Extract Broth", description: "Enriched broth for fungal cultivation." },
    { name: "Brilliant Green Broth", description: "Selective enrichment broth for Salmonella isolation." },
    { name: "MRS Broth", description: "Selective broth for lactic acid bacteria cultivation." },
    { name: "Tetrathionate Broth", description: "Enrichment broth for Salmonella and Shigella." },
    { name: "Nutrient Broth", description: "General-purpose broth for routine bacterial culture." },
    { name: "Rappaport Vasiliaddis Broth", description: "Selective enrichment broth for Salmonella isolation." },
    { name: "Luria Bertani Broth", description: "Rich growth medium for molecular biology applications." },
    { name: "E.C Broth", description: "Selective broth for fecal coliform detection." },
    { name: "Potato Dextrose Broth", description: "Standard broth for fungal growth and fermentation." },
    { name: "MacConkey Broth", description: "Selective broth for gram-negative bacteria isolation." },
    { name: "BHI Broth", description: "Brain heart infusion broth for fastidious organisms." },
    { name: "Brilliant Green Bile Broth", description: "Selective broth for gram-negative enterobacteria." },
    { name: "Letheen Broth", description: "Neutralizing broth for disinfectant testing." },
    { name: "Tryptone Azolectic Broth", description: "Medium for testing azole antifungal susceptibility." },
    { name: "Buffered Glucose Broth", description: "pH-buffered medium for fermentation studies." },
    { name: "Lactose Gelatin Medium Modified", description: "Medium for delayed-acid producing bacteria." },
    { name: "Azide Dextrose Broth", description: "Selective broth for gram-positive bacteria enumeration." },
    { name: "Acetamide Broth", description: "Medium for testing acetamide utilization." },
    { name: "Selenite F Broth", description: "Selective enrichment for Salmonella isolation." },
    { name: "Listeria Enrichment Broth Modified", description: "Enrichment medium for Listeria monocytogenes." },
    { name: "Sabouraud Dextrose Broth", description: "Standard broth for yeast and fungal cultivation." },
    { name: "Tryptophan Broth (RDM-TpB-01)", description: "Medium for indole production testing." },
    { name: "Alkaline Saline Peptone Water (RDM-APW-03)", description: "Enrichment medium for Vibrio species." },
    { name: "Moeller Decarboxylase Broth (RDM-DCX-01)", description: "Medium for amino acid decarboxylase testing." },
    { name: "Fraser Broth Base (RDM-FBB-01)", description: "Selective enrichment broth for Listeria." },
    { name: "Buffered Listeria Enrichment Broth Base (RDM-BLEB-01)", description: "Enhanced medium for Listeria enrichment." },
    { name: "Lysine Decarboxylase Broth (RDM-LDB-01)", description: "Medium for lysine decarboxylase enzyme detection." },
    { name: "Buffered Glucose Broth MRVP Broth (RDM-MRVP-01)", description: "Medium for methyl red and Voges-Proskauer testing." },
    { name: "Eugon LT 100 Broth", description: "Low-nutrient broth for fastidious organisms." },
    { name: "Eugon LT 100 Agar", description: "Agar version of low-nutrient medium." },
    { name: "Tryptone Soya Broth", description: "Versatile broth for general bacterial cultivation." },
    { name: "Bolton Selective Enrichment Broth", description: "Enrichment medium for Campylobacter species." },
    { name: "D/E (Dey Engley) Neutralizing Broth", description: "Neutralizing medium for preservative and disinfectant testing." },
    { name: "Rhamnose Broth", description: "Medium for rhamnose fermentation testing." },
  ],
  "Specialty & Diagnostic Media": [
    { name: "Anaerobic Fermentation Medium Base", description: "Medium for cultivating obligate anaerobes.", image: "https://cdn.builder.io/api/v1/image/assets%2Fe9044b82bebf49928ccb9f4ba8ad01b9%2F74e5aa7c6f1c46c9aa2189128f8ad0f6?format=webp&width=800" },
    { name: "b-Streptococcus Selective Agar Base", description: "Selective medium for β-hemolytic streptococci." },
    { name: "Urea Agar (Christensen)", description: "Medium for urease enzyme detection." },
    { name: "Lauryl Sulphate Broth", description: "Broth for presumptive coliform detection." },
    { name: "Bacto Peptone", description: "High-quality peptone for media preparation." },
    { name: "Enzymatic Peptone", description: "Enzymatically derived peptone for specialized media." },
    { name: "Stuart Transport Media", description: "Transport medium maintaining viability of fastidious organisms." },
    { name: "Cary Blair Media Base", description: "Transport medium for enteric bacteria." },
    { name: "SIM MEDIUM", description: "Medium for sulfide, indole, and motility determination." },
    { name: "Hektoen Enteric Agar", description: "Differential agar for enteric pathogen isolation." },
    { name: "Perfringens Agar Base (O.P.S.P.)", description: "Selective medium for Clostridium perfringens." },
    { name: "Mueller Kauffman Tetrathionate Broth Base", description: "Enrichment medium for Salmonella isolation." },
    { name: "Selenite Cysteine Broth (Twin pack)", description: "Selective enrichment for Salmonella and Shigella." },
    { name: "Chloramphenicol Yeast Glucose Agar", description: "Selective agar for fungal isolation." },
    { name: "Dichloran Rose Bengal Chloramphenicol Agar (DRBC)", description: "Selective medium for fungal enumeration." },
    { name: "Iron Sulphite Agar", description: "Medium for detecting sulfite-reducing bacteria." },
    { name: "Slanetz and Bartley Medium", description: "Medium for fecal streptococci detection." },
    { name: "Bile Esculin Agar", description: "Differential medium for Enterococcus identification." },
    { name: "Pseudomonas Agar", description: "Selective medium for Pseudomonas species." },
    { name: "Kings B Medium Agar", description: "Medium for Pseudomonas fluorescens isolation." },
    { name: "Acetamide Broth", description: "Medium for acetamide utilization testing." },
    { name: "DNaSE Test Agar Base", description: "Agar for detecting DNase-producing organisms." },
    { name: "Sheep Blood Agar Base", description: "Enriched medium for fastidious organisms." },
    { name: "Listeria Identification PALCAM Agar Base", description: "Selective medium for Listeria monocytogenes." },
    { name: "Wilson Blair Agar Base", description: "Medium for Salmonella isolation." },
    { name: "Tryptic Soya Agar", description: "Universal agar for general bacterial cultivation." },
    { name: "Lysine Decarboxylase Broth", description: "Medium for lysine decarboxylase testing." },
    { name: "Moeller Decarboxylase Broth", description: "Medium for amino acid decarboxylase testing." },
    { name: "Fraser Broth Base", description: "Selective enrichment for Listeria isolation." },
    { name: "Cysterine Lactose Electroiyte Deficient", description: "Selective medium for urinary pathogen isolation." },
    { name: "Glucose Agar", description: "Glucose-containing medium for fermentation testing." },
    { name: "Lactobacillus MRS Agar", description: "Selective medium for Lactobacillus species." },
    { name: "Malachite Green Agar", description: "Selective medium for Bacillus species." },
    { name: "Buffered Glucose Broth (MRVP Broth)", description: "Medium for Methyl Red-Voges-Proskauer testing." },
    { name: "Bismuth Sulphite Agar", description: "Selective medium for Salmonella detection." },
    { name: "Buffered Listeria Enrichment Broth Base", description: "Enhanced enrichment medium for Listeria." },
  ],
  "Chemical Reagents & Indicators": [
    { name: "Kovacs Reagent", description: "Reagent for indole test in bacterial identification.", image: "https://cdn.builder.io/api/v1/image/assets%2Fe9044b82bebf49928ccb9f4ba8ad01b9%2F89ef01c521d74acda73de2a03c44c803?format=webp&width=800" },
    { name: "Salicylic Acid AR", description: "Analytical reagent grade salicylic acid." },
    { name: "Pentane Sulphonic Acid Sodium Salt Monohydrate AR/HPLC", description: "HPLC-grade ion pair reagent for chromatography." },
    { name: "Phenolphthalein pH Indicator 100g AR", description: "Analytical grade pH indicator dye." },
    { name: "Potassium Iodide AR 500g", description: "Analytical reagent grade potassium iodide." },
    { name: "Maximum Recovery Diluent", description: "Protective diluent for recovering microorganisms from samples." },
    { name: "Aquasol Total Hardness Test Kit", description: "Complete kit for water hardness determination." },
    { name: "Sodium Dodecyl Sulfate Polymyxin Sucrose", description: "Selective agent for microbiological media." },
  ],
  "Microbiological Testing Kits": [
    { name: "Wagtech Potatech+", description: "Advanced portable microbiological water testing device.", image: "https://cdn.builder.io/api/v1/image/assets%2Fe9044b82bebf49928ccb9f4ba8ad01b9%2F4a80a60b51244fd5b31274d42c52df31?format=webp&width=800" },
    { name: "Wagtech Potalab+", description: "Laboratory-grade Wagtech microbiological testing system." },
    { name: "Wagtech Potakit", description: "Complete kit for water microbiological testing." },
    { name: "Wagtech Potacheck", description: "Rapid screening system for microbial analysis." },
    { name: "Wagtech Potatest Classic", description: "Standard Wagtech microbiological testing apparatus." },
  ],
};


const MicrobiologyBiotechnology = () => {
  usePageMeta({
    title: "Microbiology & Biotechnology Culture Media | Laboratory Agar & Broths Kenya",
    description: "Comprehensive microbiology supplies including 100+ culture media, agars, broths, and fermentation media. Wagtech microbiological testing kits. High-purity reagents for research and industrial applications.",
    keywords: "culture media, agar, microbiology supplies, laboratory media, fermentation media, microbial culture, biotechnology, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/microbiology-biotechnology",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Microbiology & Biotechnology", url: "/products/microbiology-biotechnology" },
    ],
  });

  return (
    <ProductPageLayout
      title="Microbiology and Biotechnology"
      description="Extensive range of microbiological culture media, agars, broths, and fermentation supplies including over 100 specialized products for microbial research, clinical diagnostics, and industrial applications."
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
                  className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                    product.image ? "overflow-hidden" : "p-4"
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
                  <div className={product.image ? "p-4 flex flex-col h-full" : "p-4 flex flex-col h-full"}>
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
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Description */}
      <div className="mt-16 prose prose-lg max-w-none">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Complete Microbiology & Biotechnology Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We supply the most comprehensive range of microbiological culture media, agars, and fermentation products in Kenya. With over 100 specialized formulations, we support research, clinical diagnostics, quality control, and industrial microbiology applications.
        </p>
        
        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Our Product Range Includes:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li><strong>General Purpose Media:</strong> Nutrient agar, peptone water, nutrient broth for routine microbial cultivation</li>
          <li><strong>Selective & Differential Media:</strong> Specialty agars for isolation and identification of specific microorganisms</li>
          <li><strong>Enrichment Media:</strong> Specialized broths for selective enrichment of target organisms</li>
          <li><strong>Fermentation Media:</strong> Complete formulations for microbial fermentation and biotechnology applications</li>
          <li><strong>Diagnostic Media:</strong> Specialized products for clinical and industrial quality control testing</li>
          <li><strong>Testing Kits:</strong> Wagtech microbiological testing kits for rapid microbial analysis</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Product Features:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>✓ Dehydrated formulations (500g packs) for easy reconstitution</li>
          <li>✓ High purity, pharmaceutical-grade ingredients</li>
          <li>✓ Consistent batch quality and performance</li>
          <li>✓ Ready-to-use prepared media plates available</li>
          <li>✓ Suitable for clinical, research, and industrial laboratories</li>
          <li>✓ Compliant with ISO and international standards</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Applications:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>Clinical microbiology and infectious disease diagnosis</li>
          <li>Food and beverage industry quality control</li>
          <li>Pharmaceutical testing and validation</li>
          <li>Environmental and water microbiology testing</li>
          <li>Biotech research and development</li>
          <li>Industrial microbiology and fermentation</li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default MicrobiologyBiotechnology;
