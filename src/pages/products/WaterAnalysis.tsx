import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const productCategories = {
  "Palintest Photometers": [
    { name: "Lumiso Expert Photometer (Water Testing & Analysis)", description: "Advanced photometer for comprehensive water testing and quality analysis with expert-level accuracy." },
    { name: "Lumiso Pooltest Expert", description: "Professional photometer designed specifically for swimming pool water quality testing." },
    { name: "Lumiso Pooltest 9", description: "Versatile pool testing photometer with nine measurement parameters." },
    { name: "Lumiso Pooltest 6", description: "Practical pool testing system with six key measurement parameters." },
    { name: "Lumiso Pooltest 3", description: "Essential pool testing photometer with three core measurements." },
    { name: "Lumiso Ammonia", description: "Specialized photometer for ammonia detection in water samples." },
    { name: "Lumiso Chlorine", description: "Dedicated photometer for free and total chlorine measurement." },
    { name: "Lumiso Chlorine Dioxide", description: "Photometer designed for chlorine dioxide analysis in water treatment." },
  ],
  "Palintest Tablet Tests (250 Tablets)": [
    { name: "AP188 - Alkalinity Total (0-500 mg/L)", description: "Tablet test for total alkalinity measurement in water samples." },
    { name: "Aluminium (0-0.5 mg/L)", description: "Test tablet for aluminum concentration detection." },
    { name: "AP166 - Ammonia", description: "Ammonia determination test using tablet reagent." },
    { name: "AP060 - Calcium Hardness (0-500 mg/L)", description: "Tablet test for calcium hardness in water samples." },
    { name: "AP252 - Chloride (0-500 mg/L)", description: "Chloride concentration testing using color-change tablets." },
    { name: "AP268 - Chlorine HR (0-250 mg/L)", description: "High-range chlorine test tablets for treated water analysis." },
    { name: "AP162 - Chlorine F, C & T (Liquid) (0-5 mg/L)", description: "Tablet test for free, combined, and total chlorine measurement." },
    { name: "AP031 - Chlorine Free (0-5 mg/L)", description: "Tablet test specifically for free chlorine determination." },
    { name: "AP011 - Chlorine Free & Total (0-10 mg/L)", description: "Combined test tablets for free and total chlorine." },
    { name: "AP033 - Chlorine Free (XF) (0-10 mg/L)", description: "Extended-range free chlorine test tablets." },
    { name: "AP013 - Chlorine Total (0-5 mg/L)", description: "Total chlorine measurement using tablet reagent." },
    { name: "AP041 - Chromium (VI) (0-1 mg/L)", description: "Chromium hexavalent detection and measurement tablet." },
    { name: "AP295 - Colour (10-500 mg/L)", description: "Color determination test tablets for water analysis." },
    { name: "PM269 - Copper Free (0-5 mg/L)", description: "Free copper concentration test tablets." },
    { name: "AP187 - Copper Free and Total (0-5 mg/L)", description: "Combined copper speciation test tablets." },
    { name: "AP186 - Cyanuric Acid (0-200 mg/L)", description: "Cyanuric acid concentration measurement tablets." },
    { name: "AP179 - Fluoride (0-1.5 mg/L)", description: "Fluoride detection and measurement tablets." },
    { name: "AP254L - Hardness Total (0-300 mg/L)", description: "Total water hardness determination tablets." },
    { name: "AP105 - Hydrogen Peroxide HR (0-100 mg/L)", description: "High-range hydrogen peroxide test tablets." },
    { name: "AP104 - Iron HR (0-10 mg/L)", description: "High-range iron concentration test tablets." },
    { name: "AP156 - Iron LR (0-1 mg/L)", description: "Low-range iron detection tablets." },
    { name: "AP155 - Iron MR (0-5 mg/L)", description: "Mid-range iron concentration test tablets." },
    { name: "AP292 - Magnesium (0-50 mg/L)", description: "Magnesium concentration measurement tablets." },
    { name: "AP193 - Manganese HR (0-5 mg/L)", description: "High-range manganese detection tablets." },
    { name: "AP174 - Manganese LR (0-0.03 mg/L)", description: "Low-range manganese measurement tablets." },
    { name: "AP173L - Nickel (0-10 mg/L)", description: "Nickel concentration determination tablets." },
    { name: "AP284 - Nitrate (0-1 mg/L)", description: "Nitrate concentration test tablets." },
    { name: "AP109 - Nitrite (0-1500 mg/L)", description: "Nitrite detection and measurement tablets." },
    { name: "AP260 - Ozone (0-3 mg/L)", description: "Ozone residual concentration test tablets." },
    { name: "AP056 - Phosphate/12P (0-12 mg/L)", description: "Phosphate concentration measurement tablets." },
    { name: "AP177 - pH-Phenol Red (6.5-8.4)", description: "pH determination using phenol red indicator tablets." },
    { name: "AP130 - Potassium (0-12 mg/L)", description: "Potassium concentration test tablets." },
  ],
  "Palintest Tube Tests": [
    { name: "PL400 - Ammonia/100N Tubetest Nessler (0-100 mg/L)", description: "Tube test for ammonia using Nessler reagent method." },
    { name: "PL425 - Ammonia/50N Tubetest Nessler (0-50 mg/L)", description: "Mid-range ammonia tube test with Nessler reagent." },
    { name: "PL424 - Bromine Total (0-10 mg/L)", description: "Total bromine measurement using tube test method." },
    { name: "PL453, PL463, PL468 - COD/150 (0-150 mg/L)", description: "Chemical oxygen demand tube test for low concentrations." },
    { name: "PL450, PL460, PL461 - COD/2000 (0-2000 mg/L)", description: "High-range COD tube test for concentrated samples." },
    { name: "PL454, PL464, PL465 - COD/20000 (0-20000 mg/L)", description: "Extended-range COD measurement tube test." },
    { name: "PL456, PL466, PL467 - COD/400 (0-400 mg/L)", description: "Mid-range COD tube test method." },
    { name: "PL452, PL462 - COD Mn (0-10 mg/L)", description: "Manganese-based COD determination tube test." },
  ],
  "Palintest Microbiological Testing Kits": [
    { name: "Wagtech Potatech+", description: "Advanced portable Wagtech device for microbiological water testing." },
    { name: "Wagtech Potalab+", description: "Laboratory-grade Wagtech microbiological testing system." },
    { name: "Wagtech Potakit", description: "Complete kit for rapid microbiological analysis." },
    { name: "Wagtech Potacheck", description: "Quick screening system for microbial contamination." },
    { name: "Wagtech Potatest Classic", description: "Standard Wagtech microbiological testing apparatus." },
  ],
  "HACH Laboratory Instruments": [
    { name: "HACH DR3900 Laboratory VIS Spectrophotometer", description: "Benchtop visible spectrophotometer for laboratory water analysis." },
    { name: "HACH DR6000 UV Visible Spectrophotometer", description: "Advanced UV-Vis spectrophotometer for comprehensive water testing." },
    { name: "HACH DR1900 Portable Spectrophotometer", description: "Portable spectrophotometer for field water quality testing." },
    { name: "HACH DR1010 COD Rapid Determination Instrument", description: "Rapid COD analyzer for quick determination of organic content." },
    { name: "HACH HT200S COD High Temperature Dissolver", description: "High-temperature digester for COD sample preparation." },
    { name: "HACH DRB200 Heating Digester", description: "Heating block digester for wastewater analysis." },
    { name: "HACH DR300 Chlorine Dioxide Pocket Colorimeter", description: "Portable colorimeter for chlorine dioxide measurement." },
    { name: "HACH DR300 Pocket Ozone Colorimeter", description: "Handheld colorimeter for ozone residual testing." },
  ],
  "Portable Laboratory Equipment": [
    { name: "Portable Colorimeter", description: "Compact colorimeter for on-site water quality measurements." },
    { name: "COD Reactor", description: "Portable reactor system for COD sample digestion." },
    { name: "COD Analyzer", description: "Field-deployable analyzer for chemical oxygen demand testing." },
    { name: "Turbidity Meter", description: "Portable turbidity measurement device for water clarity testing." },
    { name: "Portable DO Meter", description: "Handheld dissolved oxygen meter for water quality assessment." },
  ],
  "Bench Top Instruments": [
    { name: "Bench Top pH Meter", description: "Laboratory pH meter for accurate hydrogen ion concentration measurement." },
    { name: "Bench Top Conductivity Meter", description: "Benchtop conductivity meter for dissolved solids analysis." },
  ],
  "Portable Water Quality Meters": [
    { name: "Portable pH Meter (Pen Type)", description: "Handheld pen-type pH meter for quick field pH testing." },
    { name: "Pen Type Conductivity Meter", description: "Portable conductivity measurement device." },
    { name: "Pen Type TDS Meter", description: "Handheld total dissolved solids meter." },
    { name: "Pen Type ORP Meter", description: "Portable oxidation-reduction potential meter." },
    { name: "Salinity Meter", description: "Specialized meter for salt concentration measurement." },
    { name: "Online Meter", description: "Continuous water quality monitoring instrument." },
    { name: "Total Nitrogen Detection Meter", description: "Meter for total nitrogen measurement in water." },
  ],
  "Multi-Parameter Water Quality Testers": [
    { name: "3 in 1 Water Tester Multi-parameter pH Monitor (TDS/PH/Temp)", description: "Three-parameter tester for pH, TDS, and temperature." },
    { name: "3 in 1 Multi-parameter PH Monitor", description: "Triple-parameter water quality monitor." },
    { name: "Soil 4in1 4in1 Soil Meter", description: "Soil analysis meter with four measurement parameters." },
    { name: "Soil 4in1 4in1 Plant Earth Soil PH Moisture Light Soil Meter Thermometer", description: "Comprehensive soil tester measuring pH, moisture, light, and temperature." },
    { name: "ORP-169E Digital Pen Type ORP Meter Water Control Tester Waterproof Display Temperature", description: "Waterproof ORP meter with temperature compensation." },
    { name: "TDS Meter Aquarium Pool Water Tester Wine Urine LCD Pen Monitor", description: "Versatile TDS meter for multiple liquid applications." },
    { name: "5 in 1 Meter SALT/EC/TDS/S.G./TEMP With LCD Display", description: "Five-parameter meter measuring salinity, conductivity, TDS, specific gravity, and temperature." },
    { name: "Portable pH Meter 7 in 1 Smart (pH/TDS/EC/ORP/Salinity/S.G/Temperature)", description: "Advanced seven-parameter smart meter for comprehensive analysis." },
    { name: "Portable pH Meter 7 in 1 Smart (pH/TDS/EC/)", description: "Smart meter with seven measurement capabilities." },
    { name: "2 In 1 Water Quality Meter LCD Backlight Display (CL/Temp)", description: "Dual-parameter meter for chlorine and temperature with backlit display." },
    { name: "4 In 1 Water Meter (CL/ORP/H2/TEMP) Residual Chlorine Meter", description: "Four-parameter meter including chlorine, ORP, hydrogen, and temperature." },
    { name: "4 In 1 Portable Meter", description: "Compact four-parameter water quality analyzer." },
    { name: "5 in 1 Water Quality Meter (PH/CL/ORP/H2/TEMP) Chlorine Tester", description: "Five-parameter comprehensive water tester with chlorine detection." },
    { name: "5 in 1 Water Quality Meter", description: "Versatile five-parameter water quality measurement device." },
    { name: "2 in 1 PH & Residual Chlorine Test Chlorine Detector Water", description: "Dual-function meter for pH and chlorine testing." },
  ],
  "Electrodes & Sensors": [
    { name: "pH Electrode", description: "Replacement pH electrode for compatible meter systems." },
    { name: "Conductivity Electrode", description: "Conductivity sensor for water quality measurements." },
    { name: "ORP Electrode", description: "Oxidation-reduction potential electrode for analysis." },
    { name: "DO Electrode", description: "Dissolved oxygen sensor for water quality testing." },
  ],
  "Master Distributor Brands": [
    { name: "Milwaukee Water Testing Equipment", description: "Official distributor of Milwaukee brand water testing instruments." },
    { name: "Lovibond Water Testing Equipment", description: "Authorized distributor of Lovibond water analysis systems." },
    { name: "Delagua Water Analysis Solutions", description: "Distributor of Delagua water quality testing solutions." },
    { name: "Hach Water Testing Systems", description: "Authorized HACH water testing equipment and instruments." },
    { name: "Palintest UK Products", description: "Official distributor of Palintest water analysis equipment." },
    { name: "Hanna Instruments Water Quality", description: "Distributor of Hanna Instruments water quality solutions." },
  ],
};


