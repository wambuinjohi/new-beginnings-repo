import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ProductPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  faqs?: Array<{ question: string; answer: string }>;
}

export const ProductPageLayout = ({ title, description, children, faqs }: ProductPageLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

      let faqScript = document.querySelector('script[data-faq]');
      if (faqScript) {
        faqScript.textContent = JSON.stringify(faqSchema);
      } else {
        faqScript = document.createElement("script");
        faqScript.type = "application/ld+json";
        faqScript.setAttribute("data-faq", "true");
        faqScript.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(faqScript);
      }
    }
  }, [faqs]);

  const scrollToContact = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
              {title}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 flex-grow bg-background">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Interested in Our Products?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to get a quote or learn more about our products and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              Request a Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="border-2"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
