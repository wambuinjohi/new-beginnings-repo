import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Partners } from "@/components/Partners";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { usePageMeta } from "@/hooks/use-page-meta";

const Index = () => {
  usePageMeta({
    title: "Moris Enterprises | Laboratory Chemicals, Equipment & Medical Supplies Kenya | Palintest Partner",
    description: "Premier supplier of laboratory chemicals, medical equipment, biotechnology supplies & diagnostic instruments in Kenya. Official Palintest distributor for water testing solutions, photometers, and test kits. Microbiology media, chromatography consumables, water testing equipment, quality control instruments. Get quotes via WhatsApp. Fast delivery.",
    keywords: "laboratory chemicals, medical equipment, biotechnology equipment, laboratory reagents, diagnostic tools, Kenya, supplier, laboratory instruments, quality chemicals, medical supplies, chromatography consumables, water testing equipment, microbiology media, quality control equipment, Palintest, water testing, photometers, water analysis, water quality, Nairobi",
    type: "website",
    canonical: "https://morisenterprises.com/",
    breadcrumbs: [
      { name: "Home", url: "https://morisenterprises.com/" },
    ],
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Partners />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
