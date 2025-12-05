import { Link } from "react-router-dom";
import { Shield, Palette, Video, BookOpen, Code, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Palette,
  Video,
  BookOpen,
  Code,
};

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  count: number;
  index: number;
}

const CategoryCard = ({ id, name, icon, count, index }: CategoryCardProps) => {
  const Icon = iconMap[icon] || Code;

  return (
    <Link
      to={`/products?category=${id}`}
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 transition-all duration-300 card-hover animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        {/* Icon */}
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-neon">
          <Icon className="h-7 w-7" />
        </div>

        {/* Content */}
        <h3 className="mb-1 font-display text-lg font-semibold text-foreground">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {count} products
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
