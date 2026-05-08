import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/use-analytics";
import { useState, useEffect } from "react";
import { createWhatsAppMessage, openWhatsApp, getWhatsAppNumber } from "@/lib/whatsapp";

export const Contact = () => {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Add contact schema on component mount
  useEffect(() => {
    const contactSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Moris Enterprises",
      url: "https://morisenterprises.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        telephone: getWhatsAppNumber(),
        email: "info@morisentreprise.com",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Juja road",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    };

    let contactScript = document.querySelector('script[data-contact-schema]');
    if (contactScript) {
      contactScript.textContent = JSON.stringify(contactSchema);
    } else {
      contactScript = document.createElement("script");
      contactScript.type = "application/ld+json";
      contactScript.setAttribute("data-contact-schema", "true");
      contactScript.textContent = JSON.stringify(contactSchema);
      document.head.appendChild(contactScript);
    }

    return () => {
      // Cleanup is handled by browser
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim() || !formData.message?.trim()) {
      trackEvent('contact_form_validation_error', { error_type: 'missing_fields' });
      toast({
        title: "Please fill all fields",
        description: "All fields are required to send your inquiry.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      trackEvent('contact_form_validation_error', { error_type: 'invalid_email' });
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Phone validation (at least 9 characters)
    if (formData.phone.replace(/\D/g, "").length < 9) {
      trackEvent('contact_form_validation_error', { error_type: 'invalid_phone' });
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message with structured format
    const message = createWhatsAppMessage({
      subject: "New Inquiry from Website",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    // Track successful form submission
    trackEvent('contact_form_submitted', {
      form_type: 'contact_inquiry',
      message_length: formData.message.length,
    });

    // Send to WhatsApp
    openWhatsApp(message);

    toast({
      title: "Message Sent!",
      description: "You'll be redirected to WhatsApp. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30" aria-label="Contact Us" role="region">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Get Your Free Quote Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Place your enquiry online! Our sales resource will get to you within 24 hours. We value our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card border-border">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate itemScope itemType="https://schema.org/ContactPoint">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      aria-required="true"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      aria-required="true"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full"
                    aria-required="true"
                    placeholder="+254 733 137 332"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Tell Us About Your Requirements <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full"
                    aria-required="true"
                    placeholder="What products or services are you interested in?"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Our Address</h3>
                  <address className="text-muted-foreground not-italic">
                    Juja road, Nairobi, Kenya
                  </address>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Email Us</h3>
                  <a href="mailto:info@morisentreprise.com" className="text-muted-foreground hover:text-primary transition-colors">info@morisentreprise.com</a>
                  <p className="text-muted-foreground">morisoneadmin@gmail.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Call Us</h3>
                  <a href={`tel:${getWhatsAppNumber()}`} className="text-muted-foreground hover:text-primary transition-colors">{getWhatsAppNumber()}</a>
                  <p className="text-muted-foreground"><a href="tel:+254741404094" className="hover:text-primary transition-colors">+254 741 404 094</a></p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-2">Business Hours</h3>
                  <p className="text-primary-foreground/90">Monday - Saturday</p>
                  <p className="text-primary-foreground/90 font-semibold">8AM to 10PM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
