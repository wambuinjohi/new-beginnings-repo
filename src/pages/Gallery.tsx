import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";

const galleryImages = [
  {
    id: 1,
    url: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Fd113209f2d0a493c8e5175130a011777?format=webp&width=800",
    alt: "Laboratory Grade Chemicals",
    title: "Laboratory Grade Chemicals",
  },
  {
    id: 2,
    url: "https://cdn.builder.io/o/assets%2F8a4218e21c624724bb59cc87fa693142%2F9db6c6127b1846ae8632351dcb68d8c3?alt=media&token=51e06bba-b909-4a5e-a97d-7b52fc3db6f3&apiKey=8a4218e21c624724bb59cc87fa693142",
    alt: "Laboratory Equipment and Supplies",
    title: "Laboratory Equipment",
  },
  {
    id: 3,
    url: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2Faea42c8fcb274d9b955edda8f34f39d3?format=webp&width=800",
    alt: "Chemical Reagents",
    title: "Chemical Reagents",
  },
  {
    id: 4,
    url: "https://cdn.builder.io/api/v1/image/assets%2F8a4218e21c624724bb59cc87fa693142%2F508d631f8be0496f8cbfbd2c4ed09df6?format=webp&width=800",
    alt: "Laboratory Solutions",
    title: "Laboratory Solutions",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  usePageMeta({
    title: "Laboratory Gallery | Moris Enterprises Kenya",
    description: "Explore our comprehensive gallery showcasing premium laboratory chemicals, equipment, and solutions. View high-quality images of our products and facilities.",
    keywords: "laboratory gallery, chemical products, laboratory equipment, laboratory images, laboratory solutions, Kenya",
    type: "website",
    canonical: "https://morisenterprises.com/gallery",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Gallery", url: "/gallery" },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Our Laboratory Gallery
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore our range of premium laboratory chemicals, equipment, and solutions designed for scientific excellence.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg cursor-pointer h-80"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages.find((img) => img.id === selectedImage)?.url}
              alt="Gallery preview"
              className="w-full h-full object-contain"
            />
            <p className="text-white text-center mt-4">
              {galleryImages.find((img) => img.id === selectedImage)?.title}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
