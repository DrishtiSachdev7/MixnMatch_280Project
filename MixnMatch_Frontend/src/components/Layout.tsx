import { Link, Outlet } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { ChefHat, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const Layout = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Create Recipe", path: "/create" },
    { name: "Meal Planner", path: "/meal-planner" },
    { name: "Explore", path: "/explore" },
    { name: "Pantry", path: "/pantry" },
    { name: "Tips & Swaps", path: "/tips-swaps" },
    { name: "Favorites", path: "/favorites" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg" 
          : "bg-transparent"
      }`}>
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">MinxMatch</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-primary/10 text-muted-foreground"
                activeClassName="text-primary bg-primary/10"
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button size="sm" asChild className="group">
              <Link to="/create">
                <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Start Cooking
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t-2 border-border/50 bg-muted/20 backdrop-blur py-12 mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">MinxMatch</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered cooking assistant that turns your pantry chaos into chef-level meals.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Safety Notice</h3>
              <p className="text-sm text-muted-foreground">
                Always check for allergies and food safety. AI-generated recipes should be reviewed before cooking.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 MinxMatch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
