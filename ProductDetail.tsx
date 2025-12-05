import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Star, Download, Check, ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/50 bg-card/50">
            {product.image && product.image !== "/placeholder.svg" ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-8xl font-bold text-primary/20">
                    {product.name.charAt(0)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary capitalize">
              {product.category.replace("-", " ")}
            </span>

            {/* Title */}
            <h1 className="font-display text-3xl font-bold md:text-4xl mb-4">
              {product.name}
            </h1>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-medium">{product.rating}</span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-5 w-5" />
                <span className="font-medium">{product.reviews.toLocaleString()}</span>
                <span>reviews</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display font-semibold mb-4 text-foreground">What's Included:</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <span className="font-display text-4xl font-bold text-gradient">
                {formatPrice(product.price)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="ml-3 text-xl text-muted-foreground line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={`/checkout?product=${product.id}`} className="flex-1">
                <Button variant="neon" size="xl" className="w-full gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Buy Now
                </Button>
              </Link>
              <WhatsAppButton productName={product.name} className="flex-1" size="xl" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border/50 bg-background/90 backdrop-blur-xl p-4 md:hidden">
        <div className="flex items-center gap-4">
          <div>
            <span className="font-display text-xl font-bold text-gradient">
              {formatPrice(product.price)}
            </span>
          </div>
          <Link to={`/checkout?product=${product.id}`} className="flex-1">
            <Button variant="neon" className="w-full">
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
