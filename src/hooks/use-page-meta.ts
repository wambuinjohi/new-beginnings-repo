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

      let breadcrumbScript = document.querySelector('script[data-breadcrumb]');
      if (breadcrumbScript) {
        breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
      } else {
        breadcrumbScript = document.createElement("script");
        breadcrumbScript.type = "application/ld+json";
        breadcrumbScript.setAttribute("data-breadcrumb", "true");
        breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(breadcrumbScript);
      }
    }

    // Add article/product metadata schema
    if (type === "article" && (publishedDate || author || modifiedDate)) {
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

      let articleScript = document.querySelector('script[data-article]');
      if (articleScript) {
        articleScript.textContent = JSON.stringify(articleSchema);
      } else {
        articleScript = document.createElement("script");
        articleScript.type = "application/ld+json";
        articleScript.setAttribute("data-article", "true");
        articleScript.textContent = JSON.stringify(articleSchema);
        document.head.appendChild(articleScript);
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

      let faqScript = document.querySelector('script[data-faq-meta]');
      if (faqScript) {
        faqScript.textContent = JSON.stringify(faqSchema);
      } else {
        faqScript = document.createElement("script");
        faqScript.type = "application/ld+json";
        faqScript.setAttribute("data-faq-meta", "true");
        faqScript.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(faqScript);
      }
    }

  }, [title, description, keywords, image, type, canonical, breadcrumbs, author, publishedDate, modifiedDate, faqs, ogLocale]);
};
