import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductPageLayout } from "@/components/ProductPageLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useAnalytics } from "@/hooks/use-analytics";
import { openProductQuotation } from "@/lib/whatsapp";
import { getProductBySlug, automobileProducts } from "@/data/automobileProducts";
import NotFound from "@/pages/NotFound";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  const product = productId ? getProductBySlug(productId) : null;

  // Set page meta tags with product-specific SEO data
  usePageMeta({
    title: product?.title || "Product Not Found",
    description: product?.description || "The product you are looking for could not be found.",
    keywords: product?.keywords || "",
    image: product?.image || "",
    type: "product",
    canonical: product ? `https://morisenterprises.com/products/automobile-supplies/${product.id}` : "https://morisenterprises.com",
    breadcrumbs: product ? [
      { name: "Home", url: "/" },
      { name: "Products", url: "/#services" },
      { name: "Automobile Supplies", url: "/products/automobile-supplies" },
      { name: product.name, url: `/products/automobile-supplies/${product.id}` },
    ] : [],
  });

  // Add Product schema structured data
  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "Moris Enterprises",
    },
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange?.currency || "KES",
      ...(product.priceRange && {
        lowPrice: product.priceRange.minPrice.toString(),
        highPrice: product.priceRange.maxPrice.toString(),
      }),
      availability: "https://schema.org/InStock",
    },
  } : null;

  // Add schema to head
  React.useEffect(() => {
    if (!productSchema) return;
    let productScript = document.querySelector('script[data-product-schema]');
    if (productScript) {
      productScript.textContent = JSON.stringify(productSchema);
    } else {
      productScript = document.createElement("script");
      productScript.type = "application/ld+json";
      productScript.setAttribute("data-product-schema", "true");
      productScript.textContent = JSON.stringify(productSchema);
      document.head.appendChild(productScript);
    }
  }, [product?.id, productSchema]);

  // Get related products (products from the same category, excluding current)
  const relatedProducts = product
    ? automobileProducts
        .filter(
          (p) => p.category === product.category && p.id !== product.id
        )
        .slice(0, 3)
    : [];

  // Early return after all hooks are called
  if (!product) {
    return <NotFound />;
  }

  return (
    <ProductPageLayout
      title={product.name}
      description={product.shortDescription}
    >
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Products", url: "/#services" },
            { name: "Automobile Supplies", url: "/products/automobile-supplies" },
            { name: product.name, url: `/products/automobile-supplies/${product.id}` },
          ]}
        />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-sm text-primary font-semibold mb-2">
                {product.category}
              </p>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="mb-8 p-6 bg-secondary/20 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Specifications
                </h3>
                <dl className="space-y-3">
                  {product.specifications.grade && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Grade:</dt>
                      <dd className="text-foreground font-semibold">
                        {product.specifications.grade}
                      </dd>
                    </div>
                  )}
                  {product.specifications.loadCapacity && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Load Capacity:</dt>
                      <dd className="text-foreground font-semibold">
                        {product.specifications.loadCapacity}
                      </dd>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Material:</dt>
                      <dd className="text-foreground font-semibold">
                        {product.specifications.material}
                      </dd>
                    </div>
                  )}
                  {product.specifications.application && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground font-medium">Application:</dt>
                      <dd className="text-foreground font-semibold">
                        {product.specifications.application}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Availability and CTA */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-foreground font-semibold">
                  {product.availability || "In Stock"}
                </span>
              </div>

              <Button
                onClick={() => {
                  trackEvent('product_quotation_requested', {
                    product_id: product.id,
                    product_name: product.name,
                    category: product.category,
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
        </div>

        {/* Product Details Section */}
        <div className="prose prose-lg max-w-none mb-16">
          <h3 className="text-2xl font-display font-bold text-foreground">
            About This Product
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {product.category === "Suspension Springs" && (
            <>
              <h4 className="text-xl font-display font-bold text-foreground mt-8 mb-4">
                Why Choose Our {product.name}?
              </h4>
              <ul className="text-muted-foreground space-y-2">
                <li>
                  <strong>Engineered Durability:</strong> Designed for maximum load capacity
                  and extended lifespan
                </li>
                <li>
                  <strong>Professional Grade:</strong> Meets automotive industry standards
                  for reliability and safety
                </li>
                <li>
                  <strong>Corrosion Resistant:</strong> Built to withstand Kenya's climate
                  conditions
                </li>
                <li>
                  <strong>Competitive Pricing:</strong> Quality automotive parts at
                  professional rates
                </li>
                <li>
                  <strong>Expert Support:</strong> Professional service and quick quotations
                  via WhatsApp
                </li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-6">
                For optimal suspension performance, consider pairing your coil springs with our{" "}
                <button
                  onClick={() => navigate("/products/automobile-supplies")}
                  className="text-primary hover:underline font-semibold"
                >
                  professional-grade shock absorbers
                </button>
                . Our complete suspension solutions ensure smooth handling and vehicle stability across Kenya's varied road conditions.
              </p>
            </>
          )}

          {product.category === "Shock Absorbers" && (
            <>
              <h4 className="text-xl font-display font-bold text-foreground mt-8 mb-4">
                Why Choose Our {product.name}?
              </h4>
              <ul className="text-muted-foreground space-y-2">
                <li>
                  <strong>Optimal Control:</strong> Designed for maximum vehicle suspension
                  control
                </li>
                <li>
                  <strong>KOMU Compatible:</strong> Works seamlessly with KOMU suspension
                  systems
                </li>
                <li>
                  <strong>Professional Grade:</strong> Premium quality shock absorbers for
                  vehicles
                </li>
                <li>
                  <strong>Kenya-Focused Supply:</strong> Available for quick delivery across
                  Kenya
                </li>
                <li>
                  <strong>Expert Support:</strong> Professional guidance and quotations via
                  WhatsApp
                </li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-6">
                For complete suspension system upgrades, pair these shock absorbers with our full range of{" "}
                <button
                  onClick={() => navigate("/products/automobile-supplies")}
                  className="text-primary hover:underline font-semibold"
                >
                  KOMU coil springs
                </button>
                . Quality suspension components work together to deliver superior vehicle performance and safety.
              </p>
            </>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-display font-bold text-foreground mb-8">
              Related Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative w-full h-40 bg-muted overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.imageAlt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {relatedProduct.shortDescription}
                    </p>
                    <Button
                      onClick={() => {
                        trackEvent('related_product_clicked', {
                          current_product_id: product.id,
                          current_product_name: product.name,
                          related_product_id: relatedProduct.id,
                          related_product_name: relatedProduct.name,
                        });
                        navigate(`/products/automobile-supplies/${relatedProduct.id}`);
                      }}
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

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-display font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="p-6 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">
                What are the specifications and load capacity of this {product.category.toLowerCase()}?
              </h4>
              <p className="text-muted-foreground">
                The {product.name} is engineered as {product.specifications?.grade?.toLowerCase() || "a professional-grade component"} with {product.specifications?.loadCapacity?.toLowerCase() || "optimal"} load capacity. The {product.specifications?.material?.toLowerCase() || "premium steel"} construction ensures durability and reliability for {product.specifications?.application?.toLowerCase() || "automotive suspension systems"}. These coil springs provide excellent corrosion resistance suitable for Kenya's climate and road conditions. For detailed technical specifications including diameter, spring rate, and compression specifications, contact our team via WhatsApp.
              </p>
            </div>

            <div className="p-6 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">
                What is the delivery timeline for KOMU {product.category} in Kenya?
              </h4>
              <p className="text-muted-foreground">
                We maintain in-stock inventory of our {product.name} at our Nairobi facility for fast delivery across Kenya. For individual orders, we typically deliver within 1-3 business days depending on your location. Bulk orders to Mombasa, Kisumu, Eldoret, and other regions can be arranged with flexible timelines. Delivery costs vary based on destination. Request a detailed quotation including shipping costs via WhatsApp and we'll provide an accurate delivery estimate for your specific location and order quantity.
              </p>
            </div>

            <div className="p-6 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">
                What bulk discounts are available for automotive service centers and fleet operators?
              </h4>
              <p className="text-muted-foreground">
                We offer competitive tiered bulk pricing for automotive service centers, fleet operators, and wholesale partners. Discounts increase significantly with larger order quantities and recurring purchases. Bulk orders typically include 4-8 sets or more depending on your fleet size. We also offer volume discounts for mixed product orders including both {product.name} and complementary suspension components. Contact us via WhatsApp with your annual requirements, and our sales team will provide a customized bulk pricing proposal tailored to your business needs.
              </p>
            </div>

            <div className="p-6 bg-secondary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">
                Which vehicle models are compatible with these {product.category}?
              </h4>
              <p className="text-muted-foreground">
                The {product.name} is designed for standard automotive suspension systems. Compatibility depends on your vehicle's model year, suspension type, and specific suspension geometry. While these springs work with most standard vehicles, we recommend confirming compatibility with your mechanic before ordering. Our technical team can provide compatibility guidance for specific vehicle makes and models (including popular Kenya vehicles like Toyota, Nissan, Isuzu, Mitsubishi, and Hyundai). Contact us via WhatsApp with your vehicle details for professional compatibility assessment.
              </p>
            </div>

            {product.category === "Suspension Springs" && (
              <div className="p-6 bg-secondary/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  How long do KOMU coil springs typically last?
                </h4>
                <p className="text-muted-foreground">
                  Our KOMU coil springs are engineered for extended lifespan under normal operating conditions. Quality {product.specifications?.grade?.toLowerCase() || "professional-grade"} coil springs typically last 50,000-100,000+ kilometers depending on road conditions, vehicle load, and maintenance practices. Kenya's road conditions are demanding, and our coil springs are specifically engineered with corrosion-resistant finishes to handle the climate. Proper maintenance, regular inspections, and avoiding overloading extend spring life significantly. If you notice bouncy suspension, clunking noises, or uneven vehicle height, it may indicate spring replacement is needed.
                </p>
              </div>
            )}

            {product.category === "Shock Absorbers" && (
              <div className="p-6 bg-secondary/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  How do I know if my shock absorbers need replacement?
                </h4>
                <p className="text-muted-foreground">
                  Common signs of failing shock absorbers include excessive bouncing after bumps, nose-diving during braking, uneven tire wear, and leaking fluid on the shock absorber body. Rough handling on Kenya's road conditions accelerates shock wear. Most shock absorbers last 50,000-80,000 kilometers before showing significant deterioration. Our professional-grade shock absorbers provide smooth suspension control and can be paired with quality coil springs for optimal vehicle suspension performance. If you're experiencing suspension issues, we recommend having your shocks inspected by a qualified mechanic.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProductPageLayout>
  );
};

export default ProductDetail;
