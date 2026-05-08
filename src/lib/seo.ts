/**
 * SEO Optimization Utilities
 * Provides helpers for improving SEO with structured data and meta tags
 */

interface SchemaOrganization {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

interface SchemaLocalBusiness {
  name: string;
  address: string;
  phone: string;
  url: string;
  email?: string;
  priceRange?: string;
}

interface SchemaProduct {
  name: string;
  description: string;
  image?: string;
  price?: string;
  currency?: string;
  availability?: string;
  rating?: number;
  ratingCount?: number;
}

/**
 * Create and inject organization structured data
 */
export const injectOrganizationSchema = (data: SchemaOrganization): void => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Create and inject local business structured data
 */
export const injectLocalBusinessSchema = (data: SchemaLocalBusiness): void => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address,
      addressCountry: "KE",
    },
    telephone: data.phone,
    url: data.url,
    ...(data.email && { email: data.email }),
    ...(data.priceRange && { priceRange: data.priceRange }),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Create and inject product structured data
 */
export const injectProductSchema = (data: SchemaProduct): void => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    ...(data.image && { image: data.image }),
    ...(data.price &&
      data.currency && {
      offers: {
        "@type": "Offer",
        price: data.price,
        priceCurrency: data.currency,
        ...(data.availability && { availability: data.availability }),
      },
    }),
    ...(data.rating &&
      data.ratingCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.rating,
        ratingCount: data.ratingCount,
      },
    }),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Generate and add appropriate meta tags for better SEO
 */
export const addSEOMeta = (name: string, content: string): void => {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

/**
 * Generate and add OpenGraph meta tags
 */
export const addOpenGraphMeta = (property: string, content: string): void => {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

/**
 * Generate robot directives for search engine optimization
 */
export const setRobotDirectives = (
  index: boolean = true,
  follow: boolean = true,
  imageIndex: boolean = true,
  snippet: boolean = true,
  videoPreview: boolean = true
): void => {
  const directives = [
    index ? "index" : "noindex",
    follow ? "follow" : "nofollow",
    imageIndex ? "imagindexable" : "noimageindex",
    snippet ? "max-snippet:-1" : "max-snippet:0",
    videoPreview ? "max-video-preview:-1" : "max-video-preview:0",
  ];

  addSEOMeta("robots", directives.join(", "));
};

/**
 * Add breadcrumb schema for better navigation understanding
 */
export const injectBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
): void => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `https://morisenterprises.com${item.url}`,
    })),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Add Contact Point schema for better contact visibility
 */
export const injectContactPointSchema = (
  contactType: string,
  telephone: string,
  email?: string
): void => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    contactType: contactType,
    telephone: telephone,
    ...(email && { email: email }),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
