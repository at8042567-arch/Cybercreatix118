import { Link } from "react-router-dom";
import { Star, Download } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all duration-300 card-hover animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.image && !imageError ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-4xl font-bold text-primary/30">
                {product.name.charAt(0)}
              </span>
            </div>
          </>
        )}
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            {product.badge}
          </span>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link to={`/product/${product.id}`}>
            <Button variant="neon">View Details</Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary capitalize">
          {product.category.replace("-", " ")}
        </span>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-2 font-display text-lg font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Stats */}
        <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{product.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{product.reviews.toLocaleString()}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold text-gradient">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