const WaterAnalysis = () => {
  usePageMeta({
    title: "Water Testing Equipment & Palintest | Water Quality Analysis Kenya",
    description: "Official distributor of Palintest water analysis equipment, HACH instruments, and comprehensive water testing solutions including photometers, reagents, meters, and microbiological kits.",
    keywords: "water testing, Palintest, HACH, water quality equipment, water analysis, photometer, COD analyzer, turbidity meter, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/water-analysis",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Water Analysis", url: "/products/water-analysis" },
    ],
  });

  return (
    <ProductPageLayout
      title="Water Analysis &amp; Testing Equipment"
      description="Comprehensive water testing and analysis solutions featuring Palintest photometers, HACH instruments, portable meters, and professional-grade equipment for drinking water, wastewater, and industrial applications."
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
          Professional Water Analysis &amp; Testing Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          As authorized distributors of Palintest UK and HACH instruments, we supply the most comprehensive range of water testing and analysis equipment in Kenya. Our solutions serve drinking water utilities, wastewater treatment facilities, industrial processes, and environmental monitoring applications.
        </p>
        
        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Why Choose Our Water Analysis Products:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>✓ Official distributor of Palintest UK equipment and reagents</li>
          <li>✓ HACH laboratory spectrophotometers and analyzers</li>
          <li>✓ 200+ test parameters available</li>
          <li>✓ Rapid results (1-10 minutes for most tests)</li>
          <li>✓ Compliant with international water quality standards</li>
          <li>✓ Full technical support and training available</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Application Areas:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>Drinking water quality assurance and compliance</li>
          <li>Wastewater and effluent testing</li>
          <li>Industrial process water monitoring</li>
          <li>Swimming pool and spa water management</li>
          <li>Environmental and surface water testing</li>
          <li>Food and beverage industry QC</li>
          <li>Pharmaceutical manufacturing</li>
          <li>Laboratory research and analysis</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Test Parameters Include:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>pH, Temperature, Conductivity, TDS</li>
          <li>Chlorine (Free, Total, Combined)</li>
          <li>Alkalinity, Hardness, Calcium, Magnesium</li>
          <li>Ammonia, Nitrate, Nitrite, Phosphate</li>
          <li>Iron, Manganese, Copper, Chromium</li>
          <li>Fluoride, Chloride, Cyanide</li>
          <li>COD, BOD, Turbidity</li>
          <li>Coliform bacteria and pathogens</li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default WaterAnalysis;
