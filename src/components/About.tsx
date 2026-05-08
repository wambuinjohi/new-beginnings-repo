import { Card } from "@/components/ui/card";
import { Target, Award, Users } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              About Moris Enterprises
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Moris One Enterprises is a company that was established in 2010 and its foundation is based on more than a decade long experience in this exciting field of scientific expertise, research, service, supply and distribution.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We supply a variety of consumables to manufacturing industries, Food Services, Beverage, Healthcare, Laboratory Reagents, Water-care, Mining, Cleaning as well as cosmetic chemicals. Our customer-centric philosophy puts each and every customer first and delivers what each client defines as value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="p-6 text-center bg-accent border-border">
                <Award className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-display font-bold text-2xl text-foreground mb-1">14+</h3>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </Card>
              <Card className="p-6 text-center bg-accent border-border">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-display font-bold text-2xl text-foreground mb-1">500+</h3>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </Card>
              <Card className="p-6 text-center bg-accent border-border">
                <Target className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-display font-bold text-2xl text-foreground mb-1">100%</h3>
                <p className="text-sm text-muted-foreground">Quality Assured</p>
              </Card>
            </div>
          </div>

          <div className="animate-slide-up">
            <Card className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-2xl font-display font-bold mb-6">Our Promise</h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center mt-1" aria-hidden="true">
                    <span className="text-xs">✓</span>
                  </div>
                  <p className="text-primary-foreground/90">
                    Quality Products and Services that are prompt and efficient
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <p className="text-primary-foreground/90">
                    Consistent emphasis on putting you the customer first
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <p className="text-primary-foreground/90">
                    Friendly and Courteous staff ready to assist
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center mt-1">
                    <span className="text-xs">✓</span>
                  </div>
                  <p className="text-primary-foreground/90">
                    Serving small, medium and large Enterprises with dynamic solutions
                  </p>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                <h4 className="text-xl font-display font-semibold mb-3">Our Mission</h4>
                <p className="text-primary-foreground/90 leading-relaxed">
                  To be recognized by our core markets as a reliable supplier of Laboratory Reagents which meet their specific requirements. To continue delivering a service level that meets and exceeds customers' requirements.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
