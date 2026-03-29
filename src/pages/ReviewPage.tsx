import { useParams, Link } from "react-router-dom";
import { ExternalLink, Check, X, ArrowLeft } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import ScoreBadge from "@/components/ScoreBadge";
import ScoreBar from "@/components/ScoreBar";
import ProductTag from "@/components/ProductTag";
import ReadingProgress from "@/components/ReadingProgress";

const ReviewPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Review not found</h1>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  const alternatives = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <ReadingProgress />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "Product",
              name: product.name,
              brand: { "@type": "Brand", name: product.brand },
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: product.rating,
              bestRating: 5,
            },
            author: { "@type": "Person", name: "BecaWell" },
          }),
        }}
      />

      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Back to Reviews
        </Link>
      </div>

      {/* Product Hero */}
      <section className="container pb-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-2xl bg-secondary">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <ProductTag key={tag} tag={tag} />
              ))}
            </div>
            <p className="mt-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <ScoreBadge score={product.score} size="lg" />
              <div>
                <div className="text-2xl font-bold text-foreground">{product.price}</div>
                <div className="text-sm text-muted-foreground">★ {product.rating} / 5.0</div>
              </div>
            </div>

            <Button variant="cta" size="lg" className="mt-8 w-full md:w-auto" asChild>
              <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                Check Price on Amazon <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="border-y border-border bg-card">
        <div className="container py-12">
          <h2 className="font-display text-2xl font-bold text-foreground">Our Verdict</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.verdict}</p>
        </div>
      </section>

      <div className="container grid gap-12 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* Pros & Cons */}
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Pros & Cons</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Pros</h3>
                <ul className="space-y-3">
                  {product.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-destructive">Cons</h3>
                <ul className="space-y-3">
                  {product.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Score Breakdown */}
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Score Breakdown</h2>
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <ScoreBar label="Effectiveness" score={product.scores.effectiveness} />
              <ScoreBar label="Value for Money" score={product.scores.value} />
              <ScoreBar label="Usability" score={product.scores.usability} />
              <ScoreBar label="Build Quality" score={product.scores.quality} />
            </div>
          </section>

          {/* Evidence */}
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Evidence & Research</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{product.evidence}</p>
            </div>
          </section>

          {/* Who it's for */}
          <section>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Who It's For</h3>
                <ul className="space-y-2">
                  {product.whoFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Who It's Not For</h3>
                <ul className="space-y-2">
                  {product.whoNotFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <ScoreBadge score={product.score} size="lg" />
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{product.name}</h3>
              <p className="mt-1 text-2xl font-bold text-foreground">{product.price}</p>
              <Button variant="cta" size="lg" className="mt-4 w-full" asChild>
                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow">
                  Check Price <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Alternatives
                </h3>
                <div className="space-y-4">
                  {alternatives.map((alt) => (
                    <Link
                      key={alt.id}
                      to={`/review/${alt.slug}`}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
                    >
                      <ScoreBadge score={alt.score} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{alt.name}</p>
                        <p className="text-xs text-muted-foreground">{alt.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
