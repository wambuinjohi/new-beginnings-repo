import { Button } from "@/components/ui/button";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

const sliderImages = [
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F547aacee4084419e8e65f46072bcd136?format=webp&width=800",
    alt: "Surgical procedure in operating room",
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fccad64c24e20408d94dc3ec46a73c906?format=webp&width=800",
    alt: "Dental office with modern equipment",
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F1ce925034e89430b8ca69ab9bee8d2d7?format=webp&width=800",
    alt: "Surgical team performing operation",
  },
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    trackEvent('hero_slider_navigation', { direction: 'previous' });
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    trackEvent('hero_slider_navigation', { direction: 'next' });
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Transparent Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-blue-800/40 backdrop-blur-sm"></div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-200"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-200"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              trackEvent('hero_slider_indicator_clicked', { slide_index: index });
              setCurrentImageIndex(index);
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white w-8"
                : "bg-white/50 w-3 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-block bg-primary/20 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
            <span className="text-primary-foreground text-sm font-medium">
              Trusted Since 2010
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Quality Laboratory Solutions for Your Business
          </h1>

          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed" role="doc-subtitle">
            Leading supplier of laboratory chemicals, medical instruments, and biotechnology equipment in Kenya.
            Quality products and services that put you first.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => {
                trackEvent('hero_cta_clicked', { button: 'explore_services' });
                scrollToSection("services");
              }}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6"
            >
              Explore Our Services
            </Button>
            <Button
              size="lg"
              onClick={() => {
                trackEvent('hero_cta_clicked', { button: 'contact_us' });
                scrollToSection("contact");
              }}
              className="bg-white/20 border-2 border-primary-foreground text-primary-foreground hover:bg-white/30 text-lg px-8 py-6 backdrop-blur-sm"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 text-primary-foreground/90">
            <div>
              <p className="text-sm font-medium mb-1">Business Hours</p>
              <p className="text-lg font-semibold">Mon-Sat, 8AM to 10PM</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Call Us Now</p>
              <p className="text-lg font-semibold">+254 733 137 332</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};
