import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface Partner {
  name: string;
  description: string;
  logo?: string;
  url: string;
  featured?: boolean;
}

const partners: Partner[] = [
  {
    name: "Palintest",
    description: "Leading global provider of water testing solutions, photometers, and reagents for accurate water quality analysis across pools, spas, drinking water, and environmental applications.",
    url: "https://www.palintest.com/",
    featured: true,
  },
];

export const Partners = () => {
  useEffect(() => {
    const partnersSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Moris Enterprises",
          item: "https://morisenterprises.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Partners",
          item: "https://morisenterprises.com/#partners",
        },
      ],
    };

    const partnersOrgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Moris Enterprises",
      url: "https://morisenterprises.com",
      description: "Premier supplier of laboratory chemicals, equipment, and diagnostic instruments in Kenya. Official Palintest distributor.",
      partners: partners.map((partner) => ({
        "@type": "Organization",
        name: partner.name,
        url: partner.url,
        description: partner.description,
      })),
    };

    let partnersScript = document.querySelector("script[data-partners-schema]");
    if (partnersScript) {
      partnersScript.textContent = JSON.stringify(partnersOrgSchema);
    } else {
      partnersScript = document.createElement("script");
      partnersScript.type = "application/ld+json";
      partnersScript.setAttribute("data-partners-schema", "true");
      partnersScript.textContent = JSON.stringify(partnersOrgSchema);
      document.head.appendChild(partnersScript);
    }
  }, []);
  const featuredPartner = partners.find(p => p.featured);
  const otherPartners = partners.filter(p => !p.featured);

  return (
    <section id="partners" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Our Premium Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We partner with industry-leading brands to deliver exceptional products and services to our customers.
          </p>
        </div>

        {/* Featured Partner */}
        {featuredPartner && (
          <div className="mb-16 animate-fade-in">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-block mb-4">
                    <span className="bg-primary/10 text-primary font-display font-bold text-sm px-4 py-2 rounded-full">
                      ⭐ Top Partner
                    </span>
                  </div>
                  <h3 className="text-4xl font-display font-bold text-foreground mb-4">
                    {featuredPartner.name}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {featuredPartner.description}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary-dark text-primary-foreground"
                  >
                    <a
                      href={featuredPartner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Visit {featuredPartner.name}
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Other Partners */}
        {otherPartners.length > 0 && (
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
              Other Strategic Partners
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPartners.map((partner, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border"
                >
                  <h4 className="text-xl font-display font-semibold text-foreground mb-2">
                    {partner.name}
                  </h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {partner.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2"
                  >
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center"
                    >
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
