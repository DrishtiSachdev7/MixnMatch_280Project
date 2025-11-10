import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Heart } from "lucide-react";
import { EnhancedFilter } from "@/components/EnhancedFilter";
import stirfryImage from "@/assets/recipe-stirfry.jpg";
import mediterraneanImage from "@/assets/recipe-mediterranean.jpg";
import curryImage from "@/assets/recipe-curry.jpg";
import { Link } from "react-router-dom";

const Explore = () => {
  const mockRecipes = [
    { id: 1, name: "Asian Chicken Stir-Fry", time: "25 min", tags: ["Asian", "Quick"], image: stirfryImage, pantryMatch: 6 },
    { id: 2, name: "Mediterranean Bowl", time: "20 min", tags: ["Vegetarian", "Healthy"], image: mediterraneanImage, pantryMatch: 7 },
    { id: 3, name: "Spicy Thai Curry", time: "35 min", tags: ["Vegan", "Asian"], image: curryImage, pantryMatch: 5 },
    { id: 4, name: "Italian Pasta Primavera", time: "30 min", tags: ["Italian", "Vegetarian"], image: mediterraneanImage, pantryMatch: 8 },
    { id: 5, name: "Mexican Burrito Bowl", time: "20 min", tags: ["Mexican", "Quick"], image: stirfryImage, pantryMatch: 6 },
    { id: 6, name: "Greek Salad Bowl", time: "15 min", tags: ["Mediterranean", "Healthy"], image: curryImage, pantryMatch: 9 },
    { id: 7, name: "Indian Butter Chicken", time: "45 min", tags: ["Indian", "Comfort"], image: stirfryImage, pantryMatch: 4 },
    { id: 8, name: "Vietnamese Pho", time: "60 min", tags: ["Asian", "Soup"], image: mediterraneanImage, pantryMatch: 5 },
    { id: 9, name: "French Ratatouille", time: "50 min", tags: ["French", "Vegan"], image: curryImage, pantryMatch: 7 },
  ];

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Explore{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Recipes
          </span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover new recipes tailored to your taste and pantry
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[350px_1fr] gap-8">
        {/* Filters Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-24 h-fit"
        >
          <EnhancedFilter onFilterChange={(filters) => console.log(filters)} />
        </motion.aside>

        {/* Recipe Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{mockRecipes.length}</span> recipes
            </p>
            <Badge variant="secondary" className="text-sm">
              Updated daily
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden hover:shadow-glow transition-all duration-500 group border-2 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className="bg-primary/90 backdrop-blur">
                        {recipe.pantryMatch} items
                      </Badge>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center"
                      >
                        <Heart className="h-4 w-4 text-foreground hover:fill-primary hover:text-primary transition-colors" />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{recipe.time}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg line-clamp-2">{recipe.name}</h3>
                    <div className="flex flex-wrap gap-2 flex-1">
                      {recipe.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Recipe
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link to="/create">Open Chat</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-8">
            <Button variant="glass" size="lg" className="text-lg">
              Load More Recipes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
