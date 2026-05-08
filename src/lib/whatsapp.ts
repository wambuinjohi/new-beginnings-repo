/**
 * WhatsApp Integration Configuration
 * Centralized WhatsApp phone number and message formatting
 */

const WHATSAPP_PHONE = "+254733137332";
const WHATSAPP_PHONE_CLEAN = "254733137332"; // Without + for wa.me

interface WhatsAppMessageOptions {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  productName?: string;
  subject?: string;
}

export const createWhatsAppMessage = (options: WhatsAppMessageOptions): string => {
  const parts: string[] = [];

  if (options.subject) {
    parts.push(`*${options.subject}*`);
  }

  if (options.productName) {
    parts.push(`Product: ${options.productName}`);
  }

  if (options.name) {
    parts.push(`Name: ${options.name}`);
  }

  if (options.email) {
    parts.push(`Email: ${options.email}`);
  }

  if (options.phone) {
    parts.push(`Phone: ${options.phone}`);
  }

  if (options.message) {
    parts.push(`\nMessage:\n${options.message}`);
  }

  return parts.join("\n");
};

export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${encodedMessage}`;
};

export const openWhatsApp = (message: string, target: string = "_blank"): void => {
  const link = getWhatsAppLink(message);
  window.open(link, target);
};

export const openProductQuotation = (productName: string, target: string = "_blank"): void => {
  const message = createWhatsAppMessage({
    productName: productName,
    message: "Please provide details and pricing.",
  });
  openWhatsApp(message, target);
};

export const getWhatsAppNumber = (): string => WHATSAPP_PHONE;

export const getWhatsAppNumberClean = (): string => WHATSAPP_PHONE_CLEAN;
