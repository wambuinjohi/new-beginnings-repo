import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Microscope, Beaker, FlaskConical, Droplet, TestTube, Shield, Waves, Pipette, Settings, ArrowRight } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  link: string;
  icon: typeof Microscope;
  keywords: string[];
  faqs: Array<{ question: string; answer: string }>;
}

const services: Service[] = [
  {
    id: "hach-instruments",
    name: "HACH Water Testing Instruments",
    description: "Comprehensive water testing and analysis solutions from HACH, the world's leading supplier of water testing equipment. Our HACH instruments provide accurate, reliable results for laboratory water quality analysis.",
    shortDescription: "HACH photometers, test kits, and advanced water testing equipment for precise analysis and monitoring.",
    link: "/products/hach-instruments",
    icon: Droplet,
    keywords: ["HACH instruments", "water testing", "photometers", "water analysis"],
    faqs: [
      { question: "What HACH products do you supply?", answer: "We supply HACH photometers, test kits, and water quality testing equipment for laboratory and field use." },
      { question: "Are HACH instruments accurate?", answer: "Yes, HACH instruments meet international standards and are used by laboratories worldwide for reliable results." }
    ]
  },
  {
    id: "medical-equipment",
    name: "Medical Equipment & Instruments",
    description: "High-quality medical instruments and equipment for healthcare facilities, laboratories, and diagnostic centers. Our medical devices are tested for accuracy and durability.",
    shortDescription: "Professional medical instruments and diagnostic equipment for healthcare and laboratory applications.",
    link: "/products/medical-equipment",
    icon: HeartPulse,
    keywords: ["medical equipment", "diagnostic instruments", "medical devices", "healthcare equipment"],
    faqs: [
      { question: "What medical equipment do you stock?", answer: "We supply a wide range of medical instruments including diagnostic devices, testing equipment, and healthcare consumables." },
      { question: "Are your medical products certified?", answer: "Yes, all our medical equipment meets international standards and regulatory requirements." }
    ]
  },
  {
    id: "microbiology-biotechnology",
    name: "Microbiology & Biotechnology Supplies",
    description: "Complete microbiology media, biotechnology consumables, and specialized equipment for research, diagnostics, and quality control applications.",
    shortDescription: "Microbiology media, culture supplies, and biotechnology reagents for research and clinical applications.",
    link: "/products/microbiology-biotechnology",
    icon: Microscope,
    keywords: ["microbiology media", "biotechnology supplies", "culture media", "laboratory reagents"],
    faqs: [
      { question: "What microbiology media do you supply?", answer: "We supply various culture media types, growth factors, and specialized microbiology consumables for different applications." },
      { question: "How should biotechnology products be stored?", answer: "All biotechnology products should be stored according to manufacturer specifications, typically at 2-8°C or room temperature depending on the product." }
    ]
  },
  {
    id: "laboratory-chemicals",
    name: "Laboratory Chemicals & Reagents",
    description: "High-purity laboratory chemicals, analytical reagents, and specialized chemical solutions for research, testing, and quality control.",
    shortDescription: "ACS-grade laboratory chemicals and analytical reagents for research and analytical applications.",
    link: "/products/laboratory-chemicals",
    icon: FlaskConical,
    keywords: ["laboratory chemicals", "analytical reagents", "ACS chemicals", "laboratory solutions"],
    faqs: [
      { question: "What purity grades do you offer?", answer: "We supply ACS Grade, Reagent Grade, and Technical Grade chemicals suitable for various laboratory applications." },
      { question: "Do you provide Certificates of Analysis?", answer: "Yes, all chemicals come with Certificates of Analysis documenting purity and specifications." }
    ]
  },
  {
    id: "water-analysis",
    name: "Water Analysis & Treatment Solutions",
    description: "Complete water testing, analysis, and treatment equipment for ensuring water quality compliance and safety in laboratories and industrial applications.",
    shortDescription: "Water testing equipment, analysis kits, and treatment solutions for laboratory and industrial use.",
    link: "/products/water-analysis",
    icon: Droplet,
    keywords: ["water analysis", "water testing", "water treatment", "water quality"],
    faqs: [
      { question: "Why is water testing important?", answer: "Regular water testing ensures laboratory water quality meets standards, which is critical for accurate results and equipment protection." },
      { question: "What parameters can be tested?", answer: "We can test for pH, conductivity, turbidity, bacteria, heavy metals, chlorine, and many other parameters." }
    ]
  },
  {
    id: "glassware",
    name: "Laboratory Glassware",
    description: "High-quality laboratory glassware including beakers, flasks, pipettes, and specialized glassware for analytical and research applications.",
    shortDescription: "Borosilicate laboratory glassware for accurate measurement and mixing in laboratory applications.",
    link: "/products/glassware",
    icon: Beaker,
    keywords: ["laboratory glassware", "beakers", "flasks", "pipettes", "borosilicate"],
    faqs: [
      { question: "What's the difference between borosilicate and soda glass?", answer: "Borosilicate glass is more durable, heat-resistant, and suitable for laboratory use, while soda glass is less expensive but less durable." },
      { question: "How should laboratory glassware be cleaned?", answer: "Use appropriate detergent, avoid extreme temperature changes, and ensure proper drying to maintain glassware integrity." }
    ]
  },
  {
    id: "chromatography",
    name: "Chromatography Consumables",
    description: "High-performance chromatography consumables, columns, and accessories for analytical separations and purification.",
    shortDescription: "HPLC, GC, and chromatography columns and accessories for advanced analytical work.",
    link: "/products/chromatography-consumables",
    icon: TestTube,
    keywords: ["chromatography", "HPLC", "GC columns", "analytical columns"],
    faqs: [
      { question: "What types of chromatography do you support?", answer: "We supply consumables for HPLC, GC, and other chromatography techniques with various column types." },
      { question: "How do you choose the right column?", answer: "Column selection depends on your analytes, separation requirements, and detection method. We can help you choose." }
    ]
  },
  {
    id: "quality-control",
    name: "Quality Control Equipment & Testing",
    description: "Comprehensive quality control equipment, testing instruments, and solutions for manufacturing, research, and product verification.",
    shortDescription: "Quality control instruments and equipment for process monitoring and product verification.",
    link: "/products/equipment-quality-control",
    icon: Settings,
    keywords: ["quality control", "QC equipment", "testing instruments", "inspection equipment"],
    faqs: [
      { question: "What QC parameters can be tested?", answer: "We support testing for density, viscosity, hardness, moisture, pH, and many other quality parameters." },
      { question: "Are your instruments calibrated?", answer: "Yes, all instruments are calibrated and can be regularly serviced to maintain accuracy." }
    ]
  },
  {
    id: "safety-products",
    name: "Laboratory Safety Products",
    description: "Complete laboratory safety equipment including PPE, spill kits, emergency equipment, and safety accessories.",
    shortDescription: "Laboratory safety equipment, PPE, and emergency response products for safe working environments.",
    link: "/products/safety-products",
    icon: Shield,
    keywords: ["laboratory safety", "PPE", "safety equipment", "lab safety", "protective equipment"],
    faqs: [
      { question: "What safety items are essential for a lab?", answer: "Essential items include safety glasses, gloves, lab coats, spill kits, and first aid supplies." },
      { question: "How often should safety equipment be replaced?", answer: "Replace items based on usage and damage. Some items like gloves are single-use, while others last longer." }
    ]
  },
  {
    id: "filtration",
    name: "Filtration & Purification Systems",
    description: "Advanced filtration and purification systems for laboratory water, air, and specialized separation applications.",
    shortDescription: "Water filtration, air purification, and specialized filtration systems for laboratory use.",
    link: "/products/filtration",
    icon: Waves,
    keywords: ["filtration", "water filtration", "air purification", "membrane filtration"],
    faqs: [
      { question: "What filtration methods are available?", answer: "We offer membrane filtration, sand filtration, activated carbon, and other specialized filtration methods." },
      { question: "How often should filters be replaced?", answer: "Filter replacement depends on flow rate and water quality. Regular monitoring ensures optimal performance." }
    ]
  }
];

