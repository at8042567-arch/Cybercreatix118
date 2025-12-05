import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { useMemo } from "react";

const CategoriesPage = () => {
  const { data: products = [] } = useProducts();

  const categoriesWithCounts = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      count: products.filter((p) => p.category === category.id).length,
    }));
  }, [products]);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-3xl font-bold md:text-4xl mb-4">
            Browse <span className="text-gradient">Categories</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of digital products across multiple categories. 
            Find exactly what you need to elevate your projects.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesWithCounts.map((category, index) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              count={category.count}
              index={index}
            />
          ))}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default CategoriesPage;
