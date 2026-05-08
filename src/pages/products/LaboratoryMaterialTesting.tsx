import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const productCategories = {
  "Sterilization & Safety": [
    { name: "Table Top Portable Type Lab Steam Autoclave Sterilizer", description: "Compact portable autoclave sterilizer ideal for laboratory and small clinical applications." },
    { name: "18L or 24L Medical Lab Autoclave Type Sterilization Machine", description: "Medium-capacity sterilization autoclave for medical and laboratory equipment." },
    { name: "Laminar Flow Cabinet", description: "Cleanroom-grade laminar flow cabinet for sterile sample preparation and handling." },
    { name: "Fume Hood", description: "Chemical fume hood for safe handling of volatile and hazardous substances." },
    { name: "Ultrasonic Cleaner", description: "Ultrasonic cleaning device for removing contamination from laboratory equipment." },
  ],
  "Diagnostic Instruments": [
    { name: "Binocular LCD Display Digital Video Microscope", description: "Advanced digital microscope with binocular eyepieces and LCD display capability." },
    { name: "Blood Analyzer Auto Hematology Analyzer", description: "Automated hematology analyzer for complete blood cell counting and analysis." },
    { name: "Chemistry Analyzer Chemistry Machine", description: "Automated chemistry analyzer for serum and plasma analysis." },
  ],
  "Heating & Temperature Control": [
    { name: "Ceramic Fiber Muffle Furnace", description: "Laboratory muffle furnace with ceramic fiber insulation for high-temperature applications." },
    { name: "Magnetic Stirrer", description: "Basic magnetic stirrer for mixing and heating laboratory solutions." },
    { name: "LCD Digital Magnetic Stirrer", description: "Advanced magnetic stirrer with LCD temperature display and control." },
    { name: "Heating Mantle", description: "Controlled heating mantle for safe laboratory glassware heating." },
    { name: "Hot Plate", description: "Electric hot plate for heating and cooking laboratory samples." },
    { name: "DHP4-550 LCD Glass Ceramic Hotplate with Timer", description: "Digital glass-ceramic hotplate with built-in timer for precise heating control." },
    { name: "Water Baths", description: "Laboratory water bath for temperature-controlled sample incubation." },
    { name: "DUC-10 High Precision Chiller", description: "Precision temperature chiller for low-temperature laboratory work." },
    { name: "DCP-20 Low-Temperature Cooling Circulator Series", description: "Advanced cooling circulator system for precise temperature control." },
  ],
  "Mixing & Stirring Equipment": [
    { name: "Laboratory Shaker", description: "Orbital shaker for mixing and homogenizing laboratory samples." },
    { name: "SK-O180-C Remote-Controlled Smart Destaining Shaker", description: "Remote-controlled shaker system for automated sample destaining and processing." },
    { name: "Vortex Mixer", description: "Compact vortex mixer for rapid sample mixing and agitation." },
    { name: "MX-S+ Digital Vortex Mixer", description: "Digital vortex mixer with programmable mixing parameters." },
    { name: "MX-Pro Infrared Digital Vortex Mixer", description: "Advanced vortex mixer with infrared controls and digital features." },
    { name: "OS-T400-Plus Overhead Stirrer", description: "High-speed overhead stirrer for large-volume sample processing." },
    { name: "OS-T40-Plus/OS-T60-Plus Overhead Stirrer", description: "Versatile overhead stirrer series for various stirring applications." },
    { name: "DMS4 LCD Glass Ceramic Magnetic Stirrer with Timer", description: "Magnetic stirrer with glass ceramic surface and integrated timer." },
    { name: "DMS5 LCD Magnetic Stirrer with Timer", description: "Advanced magnetic stirrer with LCD display and timing function." },
    { name: "Mixer", description: "General-purpose laboratory mixer for sample preparation." },
  ],
  "Sample Preparation & Processing": [
    { name: "Ball Mill", description: "Laboratory ball mill for grinding and homogenizing solid samples." },
    { name: "Grinder", description: "Electric grinder for sample preparation and material reduction." },
    { name: "Gel Loading Tips", description: "Specialized tips for precise gel loading in electrophoresis." },
    { name: "Homogenizer", description: "Mechanical homogenizer for tissue and sample disruption." },
    { name: "Water Distiller", description: "Laboratory water distillation system for pure water production." },
  ],
  "Centrifugation Equipment": [
    { name: "High-speed Micro Centrifuge", description: "Compact high-speed centrifuge for microtubes and small samples." },
    { name: "DG1616R High Speed Refrigerated Centrifuge", description: "High-speed refrigerated centrifuge for temperature-sensitive samples." },
    { name: "DM0306 Low Speed Centrifuge", description: "Low-speed centrifuge for gentle sample separation." },
  ],
  "Pipetting & Liquid Handling": [
    { name: "Mini TopPette Pipette", description: "Compact pipette for small volume accurate liquid transfers." },
    { name: "HiPette-LTS Light Feel Manual Adjustable Color Pipette", description: "Ergonomic manual pipette with adjustable volume settings." },
    { name: "HiPette Fully Autoclavable Manual 8-Channel Adjustable Colorful Pipette", description: "Sterilizable multi-channel pipette for high-throughput applications." },
    { name: "Automated Pipette System", description: "Robotic pipetting system for automated sample handling." },
  ],
  "Titration & Analysis Equipment": [
    { name: "dTrite-Pro Electronic Titration", description: "Automated titration system for chemical analysis." },
    { name: "Vacuum Pump and Filtration", description: "Combined vacuum pump and filtration system for sample preparation." },
  ],
  "Filtration & Purification": [
    { name: "Vacuum Pump (Oil-Free)", description: "Oil-free vacuum pump for clean laboratory applications." },
    { name: "Stainless Steel Manifold Set (3 Branch)", description: "Three-position manifold for simultaneous filtration of multiple samples." },
    { name: "Stainless Steel Manifold Set (6 Branch)", description: "Six-position manifold enabling efficient batch sample processing." },
    { name: "Water Distiller", description: "System for producing distilled water for laboratory use." },
  ],
  "Analytical Lab Equipment": [
    { name: "Spectrophotometer", description: "Precision spectrophotometer for optical measurement and analysis." },
    { name: "Electrochemistry Equipment", description: "Equipment for potentiometric and electrochemical analysis." },
  ],
  "Physics Lab Equipment": [
    { name: "Physics Lab Equipment", description: "Instruments for physics experiments and demonstrations." },
    { name: "Mechanical Engineering Equipment", description: "Equipment for mechanical testing and measurement." },
  ],
  "Chemistry Lab Equipment": [
    { name: "Chemistry Lab Equipment", description: "Comprehensive chemistry laboratory instrumentation." },
    { name: "Lab Glassware", description: "Standard laboratory glassware including beakers, flasks, and apparatus." },
  ],
  "Biology Lab Equipment": [
    { name: "Biology Lab Equipment", description: "Specialized equipment for biological research and testing." },
    { name: "Microscope", description: "Laboratory microscope for specimen observation and analysis." },
    { name: "Hospital And Medical Lab Equipment", description: "Clinical and hospital laboratory equipment." },
  ],
  "Educational Equipment": [
    { name: "Laboratory Appliances", description: "Laboratory appliances for educational and research institutions." },
    { name: "Maths Lab Equipment", description: "Equipment for mathematics and geometry demonstrations." },
    { name: "Educational Laboratory Equipment", description: "Complete laboratory kits for educational institutions." },
    { name: "TVET Lab Equipment", description: "Vocational training laboratory equipment for TVET institutions." },
  ],
  "Product Display Categories": [
    { name: "Liquid Handling", description: "Equipment and consumables for accurate liquid transfer and pipetting." },
    { name: "Thermal Control", description: "Temperature control equipment for laboratory applications." },
    { name: "Stirring & Heating", description: "Combined stirring and heating systems for sample preparation." },
    { name: "Distilling", description: "Distillation equipment for solvent purification and separation." },
    { name: "Centrifuges", description: "Various centrifugation systems for sample separation." },
    { name: "Shaker & Mixing", description: "Shakers and mixers for sample homogenization." },
    { name: "PCR", description: "PCR equipment for DNA amplification and molecular work." },
    { name: "Electrophoresis", description: "Electrophoresis systems for protein and DNA separation." },
    { name: "Spectrophotometer", description: "Spectrophotometric instruments for optical analysis." },
  ],
};


