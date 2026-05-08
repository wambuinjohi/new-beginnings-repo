import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Microscope,
  Beaker,
  TestTube,
  Scale,
  Droplet,
  FlaskConical,
  Shield,
  Boxes,
  Waves,
  Filter,
  HeartPulse,
  GlassWater
} from "lucide-react";

const services = [
  {
    icon: TestTube,
    title: "Microbiology and Biotechnology",
    description: "Prepared Media, Ready Prepared Plates, dehydrated culture media, biological media bases, media supplements, sterile dehydrated culture media.",
    route: "/products/microbiology-biotechnology"
  },
  {
    icon: Beaker,
    title: "Laboratory and Industrial Chemicals",
    description: "Biochemicals, fine chemicals, enzyme substrates, antibiotics, buffers, stains-indicators, Bio Chemicals, Ion pair reagents, speciality chemicals.",
    route: "/products/laboratory-chemicals"
  },
  {
    icon: Microscope,
    title: "Laboratory Equipment",
    description: "Atomic absorption spectrophotometer, flame photometer, UV-Vis spectrophotometer, photo colorimeter, melting point apparatus.",
    route: "/products/lab-equipment"
  },
  {
    icon: Scale,
    title: "Electrical Balances & Scales",
    description: "High-performance with up to 0.01mg readability and capacities up to 220g. AutoCal™ Internal Calibration system ensures accuracy.",
    route: "/products/laboratory-testing"
  },
  {
    icon: Droplet,
    title: "Water Testing Equipment",
    description: "Water testing kits, reagents, water waste and boiler reagents. Master Distributor of Milwaukee, Lovibond, Delagua, Hach, Palintest, Hanna Equipment.",
    route: "/products/water-analysis"
  },
  {
    icon: FlaskConical,
    title: "Material Testing",
    description: "Beverage, Packaging and quality testing equipment for comprehensive material analysis and quality control.",
    route: "/products/laboratory-testing"
  },
  {
    icon: Shield,
    title: "Personal Protection Equipment",
    description: "Complete PPE solutions under one roof. ISO certified products manufactured using innovative designs with latest technology.",
    route: "/products/safety-products"
  },
  {
    icon: Boxes,
    title: "Glassware",
    description: "Borosilicate glass with low coefficient of expansion, for heat resistance, and high resistance to chemical attack.",
    route: "/products/glassware"
  },
  {
    icon: GlassWater,
    title: "Water Science",
    description: "Water Filter Cartridges, Filtration Systems, Deionized Water & Systems, Laboratory Water Filters, UV Sterilizers, Water Quality Meters.",
    route: "/products/waste-water-filtration"
  },
  {
    icon: Waves,
    title: "Waste Water & Pool Filtration",
    description: "Water testing equipment and reagents offering analysis solutions for all types of water systems and industries.",
    route: "/products/waste-water-filtration"
  },
  {
    icon: FlaskConical,
    title: "Quality Control Equipment",
    description: "Clean benches, balances, moisture analyzers, spectrophotometers and stability chambers for QA/QC studies.",
    route: "/products/laboratory-testing"
  },
  {
    icon: Filter,
    title: "Filtration Equipment",
    description: "Glass microfiber lab filters with fine capillary structure for absorbing significantly larger quantities of water.",
    route: "/products/waste-water-filtration"
  },
  {
    icon: HeartPulse,
    title: "Medical Equipment",
    description: "Pipette Tips, Hematology Analyzer, Nucleic Acid Extractor, Microwave Digestion System, BOD Refrigerated Incubator.",
    route: "/products/medical-equipment"
  }
];

export const Services = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Our Premium Products &amp; Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We help you with all the solutions you may require for the industry with prompt service at any point in time. Customer centricity is our motto.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <li key={index} role="listitem">
                <Card
                  onClick={() => navigate(service.route)}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border cursor-pointer h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