const Services = () => {
  usePageMeta({
    title: "Laboratory & Medical Equipment Services | Moris Enterprises Kenya",
    description: "Comprehensive laboratory chemicals, medical equipment, water testing solutions, and biotechnology supplies. HACH, Palintest, and quality control equipment from Kenya's trusted supplier.",
    keywords: "laboratory services, medical equipment, water testing, laboratory chemicals, HACH instruments, Palintest, quality control, biotechnology",
    canonical: "https://morisenterprises.com/services",
    type: "website",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" }
    ]
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Breadcrumbs */}
      <section className="pt-32 pb-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Services" }
            ]}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Laboratory & Medical Solutions
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete range of laboratory chemicals, medical equipment, water testing solutions, and biotechnology supplies. Find everything you need for your laboratory operations in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {service.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {service.shortDescription}
                  </p>
                  
                  <Link to={service.link} className="mt-auto">
                    <Button variant="outline" className="w-full group">
                      Learn More <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Service Descriptions */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-foreground text-center mb-16">
            Our Service Areas
          </h2>
          
          <div className="space-y-16">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-lg p-8 border border-border">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-primary/10">
                        <IconComponent className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                        {service.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.keywords.map((keyword, idx) => (
                          <span key={idx} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Quick Questions</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {service.faqs.slice(0, 2).map((faq, idx) => (
                          <li key={idx}>• {faq.question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Link to={service.link} className="mt-6 inline-block">
                    <Button className="group">
                      View Products <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Can't Find What You Need?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-primary-foreground/90">
            Contact our expert team for customized solutions, bulk orders, or specialized equipment requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/254733137332?text=I%20need%20help%20finding%20laboratory%20equipment">
              <Button variant="secondary" size="lg">
                Chat on WhatsApp
              </Button>
            </a>
            <Link to="/#contact">
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
