import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JSDOM } from "jsdom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "../dist");
const indexHtmlPath = path.join(distDir, "index.html");

// Import automobile products data
const automobileProducts = [
  {
    id: "komu-coils-blue",
    name: "KOMU Coils Springs - Blue",
    title: "KOMU Blue Suspension Coil Springs | Premium Auto Parts Kenya",
    description: "KOMU Blue suspension coil springs - premium-grade automotive suspension components. High tensile strength, corrosion-resistant finish. Load-bearing capacity engineered for sedan vehicles. Professional automotive parts supplier in Kenya.",
    keywords: "KOMU blue coils, KOMU blue springs, suspension coils, coil springs Kenya, sedan suspension, KOMU springs",
  },
  {
    id: "komu-coils-yellow",
    name: "KOMU Coils Springs - Yellow",
    title: "KOMU Yellow Heavy-Duty Suspension Springs | Commercial Vehicle Parts",
    description: "KOMU Yellow suspension springs - premium coil springs for enhanced vehicle suspension. Superior load-bearing capacity for commercial vehicles. Durable automotive suspension components for Kenya's demanding roads.",
    keywords: "KOMU yellow coils, KOMU yellow springs, heavy-duty suspension, commercial vehicle springs, KOMU automotive",
  },
  {
    id: "komu-coils-dark-blue",
    name: "KOMU Coils Springs - Dark Blue",
    title: "KOMU Dark Blue Heavy-Duty Coil Springs | Professional Auto Parts",
    description: "KOMU Dark Blue coil springs - heavy-duty suspension components for reliable vehicle performance. Engineered for longevity and stability. Professional-grade KOMU springs trusted by automotive service centers across Kenya.",
    keywords: "KOMU dark blue coils, KOMU dark blue springs, heavy-duty springs, automotive suspension Kenya",
  },
  {
    id: "komu-coils-orange-red",
    name: "KOMU Coils Springs - Orange/Red",
    title: "KOMU Orange-Red Heavy-Duty Suspension Springs | Truck Parts Kenya",
    description: "KOMU Orange-Red suspension coil springs - high-performance springs for heavy-duty automotive applications. Maximum durability for trucks and commercial vehicles. KOMU coils engineered for superior suspension control.",
    keywords: "KOMU orange red coils, KOMU red springs, truck suspension, heavy-duty automotive, KOMU Kenya",
  },
  {
    id: "komu-coils-standard",
    name: "KOMU Coils Springs - Standard",
    title: "KOMU Standard Suspension Coil Springs | Reliable Auto Repair Parts",
    description: "KOMU Standard suspension coil springs - reliable automotive springs for routine vehicle maintenance. Consistent performance for everyday repair needs. KOMU springs - trusted choice for professional auto repair in Kenya.",
    keywords: "KOMU standard coils, KOMU standard springs, reliable suspension, auto repair springs Kenya",
  },
  {
    id: "komu-coils-premium",
    name: "KOMU Coils Springs - Premium Suspension",
    title: "KOMU Premium Suspension Coil Springs | Top-Tier Auto Parts Kenya",
    description: "KOMU Premium suspension springs - top-tier coil springs for complete vehicle suspension overhaul. Superior load capacity and durability. KOMU premium components - engineered for maximum vehicle performance and safety.",
    keywords: "KOMU premium coils, KOMU premium springs, premium suspension, high-performance springs Kenya",
  },
  {
    id: "automotive-shock-absorbers",
    name: "Automotive Shock Absorbers",
    title: "Professional Shock Absorbers | KOMU Suspension System Components Kenya",
    description: "Professional-grade shock absorbers designed for optimal vehicle suspension control. Compatible with KOMU suspension systems. Premium quality automotive shock absorbers for Kenya.",
    keywords: "shock absorbers, suspension shock absorbers, KOMU compatible, shock absorber Kenya, automotive suspension",
  },
];

// Routes to prerender with their metadata
const routesToPrerender = [
  {
    path: "/",
    title: "Moris Enterprises | Laboratory Chemicals & Medical Equipment Supplier in Kenya",
    description:
      "Leading supplier of laboratory chemicals, medical instruments, biotechnology equipment, and diagnostic tools in Kenya. Quality products since 2010. Free quotation via WhatsApp.",
    keywords:
      "laboratory chemicals, medical equipment, biotechnology, laboratory reagents, diagnostic tools, Kenya, supplier",
  },
  {
    path: "/products/automobile-supplies",
    title:
      "KOMU Coils Springs & Suspension Components | Professional Auto Parts Kenya",
    description:
      "Premium KOMU Coils Springs and suspension components for automotive service centers. Professional-grade coil springs, shock absorbers, and suspension parts in Kenya. Get competitive quotations for high-quality auto suspension components.",
    keywords:
      "KOMU Coils Springs, KOMU Coils, KOMU, suspension coils, suspension springs, coils, car coils, coil springs, KOMU suspension components, coil springs Kenya, auto parts Kenya, shock absorbers, vehicle suspension, automobile supplies",
  },
  {
    path: "/gallery",
    title: "Gallery | Moris Enterprises",
    description:
      "View our laboratory and facilities at Moris Enterprises. Professional equipment setup and quality standards.",
    keywords: "laboratory gallery, equipment showcase, facility tour",
  },
  {
    path: "/products/medical-equipment",
    title: "Medical Equipment | Professional Healthcare Solutions Kenya",
    description:
      "High-quality medical instruments and equipment from Moris Enterprises for healthcare facilities in Kenya.",
    keywords:
      "medical equipment, healthcare instruments, medical devices, Kenya supplier",
  },
  {
    path: "/products/laboratory-chemicals",
    title:
      "Laboratory Chemicals | Quality Reagents & Supplies Kenya Supplier",
    description:
      "Premium laboratory chemicals and reagents for research and testing. Professional-grade chemical supplies from Moris Enterprises.",
    keywords:
      "laboratory chemicals, reagents, chemical supplies, lab reagents Kenya",
  },
  // Product detail pages for automobile supplies
  ...automobileProducts.map((product) => ({
    path: `/products/automobile-supplies/${product.id}`,
    title: product.title,
    description: product.description,
    keywords: product.keywords,
  })),
];

