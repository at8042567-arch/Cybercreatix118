import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-neon">
                <span className="font-display text-lg font-bold text-primary-foreground">C</span>
              </div>
              <span className="font-display text-xl font-bold text-gradient">CyberCreatix</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your trusted source for premium digital products. Cybersecurity tools, graphic design assets, video editing resources, and more.
            </p>
            <a
              href="https://wa.me/966557677940"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] hover:underline"
            >
              <MessageCircle className="h-5 w-5" />
              Contact us on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-muted-foreground hover:text-primary transition-colors">
                  How to Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=cybersecurity" className="text-muted-foreground hover:text-primary transition-colors">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link to="/products?category=graphic-design" className="text-muted-foreground hover:text-primary transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/products?category=video-editing" className="text-muted-foreground hover:text-primary transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link to="/products?category=ebooks" className="text-muted-foreground hover:text-primary transition-colors">
                  eBooks
                </Link>
              </li>
              <li>
                <Link to="/products?category=software" className="text-muted-foreground hover:text-primary transition-colors">
                  Software
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CyberCreatix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
