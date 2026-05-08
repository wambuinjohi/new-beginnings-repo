/**
 * Retargeting Pixel Integration
 * Handles Google Analytics 4, Meta Pixel, and custom event tracking
 */

import { API_BASE_URL } from './utils';

// Meta Pixel ID
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

// Google Analytics ID
const GA_ID = import.meta.env.VITE_GA_ID || '';

/**
 * Initialize Meta Pixel
 */
export function initializeMetaPixel() {
  if (!META_PIXEL_ID) {
    console.warn('Meta Pixel ID not configured');
    return;
  }

  // Load Meta Pixel script
  const script = document.createElement('script');
  script.textContent = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  // Create noscript fallback
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" />`;
  document.head.appendChild(noscript);
}

/**
 * Initialize Google Analytics
 */
export function initializeGoogleAnalytics() {
  if (!GA_ID) {
    console.warn('Google Analytics ID not configured');
    return;
  }

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize GA
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

/**
 * Track custom event on Meta Pixel
 */
export function trackMetaPixelEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof (window as any).fbq !== 'function') {
    console.warn('Meta Pixel not initialized');
    return;
  }

  (window as any).fbq('track', eventName, eventData || {});
}

/**
 * Track custom event on Google Analytics
 */
export function trackGoogleEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof (window as any).gtag !== 'function') {
    console.warn('Google Analytics not initialized');
    return;
  }

  (window as any).gtag('event', eventName, eventData || {});
}

/**
 * Track lead creation
 */
export function trackLeadCreated(leadData?: Record<string, any>) {
  const eventData = {
    event_category: 'lead',
    event_label: 'lead_created',
    ...leadData,
  };

  // Meta Pixel
  trackMetaPixelEvent('Lead', {
    content_name: leadData?.product_interest || 'Product Inquiry',
    ...leadData,
  });

  // Google Analytics
  trackGoogleEvent('lead', eventData);
}

/**
 * Track product view for retargeting
 */
export function trackProductView(productData?: Record<string, any>) {
  const eventData = {
    event_category: 'engagement',
    event_label: 'product_viewed',
    ...productData,
  };

  // Meta Pixel
  trackMetaPixelEvent('ViewContent', {
    content_name: productData?.product_name || 'Product',
    content_type: 'product',
    content_ids: [productData?.product_id],
    ...productData,
  });

  // Google Analytics
  trackGoogleEvent('view_item', {
    items: [
      {
        item_id: productData?.product_id,
        item_name: productData?.product_name,
        item_category: productData?.category,
      }
    ],
    ...eventData,
  });
}

/**
 * Track page view with UTM parameters
 */
export function trackPageView(pageData?: Record<string, any>) {
  const url = new URL(window.location.href);
  const utm_source = url.searchParams.get('utm_source');
  const utm_medium = url.searchParams.get('utm_medium');
  const utm_campaign = url.searchParams.get('utm_campaign');

  const eventData = {
    page_title: document.title,
    page_path: window.location.pathname,
    utm_source: utm_source || 'direct',
    utm_medium: utm_medium || 'organic',
    utm_campaign: utm_campaign || 'default',
    ...pageData,
  };

  // Google Analytics
  trackGoogleEvent('page_view', eventData);

  // Send tracking to backend
  if (navigator.sendBeacon) {
    const trackingData = {
      page_url: window.location.href,
      ...eventData,
    };
    navigator.sendBeacon(`${API_BASE_URL}/tracking/pixel`, JSON.stringify(trackingData));
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formData?: Record<string, any>) {
  const eventData = {
    event_category: 'conversion',
    event_label: 'form_submitted',
    ...formData,
  };

  // Meta Pixel
  trackMetaPixelEvent('Lead', {
    content_name: 'Contact Form',
    ...formData,
  });

  // Google Analytics
  trackGoogleEvent('generate_lead', eventData);
}

/**
 * Track email interaction (for campaigns)
 */
export function trackEmailInteraction(action: 'open' | 'click', trackingData?: Record<string, any>) {
  const eventData = {
    event_category: 'email',
    event_label: `email_${action}`,
    ...trackingData,
  };

  // Google Analytics
  trackGoogleEvent(`email_${action}`, eventData);

  // Send to backend
  if (navigator.sendBeacon) {
    navigator.sendBeacon(`${API_BASE_URL}/tracking/pixel`, JSON.stringify(eventData));
  }
}

/**
 * Create custom audience segment for retargeting
 * (This would be used to prepare audience data for export to Google/Meta)
 */
export function getRetargetingAudience() {
  return {
    pixel_id: META_PIXEL_ID,
    ga_id: GA_ID,
    audience_type: 'website_visitors',
    lookback_days: 30,
    events: [
      'PageView',
      'Lead',
      'ViewContent',
    ]
  };
}

/**
 * Track conversion (purchase or customer creation)
 */
export function trackConversion(conversionData?: Record<string, any>) {
  const eventData = {
    event_category: 'conversion',
    event_label: 'customer_conversion',
    ...conversionData,
  };

  // Meta Pixel
  trackMetaPixelEvent('Purchase', {
    currency: 'KES',
    value: conversionData?.value || 0,
    ...conversionData,
  });

  // Google Analytics
  trackGoogleEvent('purchase', {
    currency: 'KES',
    value: conversionData?.value || 0,
    ...eventData,
  });
}
