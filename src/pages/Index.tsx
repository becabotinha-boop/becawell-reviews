import { Link } from "react-router-dom";
import { ArrowRight, Shield, FlaskConical, Eye, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { categories, getFeaturedProducts } from "@/data/products";

const Index = () => {
  const featured = getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary animate-fade-in">
              Independent Reviews
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Smarter Product Choices,{" "}
              <span className="text-primary">Backed by Real Analysis</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              BecaWell reviews wellness products, supplements, and everyday tools
              with calm precision. No hype — just evidence-based analysis to help
              you choose better.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="cta" size="lg" asChild>
                <Link to="/category/supplements">
                  Browse Reviews <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Our Methodology</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b border-border bg-card">
        <div className="container py-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: FlaskConical, label: "Products Tested", value: "200+" },
              { icon: BarChart3, label: "Data Points Analyzed", value: "15,000+" },
              { icon: Shield, label: "Independent Reviews", value: "100%" },
              { icon: Eye, label: "Monthly Readers", value: "50K+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon className="mb-2 h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="font-display text-2xl font-bold text-foreground">Browse by Category</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button key={cat.id} variant="pill" size="pill" asChild>
              <Link to={`/category/${cat.slug}`}>
                <span className="mr-1">{cat.icon}</span> {cat.name}
                <span className="ml-1 text-xs opacity-60">{cat.count}</span>
              </Link>
            </Button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Top Picks</h2>
            <p className="mt-1 text-sm text-muted-foreground">Our highest-rated products across all categories</p>
          </div>
          <Link to="/category/supplements" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* How We Review */}
      <section className="border-t border-border bg-card">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">How We Review</h2>
            <p className="mt-3 text-muted-foreground">
              Every product goes through our rigorous multi-step evaluation process.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Research & Source", desc: "We identify top contenders using market data, expert input, and community feedback." },
              { step: "02", title: "Test & Measure", desc: "Real-world testing with quantitative scoring across effectiveness, value, usability, and quality." },
              { step: "03", title: "Analyze & Recommend", desc: "Results are synthesized into clear verdicts. No brand influence, just data." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="rounded-xl border border-border bg-background p-6">
                <span className="text-3xl font-bold text-primary/20">{step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/about">Read Full Methodology →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Get Smarter Picks Weekly
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join 10,000+ readers who trust BecaWell for product recommendations.
          </p>
          <div className="mt-6 flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button variant="cta" size="lg">Subscribe</Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
