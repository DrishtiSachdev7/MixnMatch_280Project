import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

const Pantry = () => {
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState({
    Proteins: ["Chicken", "Tofu", "Eggs"],
    Vegetables: ["Tomatoes", "Spinach", "Bell Peppers"],
    Grains: ["Rice", "Pasta", "Quinoa"],
    Spices: ["Garlic", "Basil", "Cumin"],
  });

  const addIngredient = (category: string) => {
    if (!newIngredient.trim()) return;
    setIngredients((prev) => ({
      ...prev,
      [category]: [...prev[category as keyof typeof prev], newIngredient],
    }));
    setNewIngredient("");
  };

  const removeIngredient = (category: string, ingredient: string) => {
    setIngredients((prev) => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].filter((i) => i !== ingredient),
    }));
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Pantry</h1>
        <p className="text-muted-foreground">Manage your ingredients for better recipe suggestions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(ingredients).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder={`Add ${category.toLowerCase()}...`}
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addIngredient(category);
                    }
                  }}
                />
                <Button onClick={() => addIngredient(category)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge key={item} variant="secondary" className="gap-1">
                    {item}
                    <button
                      onClick={() => removeIngredient(category, item)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pantry;