function generateSitemap() {
  const sitemap = [`<?xml version="1.0" encoding="UTF-8"?>`];
  sitemap.push(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

  // Get current date in ISO format (YYYY-MM-DD)
  const currentDate = new Date().toISOString().split('T')[0];

  // Add all routes to sitemap
  for (const route of routesToPrerender) {
    sitemap.push(`  <url>`);
    sitemap.push(`    <loc>https://morisenterprises.com${route.path}</loc>`);
    sitemap.push(`    <lastmod>${currentDate}</lastmod>`);

    // Set change frequency based on route type
    if (route.path === '/') {
      sitemap.push(`    <changefreq>weekly</changefreq>`);
      sitemap.push(`    <priority>1.0</priority>`);
    } else if (route.path.includes('/products/automobile-supplies/')) {
      sitemap.push(`    <changefreq>monthly</changefreq>`);
      sitemap.push(`    <priority>0.8</priority>`);
    } else if (route.path.includes('/products/')) {
      sitemap.push(`    <changefreq>weekly</changefreq>`);
      sitemap.push(`    <priority>0.9</priority>`);
    } else {
      sitemap.push(`    <changefreq>monthly</changefreq>`);
      sitemap.push(`    <priority>0.8</priority>`);
    }

    sitemap.push(`  </url>`);
  }

  sitemap.push(`</urlset>`);
  return sitemap.join('\n');
}

async function prerender() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`❌ Error: ${indexHtmlPath} not found. Run 'npm run build' first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

  for (const route of routesToPrerender) {
    try {
      let html = baseHtml;

      // Update meta tags for this route
      html = updateMetaTags(html, {
        title: route.title,
        description: route.description,
        keywords: route.keywords,
        canonical: `https://morisenterprises.com${route.path}`,
      });

      // Create directory structure if needed
      const routeDir = path.join(distDir, route.path);
      if (route.path !== "/") {
        fs.mkdirSync(routeDir, { recursive: true });
      }

      // Write the HTML file
      const outputPath =
        route.path === "/"
          ? indexHtmlPath
          : path.join(routeDir, "index.html");

      fs.writeFileSync(outputPath, html);
      console.log(`✅ Prerendered: ${route.path}`);
    } catch (error) {
      console.error(`❌ Error prerendering ${route.path}:`, error.message);
    }
  }

  // Generate sitemap.xml
  try {
    const sitemapContent = generateSitemap();
    const sitemapPath = path.join(distDir, "sitemap.xml");
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`✅ Generated sitemap.xml with ${routesToPrerender.length} URLs`);
  } catch (error) {
    console.error(`❌ Error generating sitemap:`, error.message);
  }

  console.log(`\n✨ Prerendering complete! Generated ${routesToPrerender.length} static pages.`);
}

function updateMetaTags(html, metadata) {
  // Update title tag
  html = html.replace(
    /<title>(.*?)<\/title>/,
    `<title>${metadata.title}</title>`
  );

  // Update description meta tag
  html = html.replace(
    /(<meta name="description" content=")([^"]*)/,
    `$1${metadata.description}`
  );

  // Update title meta tag
  html = html.replace(
    /(<meta name="title" content=")([^"]*)/,
    `$1${metadata.title}`
  );

  // Update keywords meta tag
  html = html.replace(
    /(<meta name="keywords" content=")([^"]*)/,
    `$1${metadata.keywords}`
  );

  // Update og:title
  html = html.replace(
    /(<meta property="og:title" content=")([^"]*)/,
    `$1${metadata.title}`
  );

  // Update og:description
  html = html.replace(
    /(<meta property="og:description" content=")([^"]*)/,
    `$1${metadata.description}`
  );

  // Update canonical
  html = html.replace(
    /(<link rel="canonical" href=")([^"]*)/,
    `$1${metadata.canonical}`
  );

  // Update og:url
  html = html.replace(
    /(<meta property="og:url" content=")([^"]*)/,
    `$1${metadata.canonical}`
  );

  // Update twitter tags
  html = html.replace(
    /(<meta name="twitter:title" content=")([^"]*)/,
    `$1${metadata.title}`
  );

  html = html.replace(
    /(<meta name="twitter:description" content=")([^"]*)/,
    `$1${metadata.description}`
  );

  return html;
}

prerender().catch((error) => {
  console.error("Fatal error during prerendering:", error);
  process.exit(1);
});
