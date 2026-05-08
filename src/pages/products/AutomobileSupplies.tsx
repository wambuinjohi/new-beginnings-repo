import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { automobileProducts } from "@/data/automobileProducts";

const AutomobileSupplies = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  usePageMeta({
    title: "KOMU Coils Springs & Suspension Components | Professional Auto Parts Kenya",
    description: "Premium KOMU Coils Springs and suspension components for automotive service centers. Professional-grade coil springs, shock absorbers, and suspension parts in Kenya. Get competitive quotations for high-quality auto suspension components.",
    keywords: "KOMU Coils Springs, KOMU Coils, KOMU, suspension coils, suspension springs, coils, car coils, coil springs, KOMU suspension components, coil springs Kenya, auto parts Kenya, shock absorbers, vehicle suspension, automobile supplies",
    type: "article",
    canonical: "https://morisenterprises.com/products/automobile-supplies",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "KOMU Coils Springs", url: "/products/automobile-supplies" },
    ],
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Check initial state
      handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Product Card Component
  const ProductCard = ({ product }: { product: typeof automobileProducts[0] }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col flex-shrink-0 w-full sm:w-auto">
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          {product.shortDescription}
        </p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => navigate(`/products/automobile-supplies/${product.id}`)}
            variant="outline"
            className="w-full"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            onClick={() => openProductQuotation(product.name)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Request Quotation
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <ProductPageLayout
      title="Automobile Supplies"
      description="Our comprehensive range of KOMU Coils Springs and professional-grade suspension components designed for automotive service centers and vehicle maintenance."
    >
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/#services" },
          { name: "Automobile Supplies", url: "/products/automobile-supplies" },
        ]}
      />

      {/* Mobile Horizontal Scroll (Small screens) */}
      <div className="md:hidden mb-12">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {automobileProducts.map((product) => (
              <div key={product.id} className="w-80 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Left Scroll Button */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
          )}

          {/* Right Scroll Button */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          )}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="text-xs text-muted-foreground">Swipe to see more products</div>
        </div>
      </div>

      {/* Desktop Grid (Medium screens and up) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {automobileProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 prose prose-lg max-w-none">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          Premium KOMU Coils Springs & Suspension Components for Kenya
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Moris Enterprises is your trusted supplier of KOMU Coils Springs and professional-grade suspension components across Kenya.
          Our KOMU suspension coils are engineered for durability, reliability, and optimal vehicle performance. Whether you operate an
          automotive service center or manage a fleet, our KOMU coil springs deliver consistent quality and load-bearing performance
          for all vehicle types.
        </p>

        <h3 className="text-2xl font-display font-bold text-foreground mt-8 mb-4">
          Why Choose KOMU Coils Springs?
        </h3>
        <ul className="text-muted-foreground leading-relaxed">
          <li><strong>Engineered Durability:</strong> KOMU suspension springs are designed for maximum load capacity and extended lifespan</li>
          <li><strong>Professional Grade:</strong> KOMU coil springs meet automotive industry standards for reliability and safety</li>
          <li><strong>Multiple Variants:</strong> Blue, Yellow, Dark Blue, Orange/Red, Standard, and Premium grades available</li>
          <li><strong>Kenya-Focused Supply:</strong> Competitive pricing for automotive repair shops and vehicle maintenance centers</li>
          <li><strong>Professional Service:</strong> Expert support and quick quotations via WhatsApp</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-8 mb-4">
          KOMU Coils Springs - Specifications & Applications
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Our KOMU suspension coils are available in various grades to meet different automotive needs. Each KOMU variant is tested
          for load capacity, tensile strength, and corrosion resistance. KOMU springs are suitable for sedan suspensions, commercial
          vehicle applications, and heavy-duty vehicle maintenance. Kenya's road conditions demand reliable suspension components, and
          KOMU coil springs deliver the durability automotive professionals trust.
        </p>

        <h3 className="text-2xl font-display font-bold text-foreground mt-8 mb-4">
          Frequently Asked Questions - KOMU Coils Springs
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground">What load capacity do KOMU coil springs have?</h4>
            <p className="text-muted-foreground mt-2">KOMU suspension springs are engineered with varying load capacities depending on the grade.
            Our Standard and Blue variants suit sedans, while Yellow and Dark Blue are ideal for commercial vehicles. Premium grade KOMU springs
            provide maximum load-bearing capacity for heavy-duty applications.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Are KOMU coil springs corrosion-resistant?</h4>
            <p className="text-muted-foreground mt-2">Yes, KOMU coils springs feature protective finishes to resist corrosion in Kenya's humid climate.
            Each KOMU variant undergoes quality testing to ensure durability and long-term performance.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Can I get a quotation for bulk KOMU springs orders?</h4>
            <p className="text-muted-foreground mt-2">Absolutely! Contact us via WhatsApp for bulk pricing on KOMU coil springs. We offer competitive rates
            for automotive service centers and vehicle maintenance shops ordering multiple KOMU suspension components.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">How quickly can you deliver KOMU springs in Kenya?</h4>
            <p className="text-muted-foreground mt-2">Moris Enterprises maintains stock of popular KOMU variants for fast delivery across Kenya.
            Request a quotation for your specific KOMU springs requirements and delivery timeline.</p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mt-8">
          Whether you need a single KOMU coil spring or bulk KOMU suspension components for your automotive business, our team is ready
          to assist with competitive pricing and professional service. Contact us via WhatsApp to discuss your KOMU springs requirements.
        </p>

        <h3 className="text-2xl font-display font-bold text-foreground mt-12 mb-4">
          Other Product Categories
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Moris Enterprises supplies more than just automotive parts. Explore our comprehensive range of laboratory equipment and medical supplies:
        </p>
        <ul className="text-muted-foreground space-y-2 mb-6">
          <li>
            <strong>Laboratory Equipment:</strong> Professional-grade lab instruments and testing equipment for research facilities
          </li>
          <li>
            <strong>Laboratory Chemicals:</strong> High-purity reagents and chemical supplies for accurate testing and analysis
          </li>
          <li>
            <strong>Medical Equipment:</strong> Professional healthcare instruments and diagnostic devices for medical facilities
          </li>
          <li>
            <strong>Biotechnology Solutions:</strong> Specialized equipment for microbiology and biotechnology applications
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">
          Visit our <a href="/#services" className="text-primary hover:underline font-semibold">main products page</a> to explore all available product categories and services offered by Moris Enterprises.
        </p>
      </div>
    </ProductPageLayout>
  );
};

export default AutomobileSupplies;
