import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useAnalytics } from "@/hooks/use-analytics";
import { openProductQuotation } from "@/lib/whatsapp";
import { trackProductView, trackLeadCreated } from "@/lib/retargeting";
import { getHachProductBySlug, hachProducts } from "@/data/hachProducts";
import NotFound from "@/pages/NotFound";

const HachProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  const product = productId ? getHachProductBySlug(productId) : null;

  usePageMeta({
    title: product?.title || "HACH Product Not Found",
    description: product?.description || "The HACH product you are looking for could not be found.",
    keywords: product?.keywords || "",
    image: product?.image || "",
    type: "product",
    canonical: product
      ? `https://morisenterprises.com/products/hach-instruments/${product.id}`
      : "https://morisenterprises.com",
    breadcrumbs: product
      ? [
          { name: "Home", url: "/" },
          { name: "Products", url: "/#services" },
          { name: "HACH Instruments", url: "/products/hach-instruments" },
          { name: product.name, url: `/products/hach-instruments/${product.id}` },
        ]
      : [],
  });

  useEffect(() => {
    if (!product) return;
    trackProductView({
      product_id: product.id,
      product_name: product.name,
      category: product.category,
    });

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.image,
      brand: { "@type": "Brand", name: "HACH" },
      category: product.category,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: product.priceRange?.currency || "KES",
        ...(product.priceRange && {
          lowPrice: product.priceRange.minPrice.toString(),
          highPrice: product.priceRange.maxPrice.toString(),
        }),
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Moris One Enterprises" },
      },
    };

    const existing = document.querySelector<HTMLScriptElement>("script[data-product-schema]");
    if (existing) {
      existing.textContent = JSON.stringify(productSchema);
    } else {
      const newScript = document.createElement("script");
      newScript.type = "application/ld+json";
      newScript.setAttribute("data-product-schema", "true");
      newScript.textContent = JSON.stringify(productSchema);
      document.head.appendChild(newScript);
    }
  }, [product]);

  if (!product) return <NotFound />;

  const related = hachProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <ProductPageLayout title={product.name} description={product.shortDescription}>
      <div className="max-w-6xl mx-auto">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Products", url: "/#services" },
            { name: "HACH Instruments", url: "/products/hach-instruments" },
            { name: product.name, url: `/products/hach-instruments/${product.id}` },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
              <img src={product.image} alt={product.imageAlt} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-primary font-semibold mb-2">{product.category}</p>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">{product.name}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {product.specifications && (
              <div className="mb-8 p-6 bg-secondary/20 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Specifications</h3>
                <dl className="space-y-3">
                  {product.specifications.model && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Model:</dt>
                      <dd className="text-foreground font-semibold">{product.specifications.model}</dd>
                    </div>
                  )}
                  {product.specifications.measurementRange && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Range:</dt>
                      <dd className="text-foreground font-semibold">{product.specifications.measurementRange}</dd>
                    </div>
                  )}
                  {product.specifications.application && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Application:</dt>
                      <dd className="text-foreground font-semibold">{product.specifications.application}</dd>
                    </div>
                  )}
                  {product.specifications.powerSupply && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Power:</dt>
                      <dd className="text-foreground font-semibold">{product.specifications.powerSupply}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <Button
              onClick={() => {
                trackEvent("hach_quotation_requested", {
                  product_id: product.id,
                  product_name: product.name,
                });
                trackLeadCreated({
                  product_interest: product.name,
                  product_id: product.id,
                  source: "hach_detail_page",
                });
                openProductQuotation(product.name);
              }}
              size="lg"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Request Quotation via WhatsApp
            </Button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-display font-bold text-foreground mb-8">Related HACH Instruments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Card key={rp.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative w-full h-40 bg-muted overflow-hidden">
                    <img src={rp.image} alt={rp.imageAlt} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{rp.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{rp.shortDescription}</p>
                    <Button
                      onClick={() => navigate(`/products/hach-instruments/${rp.id}`)}
                      variant="outline"
                      className="w-full"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProductPageLayout>
  );
};

export default HachProductDetail;
