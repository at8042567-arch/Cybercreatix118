import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import CategoryCard from "./CategoryCard";
import { useMemo } from "react";

const Categories = () => {
  const { data: products = [] } = useProducts();

  const categoriesWithCounts = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      count: products.filter((p) => p.category === category.id).length,
    }));
  }, [products]);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Browse by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of digital products across multiple categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
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
      </div>
    </section>
  );
};

export default Categories;
