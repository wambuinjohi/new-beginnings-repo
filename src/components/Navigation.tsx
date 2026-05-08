import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, HeartPulse, Microscope, Beaker, FlaskConical, Droplet, TestTube, Shield, Waves, Pipette, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAnalytics } from "@/hooks/use-analytics";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    trackEvent('navigation_link_clicked', { section: id });
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }, 100);
  };

  const productCategories = [
    { name: "Medical Equipment", path: "/products/medical-equipment", icon: HeartPulse },
    { name: "Microbiology and Biotechnology", path: "/products/microbiology-biotechnology", icon: Microscope },
    { name: "Glassware", path: "/products/glassware", icon: Beaker },
    { name: "Laboratory Chemicals and Reagents", path: "/products/laboratory-chemicals", icon: FlaskConical },
    { name: "Water Analysis Instruments and Water Treatment", path: "/products/water-analysis", icon: Droplet },
    { name: "Laboratory and Material Testing", path: "/products/laboratory-testing", icon: TestTube },
    { name: "Safety Products", path: "/products/safety-products", icon: Shield },
    { name: "Waste Water, Pool and Spa Filtration", path: "/products/waste-water-filtration", icon: Waves },
    { name: "Palintest Kits", path: "/products/palintest-kits", icon: Pipette },
    { name: "Lab Equipment", path: "/products/lab-equipment", icon: Settings },
  ];

  const navItems = [
    { label: "Home", action: () => scrollToSection("home") },
    { label: "About", action: () => scrollToSection("about") },
    { label: "Services", action: () => scrollToSection("services") },
    { label: "Automobile Supplies", action: () => navigate("/products/automobile-supplies") },
    { label: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          : "bg-white/90 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <button
            onClick={() => {
              trackEvent('logo_clicked');
              navigate("/");
            }}
            className="flex items-center gap-2 animate-fade-in cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="Moris Enterprises - Laboratory Chemicals & Medical Equipment Supplier"
              className="h-16 w-16 object-contain"
              loading="eager"
              decoding="async"
            />
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-foreground leading-tight">
                Moris
              </span>
              <span className="text-lg font-display font-bold text-primary leading-tight">
                Enterprises
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.filter(item => item.label !== "Automobile Supplies").map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}

            {/* Products Dropdown */}
            <div
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
              className="relative"
            >
              <DropdownMenu open={isProductsDropdownOpen} onOpenChange={setIsProductsDropdownOpen}>
                <DropdownMenuTrigger className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-200 flex items-center gap-1.5 relative group focus:outline-none">
                  Laboratory Products
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-screen max-w-3xl bg-white border border-gray-100 rounded-xl shadow-lg p-8 mt-2">
                  <div className="grid grid-cols-3 gap-6">
                    {productCategories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.path}
                          onClick={() => {
                            trackEvent('product_category_clicked', { category: category.name });
                            navigate(category.path);
                            setIsProductsDropdownOpen(false);
                          }}
                          className="flex flex-col items-center gap-3 p-5 rounded-xl hover:bg-primary/5 transition-all duration-200 group cursor-pointer text-center hover:shadow-md"
                        >
                          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-200">
                            <IconComponent className="h-7 w-7 text-primary" />
                          </div>
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {category.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              onClick={() => {
                trackEvent('product_category_clicked', { category: 'Automobile Supplies' });
                navigate("/products/automobile-supplies");
              }}
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-all duration-200 relative group"
            >
              Automobile Supplies
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 mx-2" />

            {/* CTA Button */}
            <Button
              onClick={() => {
                trackEvent('request_quote_clicked', { location: 'desktop_nav' });
                scrollToSection("contact");
              }}
              className="ml-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-lg px-6 py-2 h-auto"
            >
              Request Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground hover:text-primary transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Slide-in Sidebar Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <div className="fixed left-0 top-0 h-screen w-80 max-w-[90vw] bg-white z-50 lg:hidden overflow-y-auto shadow-xl transform transition-transform duration-300">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img
                    src={logo}
                    alt="Moris Enterprises"
                    className="h-10 w-10 object-contain"
                  />
                  <span className="font-display font-bold text-foreground">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Main Navigation */}
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      trackEvent('mobile_nav_link_clicked', { link: item.label });
                      item.action();
                    }}
                    className="text-foreground hover:text-primary hover:bg-primary/5 transition-all px-4 py-3 rounded-lg font-medium text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Laboratory Products Section */}
              <div className="border-t border-gray-100 pt-4 mt-2">
                <p className="text-sm font-bold text-foreground px-6 mb-4">Laboratory Products</p>
                <div className="flex flex-col gap-2 px-4">
                  {productCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.path}
                        onClick={() => {
                          trackEvent('product_category_clicked', { category: category.name, location: 'mobile' });
                          navigate(category.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 transition-all text-left"
                      >
                        <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground line-clamp-2">
                          {category.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Section */}
              <div className="border-t border-gray-100 p-4 mt-4">
                <Button
                  onClick={() => {
                    trackEvent('request_quote_clicked', { location: 'mobile_nav' });
                    scrollToSection("contact");
                  }}
                  className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-lg py-3 h-auto"
                >
                  Request Quote
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