const LaboratoryMaterialTesting = () => {
  usePageMeta({
    title: "Laboratory Material Testing Equipment | Analysis Instruments Kenya",
    description: "Comprehensive laboratory and material testing equipment including autoclaves, microscopes, analyzers, centrifuges, and specialized instruments for research, clinical, and industrial applications.",
    keywords: "laboratory equipment, testing instruments, material testing, autoclave, microscope, centrifuge, analyzer, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/laboratory-material-testing",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Laboratory Material Testing", url: "/products/laboratory-material-testing" },
    ],
  });

  return (
    <ProductPageLayout
      title="Laboratory &amp; Material Testing Equipment"
      description="Complete range of laboratory and material testing instruments for research, clinical diagnostics, quality control, and educational applications including autoclaves, microscopes, analyzers, and specialized testing equipment."
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
          Comprehensive Laboratory &amp; Material Testing Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Moris Enterprises supplies a comprehensive range of laboratory and material testing equipment for research institutions, clinical laboratories, educational facilities, and industrial quality control. From basic laboratory appliances to advanced analytical instruments, we provide solutions for every testing need.
        </p>
        
        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Our Equipment Categories:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li><strong>Sterilization:</strong> Autoclaves and sterilization systems for laboratory and medical use</li>
          <li><strong>Analysis & Diagnostics:</strong> Hematology analyzers, chemistry analyzers, and diagnostic instruments</li>
          <li><strong>Separation & Preparation:</strong> Centrifuges, homogenizers, and sample preparation equipment</li>
          <li><strong>Temperature Control:</strong> Water baths, heating mantles, hot plates, and cooling systems</li>
          <li><strong>Mixing & Stirring:</strong> Magnetic stirrers, vortex mixers, overhead stirrers, and shakers</li>
          <li><strong>Liquid Handling:</strong> Pipettes and automated pipetting systems</li>
          <li><strong>Microscopy:</strong> Digital microscopes and inspection equipment</li>
          <li><strong>Specialized Testing:</strong> Vacuum filtration, distillation, and other specialized systems</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Key Features of Our Equipment:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>✓ Precision engineering for accurate results</li>
          <li>✓ Digital controls and LCD displays</li>
          <li>✓ Temperature and speed control capabilities</li>
          <li>✓ Durable construction for long-term use</li>
          <li>✓ Easy-to-use interfaces</li>
          <li>✓ Safety features and compliance standards</li>
          <li>✓ Technical support and after-sales service</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Applications:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>Clinical laboratory diagnostics and testing</li>
          <li>Medical device sterilization and validation</li>
          <li>Pharmaceutical research and development</li>
          <li>Quality control in manufacturing</li>
          <li>Food and beverage testing</li>
          <li>Environmental analysis and monitoring</li>
          <li>Educational institutions and training</li>
          <li>Research and development laboratories</li>
          <li>TVET (Technical and Vocational) training centers</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Product Display Categories:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>Liquid Handling Systems</li>
          <li>Thermal Control Equipment</li>
          <li>Stirring & Heating Solutions</li>
          <li>Distillation Systems</li>
          <li>Centrifugation Equipment</li>
          <li>Shaker & Mixing Systems</li>
          <li>PCR & Molecular Biology</li>
          <li>Electrophoresis Systems</li>
          <li>Spectrophotometer Instruments</li>
          <li>Electrochemistry Equipment</li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default LaboratoryMaterialTesting;
