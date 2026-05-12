import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect } from "react";

interface Testimonial {
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    author: "Dr. Jane Mwangi",
    role: "Laboratory Director",
    company: "Nairobi Central Hospital",
    content: "Moris Enterprises has been our trusted partner for laboratory chemicals and equipment for over 5 years. Their quality is unmatched and their support team is always responsive.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    author: "Peter Kariuki",
    role: "Quality Manager",
    company: "Premier Diagnostics Ltd",
    content: "The water testing solutions from Moris Enterprises have significantly improved our quality control processes. HACH instruments are reliable and accurate.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    author: "Sarah Ochieng",
    role: "Research Lead",
    company: "KenBiotech Research Institute",
    content: "Outstanding product selection and knowledgeable staff. They helped us select the perfect laboratory chemicals for our research requirements.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    author: "David Kipchoge",
    role: "Operations Manager",
    company: "SafeWater Testing Services",
    content: "Reliable supplier with competitive pricing. We've saved costs while maintaining quality standards. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  }
];

export const Testimonials = () => {
  useEffect(() => {
    // Add testimonials schema markup
    const testimonialSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Customer Testimonials",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "200+",
        bestRating: "5",
        worstRating: "1"
      }
    };

    let script = document.querySelector<HTMLScriptElement>('script[data-testimonial-schema]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-testimonial-schema", "true");
      script.textContent = JSON.stringify(testimonialSchema);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Trusted by Leading Organizations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Companies across Kenya rely on Moris Enterprises for quality laboratory supplies and expert service.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9/5 · 200+ Happy Customers</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 flex flex-col h-full border-border hover:shadow-lg transition-shadow"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 flex-grow" itemProp="reviewBody">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-start gap-4 pt-6 border-t border-border">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="font-semibold text-foreground" itemProp="author">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} <br /> {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-primary/5 rounded-lg p-8 border border-primary/20">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">14+</p>
            <p className="text-muted-foreground">Years of Service</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">500+</p>
            <p className="text-muted-foreground">Products in Stock</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">ISO Certified</p>
            <p className="text-muted-foreground">Quality Assured</p>
          </div>
        </div>
      </div>
    </section>
  );
};
