import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  image: string;
  category: string;
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "water-testing-importance",
    title: "Why Water Testing is Critical for Laboratory Safety and Quality Control",
    excerpt: "Understand the importance of regular water testing, common contaminants, and how Palintest photometers ensure your laboratory meets regulatory standards.",
    author: "Moris Enterprises",
    publishedDate: "2024-01-15",
    image: "https://images.unsplash.com/photo-1576091160550-112173f7f477?w=800&q=80",
    category: "Water Testing",
    readTime: 5,
  },
  {
    id: "2",
    slug: "choosing-laboratory-chemicals",
    title: "Complete Guide: Choosing the Right Laboratory Chemicals for Your Research",
    excerpt: "Learn how to select high-quality laboratory chemicals, understand purity grades, and ensure compliance with international standards for your experiments.",
    author: "Moris Enterprises",
    publishedDate: "2024-01-10",
    image: "https://images.unsplash.com/photo-1530134191cf-04db3bf8f61c?w=800&q=80",
    category: "Lab Chemicals",
    readTime: 7,
  },
  {
    id: "3",
    slug: "medical-equipment-maintenance",
    title: "Medical Equipment Maintenance Best Practices: A Comprehensive Guide",
    excerpt: "Discover essential maintenance protocols for medical instruments, preventive care strategies, and how to extend equipment lifespan while ensuring accuracy.",
    author: "Moris Enterprises",
    publishedDate: "2024-01-05",
    image: "https://images.unsplash.com/photo-1576091160568-2173a36ba491?w=800&q=80",
    category: "Medical Equipment",
    readTime: 6,
  },
  {
    id: "4",
    slug: "biotechnology-consumables-faq",
    title: "Biotechnology Consumables: Your Questions Answered",
    excerpt: "Answers to the most frequently asked questions about biotechnology consumables, microbiology media, and how to store them properly for optimal results.",
    author: "Moris Enterprises",
    publishedDate: "2023-12-28",
    image: "https://images.unsplash.com/photo-1581093162429-8a88cf9e49cb?w=800&q=80",
    category: "Biotechnology",
    readTime: 4,
  },
  {
    id: "5",
    slug: "chromatography-techniques",
    title: "Chromatography Consumables: Selecting the Right Equipment for Your Analysis",
    excerpt: "A detailed look at different chromatography methods, selecting appropriate consumables, and optimization techniques for accurate results.",
    author: "Moris Enterprises",
    publishedDate: "2023-12-22",
    image: "https://images.unsplash.com/photo-1579154204601-01d5b6458d8d?w=800&q=80",
    category: "Chromatography",
    readTime: 8,
  },
  {
    id: "6",
    slug: "quality-control-standards",
    title: "Meeting International Quality Control Standards: ISO Compliance Guide",
    excerpt: "Explore ISO standards for quality control, implementation strategies, and how Moris Enterprises can help you maintain certification and regulatory compliance.",
    author: "Moris Enterprises",
    publishedDate: "2023-12-15",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    category: "Quality Control",
    readTime: 7,
  },
];

const Blog = () => {
  usePageMeta({
    title: "Laboratory & Medical Equipment Blog | Industry Insights | Moris Enterprises",
    description: "Expert articles on water testing, laboratory chemicals, medical equipment maintenance, and biotechnology. Learn best practices from Kenya's trusted supplier.",
    keywords: "laboratory blog, water testing guide, medical equipment maintenance, laboratory chemicals, biotechnology, quality control, Moris Enterprises",
    canonical: "https://morisenterprises.com/blog",
    type: "website",
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Breadcrumbs */}
      <section className="pt-32 pb-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Blog" }
            ]}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Laboratory & Industry Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert articles, guides, and case studies to help you maximize laboratory efficiency and ensure quality control excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/blog">
              <Button variant="outline">All Articles</Button>
            </Link>
            {["Water Testing", "Lab Chemicals", "Medical Equipment", "Biotechnology", "Quality Control"].map((cat) => (
              <button key={cat} className="px-4 py-2 rounded-lg border border-border hover:bg-primary hover:text-primary-foreground transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime} min read</span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                    </div>
                    <Button variant="ghost" className="mt-4 w-full group">
                      Read Article <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
