import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";

const productCategories = {
  "THERMOMETERS": [
    { name: "Digital Infrared Thermometer Non-Contact (-50~400°C)", description: "Non-contact infrared thermometer for measuring temperature from a distance without surface contact." },
    { name: "High Precision Digital Thermometer With K-Type Thermocouple Single Sensors Data-Hold LCD Display", description: "Professional thermometer with thermocouple input and data-hold function for precise temperature measurement." },
    { name: "Industry Digital Non-Contact Infrared Thermometer", description: "Industrial-grade infrared thermometer for process monitoring and equipment diagnostics." },
    { name: "Digital Thermometer Hygrometer Electronic LCD Temperature Humidity Meter", description: "Combination device measuring both temperature and humidity with digital LCD display." },
    { name: "YH-B300B Deep Fry Thermometer Candy Sugar Frying Thermometer (300mm Probe Length)", description: "Specialized cooking thermometer with extended probe for deep frying and candy making." },
    { name: "LCD Display Long Probe Food Thermometer", description: "Food-safe thermometer with long probe for accurate temperature measurement in cooking." },
    { name: "Waterproof Thermometer Wall Temperature Measurement (Max Min Value Display)", description: "Waterproof wall-mounted thermometer displaying minimum and maximum temperature values." },
    { name: "Digital Thermometer/Hygrometer Humidity Meter", description: "Comprehensive meter measuring temperature and humidity levels simultaneously." },
    { name: "Digital Thermometer for Freezer", description: "Specialized low-temperature thermometer for freezer and cold storage monitoring." },
    { name: "Digital Min-Max Indoor and Outdoor Thermometer (-50~70°C)", description: "Dual-display thermometer recording minimum and maximum temperatures for indoor/outdoor use." },
    { name: "Digital Thermometer Probe Fridge Freezer Thermometer", description: "Fridge and freezer-safe thermometer with probe for food storage temperature verification." },
    { name: "HTC-2 Electronic Temperature Humidity Meter Digital ThermoHygrometer", description: "Portable electronic device measuring temperature and humidity with high accuracy." },
    { name: "Glass Thermometer with Hook (-20-110°C)", description: "Traditional glass thermometer with hook for hanging in laboratory or field applications." },
    { name: "Stick On Thermometer (0-30°C)", description: "Adhesive-backed thermometer strip for direct application to surfaces." },
    { name: "Electronic Veterinary Thermometer", description: "Specialized rapid thermometer designed for veterinary medicine and animal health monitoring." },
    { name: "Indoor/Outdoor Dual Digital Display Thermometer", description: "Wireless dual thermometer displaying both indoor and outdoor temperature simultaneously." },
    { name: "Electronic Digital Temperature Humidity Meter Thermometer Hygrometer", description: "Electronic instrument providing accurate temperature and humidity measurements with digital readout." },
  ],
  "ORP & WATER QUALITY ANALYZERS": [
    { name: "ORP-169F Waterproof ORP Meter High Quality ORP Meter Water Quality Tester", description: "Waterproof oxidation-reduction potential meter for comprehensive water quality assessment." },
    { name: "ORP-169E Digital Pen Type ORP Meter Water Control Tester Waterproof Display Temperature", description: "Portable pen-type ORP meter with temperature compensation for field water testing." },
    { name: "Portable pH/mV/Temperature Meter", description: "Multi-parameter portable meter measuring pH, millivolt potential, and temperature." },
    { name: "Portable Digital Water Meter TDS Tester (0-1999mg/L / ppm)", description: "Handheld TDS meter for quick dissolved solids measurement in water quality testing." },
    { name: "Waterproof TDS and Temperature Meter", description: "Durable waterproof instrument measuring total dissolved solids and temperature." },
    { name: "Temperature Meter with Backlight", description: "Illuminated temperature meter for easy reading in low-light laboratory environments." },
    { name: "Universal pH Paper Strips (pH 0-14)", description: "Wide-range pH indicator strips for quick pH determination across full spectrum." },
  ],
  "MULTI-PARAMETER WATER TESTERS": [
    { name: "3 in 1 Water Tester Multi-parameter pH Monitor (TDS/PH/Temp)", description: "Compact multi-parameter tester simultaneously measuring pH, TDS, and temperature." },
    { name: "3 in 1 Multi-parameter PH Monitor", description: "Three-parameter water quality monitor with LCD display for quick analysis." },
    { name: "2 In 1 Water Quality Meter (CL/Temp) with LCD Backlight Display", description: "Dual-parameter meter measuring chlorine and temperature with backlit display." },
    { name: "4 In 1 Water Meter (CL/ORP/H2/TEMP) Residual Chlorine Meter", description: "Four-parameter meter for comprehensive water quality testing including chlorine analysis." },
    { name: "4 In 1 Portable Meter", description: "Compact portable four-parameter water quality analyzer for field testing." },
    { name: "5 in 1 Water Quality Meter (PH/CL/ORP/H2/TEMP) Chlorine Tester", description: "Advanced five-parameter meter for comprehensive water analysis including chlorine determination." },
    { name: "5 in 1 Water Quality Meter", description: "Multi-parameter water tester with five simultaneous measurements for complete analysis." },
    { name: "5 in 1 Meter (SALT/EC/TDS/S.G./TEMP) With LCD Display", description: "Five-parameter meter measuring salinity, conductivity, TDS, specific gravity, and temperature." },
    { name: "2 in 1 PH & Residual Chlorine Test Chlorine Detector Water", description: "Dual-function meter for pH and chlorine testing in drinking water and swimming pools." },
  ],
  "SOIL & ENVIRONMENTAL METERS": [
    { name: "Soil 4in1 Soil Meter", description: "Four-parameter soil analyzer for agricultural and environmental testing." },
    { name: "Soil 4in1 Plant Earth Soil PH Moisture Light Soil Meter Thermometer", description: "Comprehensive soil meter measuring pH, moisture, light, and temperature for plant health." },
    { name: "TDS Meter Aquarium Pool Water Tester Wine Urine LCD Pen Monitor", description: "Versatile TDS pen meter for testing water quality across multiple applications." },
  ],
  "PORTABLE SMART METERS": [
    { name: "Portable pH Meter 7 in 1 Smart (pH/TDS/EC/ORP/Salinity/S.G/Temperature)", description: "Advanced portable smart meter with seven measurement parameters for comprehensive water analysis." },
    { name: "Portable pH Meter 7 in 1 Smart (pH/TDS/EC/)", description: "Smart portable meter with pH, TDS, and EC parameters for quick water testing." },
    { name: "Salinity Meter", description: "Specialized meter for measuring water salinity in marine and brackish environments." },
  ],
  "REFRACTOMETERS": [
    { name: "DR-101 Brix Refractometer (0.0-50.0% Brix / Refractive Index 1.3330-1.4200nD)", description: "Precision Brix refractometer for sugar content measurement in beverages and foods." },
    { name: "DR-701 Coffee Sugar Meter (0-50% Brix / TDS 0-25%) Digital Refractometer", description: "Specialized digital refractometer for coffee and other beverage quality analysis." },
    { name: "DBS-50 Brix Refractometer (0-50% Brix / 0-28% Salinity)", description: "Dual-range refractometer for Brix and salinity measurements in food and water." },
    { name: "DR-402 Beer Refractometer (0-50% Brix / 1.000-1.130 SG)", description: "Specialized refractometer for brewing industry measuring sugar and specific gravity." },
    { name: "DR-301 Honey Brix Refractometer (0-90% Brix)", description: "Extended-range refractometer specifically calibrated for honey analysis." },
    { name: "DR-202 Sea Water Salinity Refractometer (0-100‰ Salinity / 0-57‰ Chlorinity / 1.000-1.070 Specific Gravity)", description: "Marine refractometer for seawater salinity and chlorinity determination." },
    { name: "DR-102 High Range Refractometer (0.0-90.0% Brix / Refractive Index 1.3330-1.5177nD)", description: "Extended-range refractometer for high concentration solutions and specialized applications." },
  ],
};


