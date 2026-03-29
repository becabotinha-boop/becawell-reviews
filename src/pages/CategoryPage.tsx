import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, categories, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = slug ? getProductsByCategory(slug) : [];

  // If no products in this category, show all products
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : products;
  const displayTitle = category?.name || "All Reviews";

  return (
    <div className="container py-12">
      <div className="mb-4">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Home
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
          {category?.icon} {displayTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {displayProducts.length} products reviewed and ranked
        </p>
      </div>

      {/* Category Pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={cat.slug === slug ? "default" : "pill"}
            size="pill"
            asChild
          >
            <Link to={`/category/${cat.slug}`}>
              {cat.icon} {cat.name}
            </Link>
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
