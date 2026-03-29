import { Link } from "react-router-dom";
import { Shield, FlaskConical, Eye, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => (
  <div>
    {/* Hero */}
    <section className="border-b border-border">
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Our Methodology
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            How BecaWell evaluates, scores, and recommends products — 
            with complete transparency.
          </p>
        </div>
      </div>
    </section>

    {/* Who is BecaWell */}
    <section className="container py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-bold text-foreground">Who is BecaWell?</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          BecaWell is a digital wellness analyst persona built on a simple principle: 
          product recommendations should be based on evidence, not hype. We combine 
          quantitative testing with practical experience to deliver reviews you can trust.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We are editorially independent. Our revenue comes from affiliate commissions, 
          but our recommendations are never influenced by commercial relationships. 
          If a product doesn't meet our standards, we say so — regardless of potential earnings.
        </p>
      </div>
    </section>

    {/* Scoring System */}
    <section className="border-y border-border bg-card">
      <div className="container py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Our Scoring System</h2>

          <p className="mb-8 text-muted-foreground leading-relaxed">
            Every product receives a score from 0–100 based on four weighted categories. 
            This standardized approach ensures fair, comparable evaluations across all products.
          </p>

          <div className="space-y-6">
            {[
              { icon: FlaskConical, label: "Effectiveness", weight: "35%", desc: "Does it deliver on its promises? We test claims against measurable outcomes." },
              { icon: Scale, label: "Value for Money", weight: "25%", desc: "Price relative to performance. A $20 product that excels can outscore a $200 one." },
              { icon: Eye, label: "Usability", weight: "20%", desc: "How easy and pleasant is it to use daily? Design, instructions, and integration into routines." },
              { icon: Shield, label: "Quality & Safety", weight: "20%", desc: "Build quality, certifications, ingredient sourcing, and long-term reliability." },
            ].map(({ icon: Icon, label, weight, desc }) => (
              <div key={label} className="flex gap-4 rounded-xl border border-border bg-background p-6">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{label}</h3>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {weight}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Score Ranges */}
    <section className="container py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-bold text-foreground mb-8">Score Ranges</h2>
        <div className="space-y-3">
          {[
            { range: "90–100", label: "Exceptional", color: "bg-score-excellent", desc: "Best in class. Strong recommendation." },
            { range: "80–89", label: "Great", color: "bg-score-good", desc: "Excellent choice for most people." },
            { range: "70–79", label: "Good", color: "bg-score-average", desc: "Solid option with some caveats." },
            { range: "60–69", label: "Fair", color: "bg-score-poor", desc: "Below average. Better alternatives exist." },
            { range: "Below 60", label: "Not Recommended", color: "bg-score-bad", desc: "Significant issues. Avoid." },
          ].map(({ range, label, color, desc }) => (
            <div key={range} className="flex items-center gap-4 rounded-lg border border-border p-4">
              <div className={`h-4 w-4 rounded-full ${color}`} />
              <div className="min-w-0">
                <span className="font-semibold text-foreground">{range}</span>
                <span className="mx-2 text-muted-foreground">·</span>
                <span className="font-medium text-foreground">{label}</span>
                <span className="mx-2 text-muted-foreground">—</span>
                <span className="text-sm text-muted-foreground">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-border bg-card">
      <div className="container py-16 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">Ready to find your next product?</h2>
        <p className="mt-2 text-muted-foreground">Browse our latest evidence-based reviews.</p>
        <Button variant="cta" size="lg" className="mt-6" asChild>
          <Link to="/">Explore Reviews</Link>
        </Button>
      </div>
    </section>
  </div>
);

export default AboutPage;
