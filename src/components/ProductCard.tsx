import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import ScoreBadge from "./ScoreBadge";
import ProductTag from "./ProductTag";

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/review/${product.slug}`}
    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <ProductTag key={tag} tag={tag} />
        ))}
      </div>
      <div className="absolute right-3 top-3">
        <ScoreBadge score={product.score} />
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {product.brand}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {product.shortDescription}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-foreground">{product.price}</span>
        <Button variant="cta" size="sm" className="gap-1.5" onClick={(e) => e.preventDefault()}>
          Check Price <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </div>
  </Link>
);

export default ProductCard;
