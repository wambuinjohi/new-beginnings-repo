import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

const WHATSAPP_NUMBER = "+254733137332";

export const FloatingWhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    trackEvent("floating_whatsapp_clicked");
    const message = encodeURIComponent(
      "Hi! I'm interested in your laboratory chemicals and equipment. Can you provide more information?"
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, "")}?text=${message}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-slow group"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>
    </button>
  );
};
