import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MenuItems from "./pages/MenuItems";
import Recipes from "./pages/Recipes";
import Batching from "./pages/Batching";
import ProductionLines from "./pages/ProductionLines";
import Inventory from "./pages/Inventory";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu-items" element={<MenuItems />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/batching" element={<Batching />} />
          <Route path="/production-lines" element={<ProductionLines />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
