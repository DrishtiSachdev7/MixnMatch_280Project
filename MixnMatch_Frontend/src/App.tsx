import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import HomePage from "./pages/HomePage";
import CreateRecipe from "./pages/CreateRecipe";
import MealPlanner from "./pages/MealPlanner";
import Explore from "./pages/Explore";
import Pantry from "./pages/Pantry";
import TipsSwaps from "./pages/TipsSwaps";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/pantry" element={<Pantry />} />
            <Route path="/tips-swaps" element={<TipsSwaps />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
