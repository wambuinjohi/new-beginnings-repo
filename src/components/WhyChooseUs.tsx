import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, Users, Truck, Zap } from "lucide-react";

interface Reason {
  icon: typeof CheckCircle;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: Clock,
    title: "24-Hour Response",
    description: "Get expert consultation within 24 hours. Our team is available Mon-Sat, 8AM to 10PM."
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "ISO certified products and strict quality control. All chemicals come with Certificate of Analysis."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable delivery across Kenya with competitive shipping rates. Stock available for most items."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Knowledgeable staff to help you select the right products for your laboratory needs."
  },
  {
    icon: Zap,
    title: "Competitive Pricing",
    description: "Best prices without compromising quality. Volume discounts available for bulk orders."
  },
  {
    icon: CheckCircle,
    title: "14+ Years Trust",
    description: "Serving Kenya's laboratories and healthcare facilities since 2010. Trusted partner for 500+ clients."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Why Choose Moris Enterprises?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by Kenya's leading laboratories and healthcare facilities for quality products and expert service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-border">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