const EquipmentQualityControl = () => {
  usePageMeta({
    title: "Equipment & Quality Control Instruments | Thermometers, pH Meters, Refractometers Kenya",
    description: "Professional quality control equipment including digital thermometers, water quality meters, pH meters, ORP meters, TDS meters, and refractometers for laboratory and industrial testing.",
    keywords: "thermometer, pH meter, ORP meter, TDS meter, water quality equipment, quality control instruments, refractometer, Kenya",
    type: "article",
    canonical: "https://morisenterprises.com/products/equipment-quality-control",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Equipment & Quality Control", url: "/products/equipment-quality-control" },
    ],
  });

  return (
    <ProductPageLayout
      title="Equipment &amp; Quality Control Instruments"
      description="Complete range of precision instruments for quality control and laboratory testing including thermometers, pH meters, water quality analyzers, and refractometers."
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
          Professional Quality Control &amp; Testing Equipment
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Moris Enterprises supplies precision instruments and equipment for quality control, laboratory testing, and environmental monitoring. Our range includes digital thermometers, water quality meters, pH analyzers, and specialized testing equipment for diverse applications.
        </p>
        
        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Our Product Range Includes:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li><strong>Digital Thermometers:</strong> Contact and non-contact temperature measurement devices for various applications</li>
          <li><strong>Water Quality Meters:</strong> Multi-parameter analyzers for pH, TDS, EC, ORP, salinity, and temperature</li>
          <li><strong>Portable Meters:</strong> Handheld pen-type meters for field testing and on-site analysis</li>
          <li><strong>Refractometers:</strong> Precision instruments for sugar, salt, and specific gravity measurement</li>
          <li><strong>Electrodes:</strong> Replacement pH, conductivity, and ORP electrodes for meter systems</li>
          <li><strong>Laboratory Meters:</strong> Benchtop instruments for precise laboratory analysis</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Equipment Features:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>✓ Digital LCD displays with backlight</li>
          <li>✓ Waterproof and corrosion-resistant construction</li>
          <li>✓ Wide measurement ranges for diverse applications</li>
          <li>✓ Auto-calibration and temperature compensation</li>
          <li>✓ Fast response time and high accuracy</li>
          <li>✓ Portable and easy-to-use designs</li>
          <li>✓ Data-hold function for readings</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-6 mb-3">
          Applications:
        </h3>
        <ul className="text-muted-foreground space-y-2">
          <li>Water treatment and purification monitoring</li>
          <li>Food and beverage quality control</li>
          <li>Pharmaceutical and chemical manufacturing</li>
          <li>Environmental testing and monitoring</li>
          <li>Laboratory research and analysis</li>
          <li>Industrial process control</li>
          <li>Agriculture and soil analysis</li>
          <li>Aquaculture and pond management</li>
        </ul>
      </div>
    </ProductPageLayout>
  );
};

export default EquipmentQualityControl;
