import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "product";
  canonical?: string;
  breadcrumbs?: BreadcrumbItem[];
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  faqs?: FAQItem[];
  ogLocale?: string;
}

export const usePageMeta = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  canonical,
  breadcrumbs,
  author,
  publishedDate,
  modifiedDate,
  faqs,
  ogLocale = "en_KE",
}: PageMetaProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update or create meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", description);
    } else {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      descriptionMeta.setAttribute("content", description);
      document.head.appendChild(descriptionMeta);
    }

    // Update or create meta keywords
    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute("content", keywords);
      } else {
        keywordsMeta = document.createElement("meta");
        keywordsMeta.setAttribute("name", "keywords");
        keywordsMeta.setAttribute("content", keywords);
        document.head.appendChild(keywordsMeta);
      }
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (og) {
        og.setAttribute("content", content);
      } else {
        og = document.createElement("meta");
        og.setAttribute("property", property);
        og.setAttribute("content", content);
        document.head.appendChild(og);
      }
    };

    updateOGTag("og:title", title);
    updateOGTag("og:description", description);
    updateOGTag("og:type", type);
    updateOGTag("og:locale", ogLocale);

    if (image) {
      updateOGTag("og:image", image);
    }

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitter = document.querySelector(`meta[name="${name}"]`);
      if (twitter) {
        twitter.setAttribute("content", content);
      } else {
        twitter = document.createElement("meta");
        twitter.setAttribute("name", name);
        twitter.setAttribute("content", content);
        document.head.appendChild(twitter);
      }
    };

    updateTwitterTag("twitter:title", title);
    updateTwitterTag("twitter:description", description);

    if (image) {
      updateTwitterTag("twitter:image", image);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", canonical);
      } else {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        canonicalLink.setAttribute("href", canonical);
        document.head.appendChild(canonicalLink);
      }
    }

    // Add breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `https://morisenterprises.com${item.url}`,
        })),
      };

      const breadcrumbScript = document.querySelector<HTMLScriptElement>('script[data-breadcrumb]');
      if (breadcrumbScript) {
        breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
      } else {
        const newScript = document.createElement("script");
        newScript.type = "application/ld+json";
        newScript.setAttribute("data-breadcrumb", "true");
        newScript.textContent = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(newScript);
      }
    }

    // Add article/product metadata schema
    if ((type === "article" || type === "product") && (publishedDate || author || modifiedDate)) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": type === "product" ? "Product" : "Article",
        headline: title,
        description: description,
        ...(image && { image: image }),
        ...(publishedDate && { datePublished: publishedDate }),
        ...(modifiedDate && { dateModified: modifiedDate }),
        ...(author && { author: { "@type": "Organization", name: author } }),
      };

      const articleScript = document.querySelector<HTMLScriptElement>('script[data-article]');
      if (articleScript) {
        articleScript.textContent = JSON.stringify(articleSchema);
      } else {
        const newScript = document.createElement("script");
        newScript.type = "application/ld+json";
        newScript.setAttribute("data-article", "true");
        newScript.textContent = JSON.stringify(articleSchema);
        document.head.appendChild(newScript);
      }
    }

    // Add FAQ schema
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

      const faqScript = document.querySelector<HTMLScriptElement>('script[data-faq-meta]');
      if (faqScript) {
        faqScript.textContent = JSON.stringify(faqSchema);
      } else {
        const newScript = document.createElement("script");
        newScript.type = "application/ld+json";
        newScript.setAttribute("data-faq-meta", "true");
        newScript.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(newScript);
      }
    }

  }, [title, description, keywords, image, type, canonical, breadcrumbs, author, publishedDate, modifiedDate, faqs, ogLocale]);
};
