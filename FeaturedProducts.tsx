import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-card/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-card/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent via-card/30 to-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
              Featured <span className="text-gradient">Products</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Hand-picked premium digital products that deliver exceptional quality and value
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
