import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { openProductQuotation } from "@/lib/whatsapp";
import { trackProductView } from "@/lib/retargeting";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { hachProducts, hachSubCategories, type HachProduct } from "@/data/hachProducts";

const HachInstruments = () => {
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState<string>("all");

  usePageMeta({
    title: "HACH Water Quality Instruments Kenya | Moris One Enterprises",
    description:
      "Authorised HACH water-quality instruments in Kenya: lab and portable spectrophotometers, COD digesters, pocket colorimeters for ammonia, phosphorus, nitrogen, heavy metals and disinfection residues. Request a quote.",
    keywords:
      "HACH instruments Kenya, HACH spectrophotometer, DR3900, DR6000, DR1900, DR300, COD analyzer Kenya, water quality testing equipment",
    type: "article",
    canonical: "https://morisenterprises.com/products/hach-instruments",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "HACH Instruments", url: "/products/hach-instruments" },
    ],
  });

  const visibleProducts = useMemo(() => {
    if (activeCat === "all") return hachProducts;
    return hachProducts.filter((p) => p.subCategory === activeCat);
  }, [activeCat]);

  const ProductCard = ({ product }: { product: HachProduct }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-grow">{product.shortDescription}</p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => {
              trackProductView({
                product_id: product.id,
                product_name: product.name,
                category: product.category,
              });
              navigate(`/products/hach-instruments/${product.id}`);
            }}
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
      title="HACH Water Quality Instruments"
      description="Lab and portable HACH spectrophotometers, COD digesters and pocket colorimeters for water and wastewater analysis — supplied and supported in Kenya by Moris One Enterprises."
    >
      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/#services" },
          { name: "HACH Instruments", url: "/products/hach-instruments" },
        ]}
      />

      {/* Sub-category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {hachSubCategories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCat(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeCat === cat.slug
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-secondary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No products in this sub-category yet — contact us for availability.
        </p>
      )}

      {/* SEO long-form content */}
      <div className="mt-12 prose prose-lg max-w-none">
        <h2 className="text-3xl font-display font-bold text-foreground mb-4">
          HACH Instruments in Kenya — Trusted Water Quality Analysis
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Moris One Enterprises supplies the full HACH range of water-quality instruments in Kenya, from high-end UV/VIS
          laboratory spectrophotometers to rugged field colorimeters. HACH instruments are the global benchmark for
          drinking-water, wastewater and process-water testing — covering COD, ammonia nitrogen, total phosphorus,
          total nitrogen, heavy metals, disinfection residues and refractometric measurements.
        </p>

        <h3 className="text-2xl font-display font-bold text-foreground mt-8 mb-4">Why source HACH from Moris One?</h3>
        <ul className="text-muted-foreground leading-relaxed">
          <li><strong>Genuine HACH equipment</strong> with full method support and reagent supply.</li>
          <li><strong>Local Kenya stocking</strong> of high-turn consumables and pocket colorimeters.</li>
          <li><strong>Method guidance</strong> for utilities, industries and environmental labs.</li>
          <li><strong>WhatsApp quotations</strong> within hours — not days.</li>
        </ul>

        <h3 className="text-2xl font-display font-bold text-foreground mt-8 mb-4">
          Applications across Kenya's water sector
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Our HACH portfolio supports water utilities, bottling plants, breweries, pharmaceutical manufacturers,
          environmental consultants and county public-health labs across Nairobi, Mombasa, Kisumu, Eldoret and beyond.
          Whether you are commissioning a new wastewater treatment plant or upgrading routine COD testing, our team will
          recommend the right HACH instrument and reagent stack for your workflow.
        </p>
      </div>
    </ProductPageLayout>
  );
};

export default HachInstruments;
