import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, MessageCircle } from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  image: string;
  content: JSX.Element;
  faqs: Array<{ question: string; answer: string }>;
  relatedPosts: Array<{ slug: string; title: string; category: string }>;
}

const blogPostsData: Record<string, BlogPostData> = {
  "water-testing-importance": {
    slug: "water-testing-importance",
    title: "Why Water Testing is Critical for Laboratory Safety and Quality Control",
    excerpt: "Understand the importance of regular water testing, common contaminants, and how Palintest photometers ensure your laboratory meets regulatory standards.",
    author: "Moris Enterprises",
    publishedDate: "2024-01-15",
    modifiedDate: "2024-01-15",
    image: "https://images.unsplash.com/photo-1576087301852-8c3bee92d442?w=1200&q=80",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>Water is one of the most critical components in laboratory work, yet its quality is often overlooked. Whether you're conducting chemical analysis, preparing culture media, or running diagnostic tests, the purity and composition of water directly impact your results.</p>
        
        <h2>Why Water Quality Matters</h2>
        <p>Laboratory water must meet stringent quality standards to ensure accuracy and reliability of test results. Contaminated water can lead to:</p>
        <ul>
          <li>Inaccurate test results and false positives</li>
          <li>Equipment corrosion and damage</li>
          <li>Compromised microbiology cultures</li>
          <li>Failed regulatory audits and certifications</li>
          <li>Increased costs due to repeated testing</li>
        </ul>

        <h2>Common Water Contaminants</h2>
        <p>Your laboratory water may contain various contaminants:</p>
        <ul>
          <li><strong>Ionic impurities</strong> - dissolved minerals affecting conductivity</li>
          <li><strong>Organic compounds</strong> - bacteria, endotoxins, and other organic matter</li>
          <li><strong>Particulates</strong> - suspended solids and particles</li>
          <li><strong>Dissolved gases</strong> - oxygen, carbon dioxide, and chlorine</li>
          <li><strong>Trace metals</strong> - iron, copper, and other heavy metals</li>
        </ul>

        <h2>Water Testing with Palintest Solutions</h2>
        <p>At Moris Enterprises, we're the official distributor of Palintest water testing equipment in Kenya. Palintest photometers and test kits provide rapid, accurate results for:</p>
        <ul>
          <li>Chlorine and pH testing</li>
          <li>Turbidity and color measurement</li>
          <li>Bacteria detection</li>
          <li>Heavy metal analysis</li>
          <li>Nutrient testing</li>
        </ul>

        <h2>Implementing a Water Testing Program</h2>
        <p>A comprehensive water testing program should include:</p>
        <ol>
          <li>Regular baseline testing to establish water quality standards</li>
          <li>Daily or weekly monitoring depending on laboratory needs</li>
          <li>Documentation of all results for regulatory compliance</li>
          <li>Corrective actions when results fall below standards</li>
          <li>Annual validation of testing methods</li>
        </ol>

        <h2>Best Practices</h2>
        <p>To maintain optimal water quality:</p>
        <ul>
          <li>Install proper filtration and purification systems</li>
          <li>Regularly maintain your water purification equipment</li>
          <li>Store water in clean, sealed containers</li>
          <li>Perform routine testing as per ISO standards</li>
          <li>Train staff on proper water handling procedures</li>
        </ul>

        <h2>Getting Started</h2>
        <p>If you're looking to implement or improve your water testing program, Moris Enterprises can help. We supply Palintest photometers, test kits, and provide expert consultation on laboratory water quality standards.</p>
      </div>
    ),
    faqs: [
      {
        question: "How often should laboratory water be tested?",
        answer: "Testing frequency depends on your laboratory's type and needs, but most standards recommend daily or weekly testing. High-risk laboratories may need daily monitoring."
      },
      {
        question: "What's the difference between distilled and deionized water?",
        answer: "Distilled water is produced through distillation (boiling and condensing), while deionized water has ions removed through ion exchange. DI water is typically better for laboratory use."
      },
      {
        question: "Can I use tap water in my laboratory?",
        answer: "No. Tap water contains minerals, chlorine, and other contaminants that interfere with laboratory tests. Always use properly purified laboratory-grade water."
      },
      {
        question: "What is water conductivity and why does it matter?",
        answer: "Conductivity measures dissolved ionic impurities. Higher conductivity indicates more contaminants, which can affect test accuracy and equipment performance."
      }
    ],
    relatedPosts: [
      { slug: "quality-control-standards", title: "Meeting International Quality Control Standards", category: "Quality Control" },
      { slug: "medical-equipment-maintenance", title: "Medical Equipment Maintenance Best Practices", category: "Medical Equipment" }
    ]
  },
  "choosing-laboratory-chemicals": {
    slug: "choosing-laboratory-chemicals",
    title: "Complete Guide: Choosing the Right Laboratory Chemicals for Your Research",
    excerpt: "Learn how to select high-quality laboratory chemicals, understand purity grades, and ensure compliance with international standards for your experiments.",
    author: "Moris Enterprises",
    publishedDate: "2024-01-10",
    modifiedDate: "2024-01-10",
    image: "https://images.unsplash.com/photo-1530134191cf-04db3bf8f61c?w=1200&q=80",
    content: (
      <div className="prose prose-lg max-w-none">
        <p>Selecting the right laboratory chemicals is critical for research accuracy and safety. The quality of your chemicals directly impacts experimental results, reproducibility, and compliance with regulatory standards.</p>
        
        <h2>Understanding Chemical Purity Grades</h2>
        <p>Laboratory chemicals are classified by purity levels:</p>
        <ul>
          <li><strong>Reagent (ACS) Grade</strong> - Highest purity for analytical work</li>
          <li><strong>Technical Grade</strong> - Used for general laboratory work</li>
          <li><strong>USP/BP Grade</strong> - Pharmaceutical and medical applications</li>
          <li><strong>HPLC Grade</strong> - For chromatography applications</li>
          <li><strong>Analytical Grade</strong> - For quantitative analysis</li>
        </ul>

        <h2>Key Factors When Selecting Chemicals</h2>
        <p>Consider these important aspects:</p>
        <ul>
          <li><strong>Application</strong> - Choose grade appropriate for your specific use</li>
          <li><strong>Purity Requirements</strong> - Verify specifications meet your needs</li>
          <li><strong>Certificate of Analysis (CoA)</strong> - Always request documentation</li>
          <li><strong>Shelf Life</strong> - Check expiration dates and storage requirements</li>
          <li><strong>Safety Data Sheets (SDS)</strong> - Ensure you have current safety information</li>
          <li><strong>Supply Chain Reliability</strong> - Work with consistent, reputable suppliers</li>
        </ul>

        <h2>Supplier Selection Criteria</h2>
        <p>When choosing a chemical supplier, evaluate:</p>
        <ol>
          <li>ISO certifications and quality standards compliance</li>
          <li>Product traceability and documentation</li>
          <li>Technical support and customer service</li>
          <li>Competitive pricing without compromising quality</li>
          <li>Reliable delivery and inventory management</li>
          <li>Compliance with local and international regulations</li>
        </ol>

        <h2>Storage and Handling</h2>
        <p>Proper storage ensures chemical integrity:</p>
        <ul>
          <li>Store chemicals in appropriate containers and conditions</li>
          <li>Maintain proper temperature and humidity levels</li>
          <li>Keep incompatible chemicals separated</li>
          <li>Use proper labeling and tracking systems</li>
          <li>Implement regular inventory audits</li>
        </ul>

        <h2>Cost Optimization Without Sacrificing Quality</h2>
        <p>Balance cost and quality through:</p>
        <ul>
          <li>Bulk purchasing for frequently used chemicals</li>
          <li>Building long-term relationships with suppliers</li>
          <li>Regular quality assessment and validation</li>
          <li>Implementing efficient inventory management</li>
          <li>Negotiating volume discounts</li>
        </ul>

        <h2>Partner with Moris Enterprises</h2>
        <p>At Moris Enterprises, we supply high-quality laboratory chemicals from reputable manufacturers. Our team can help you select the right products for your specific applications and ensure consistent quality for your research.</p>
      </div>
    ),
    faqs: [
      {
        question: "What does 'ACS Grade' mean?",
        answer: "ACS (American Chemical Society) Grade means the chemical meets strict purity specifications and is suitable for analytical work and research applications."
      },
      {
        question: "Should I always buy the highest purity grade?",
        answer: "No. Use the appropriate grade for your application. Higher purity often means higher cost, so match the grade to your needs."
      },
      {
        question: "How long can chemicals be stored?",
        answer: "Storage life varies by chemical. Always check the Certificate of Analysis and follow storage conditions. Some chemicals degrade quickly if improperly stored."
      },
      {
        question: "What should I look for in a Certificate of Analysis?",
        answer: "Look for specific purity percentages, moisture content, heavy metal limits, and any relevant impurity specifications that match your application requirements."
      }
    ],
    relatedPosts: [
      { slug: "chromatography-techniques", title: "Chromatography Consumables Guide", category: "Chromatography" },
      { slug: "quality-control-standards", title: "ISO Quality Control Standards", category: "Quality Control" }
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  usePageMeta({
    title: post.title,
    description: post.excerpt,
    type: "article",
    canonical: `https://morisenterprises.com/blog/${post.slug}`,
    publishedDate: post.publishedDate,
    modifiedDate: post.modifiedDate,
    author: "Moris Enterprises",
    faqs: post.faqs,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` }
    ]
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Image */}
      <div className="w-full h-96 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Breadcrumbs */}
      <section className="py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: post.title }
            ]}
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-foreground mb-12">
              {post.content}
            </div>

            {/* CTA Section */}
            <Card className="p-8 bg-primary text-primary-foreground mb-12">
              <h3 className="text-2xl font-display font-bold mb-3">Need Laboratory Supplies?</h3>
              <p className="mb-6">Contact us today for a free quote on laboratory chemicals, medical equipment, and testing solutions.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products/laboratory-chemicals">
                  <Button variant="secondary" className="w-full sm:w-auto">Shop Chemicals</Button>
                </Link>
                <a href="https://wa.me/254733137332?text=I%20am%20interested%20in%20laboratory%20chemicals%20and%20testing%20solutions">
                  <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </Card>

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-display font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, idx) => (
                    <Card key={idx} className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.relatedPosts.map((relatedPost, idx) => (
                    <Link key={idx} to={`/blog/${relatedPost.slug}`}>
                      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {relatedPost.category}
                        </span>
                        <h3 className="font-semibold text-foreground mt-3 hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
