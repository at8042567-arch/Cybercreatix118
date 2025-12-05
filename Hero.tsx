import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Premium Digital Products</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Unlock Your
            <span className="text-gradient neon-text"> Creative </span>
            Potential
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover premium digital assets for cybersecurity, design, video editing, and more. 
            Elevate your projects with professional-grade tools and resources.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/products">
              <Button variant="neon" size="xl">
                Explore Products
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" size="xl">
                Browse Categories
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">100+</div>
              <div className="mt-1 text-sm text-muted-foreground">Digital Products</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">50K+</div>
              <div className="mt-1 text-sm text-muted-foreground">Downloads</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">4.9★</div>
              <div className="mt-1 text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
