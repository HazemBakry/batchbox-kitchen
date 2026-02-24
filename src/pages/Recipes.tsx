import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, ChevronRight, X, Edit2, Trash2 } from "lucide-react";

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  product: string;
  category: string;
  yield: string;
  prepTime: string;
  status: "active" | "inactive";
  ingredients: Ingredient[];
  steps: string[];
}

const initialRecipes: Recipe[] = [
  {
    id: "R-101",
    name: "Classic Wheat Bread",
    product: "Wheat Bread Loaf",
    category: "Bakery",
    yield: "200 loaves",
    prepTime: "4h 30m",
    status: "active",
    ingredients: [
      { name: "Wheat Flour", quantity: "50", unit: "kg" },
      { name: "Water", quantity: "30", unit: "L" },
      { name: "Yeast", quantity: "1.5", unit: "kg" },
      { name: "Salt", quantity: "1", unit: "kg" },
      { name: "Sugar", quantity: "2", unit: "kg" },
    ],
    steps: ["Mix dry ingredients", "Add water gradually", "Knead for 15 minutes", "Proof for 2 hours", "Shape into loaves", "Bake at 200°C for 35 minutes"],
  },
  {
    id: "R-115",
    name: "Chocolate Chip Cookie",
    product: "Chocolate Chip Cookies",
    category: "Bakery",
    yield: "500 cookies",
    prepTime: "2h 15m",
    status: "active",
    ingredients: [
      { name: "All-Purpose Flour", quantity: "25", unit: "kg" },
      { name: "Butter", quantity: "15", unit: "kg" },
      { name: "Sugar", quantity: "12", unit: "kg" },
      { name: "Chocolate Chips", quantity: "10", unit: "kg" },
      { name: "Eggs", quantity: "200", unit: "pcs" },
      { name: "Vanilla Extract", quantity: "0.5", unit: "L" },
    ],
    steps: ["Cream butter and sugar", "Add eggs and vanilla", "Mix in flour", "Fold in chocolate chips", "Scoop onto trays", "Bake at 180°C for 12 minutes"],
  },
  {
    id: "R-203",
    name: "Traditional Tomato Sauce",
    product: "Tomato Pasta Sauce",
    category: "Sauces",
    yield: "600 jars",
    prepTime: "3h",
    status: "active",
    ingredients: [
      { name: "Crushed Tomatoes", quantity: "100", unit: "kg" },
      { name: "Olive Oil", quantity: "5", unit: "L" },
      { name: "Garlic", quantity: "3", unit: "kg" },
      { name: "Basil", quantity: "2", unit: "kg" },
      { name: "Salt", quantity: "1.5", unit: "kg" },
    ],
    steps: ["Sauté garlic in olive oil", "Add crushed tomatoes", "Simmer for 2 hours", "Add basil and seasoning", "Blend to desired consistency", "Fill and seal jars"],
  },
];

const Recipes = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);

  const [formData, setFormData] = useState({
    name: "", product: "", category: "Bakery", yield: "", prepTime: "",
    ingredients: [{ name: "", quantity: "", unit: "kg" }] as Ingredient[],
    steps: [""],
  });

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditRecipe(null);
    setFormData({ name: "", product: "", category: "Bakery", yield: "", prepTime: "", ingredients: [{ name: "", quantity: "", unit: "kg" }], steps: [""] });
    setShowForm(true);
  };

  const handleEdit = (recipe: Recipe) => {
    setEditRecipe(recipe);
    setFormData({
      name: recipe.name, product: recipe.product, category: recipe.category,
      yield: recipe.yield, prepTime: recipe.prepTime,
      ingredients: [...recipe.ingredients], steps: [...recipe.steps],
    });
    setShowForm(true);
    setSelectedRecipe(null);
  };

  const handleSave = () => {
    if (editRecipe) {
      setRecipes(recipes.map((r) => (r.id === editRecipe.id ? { ...r, ...formData } : r)));
    } else {
      setRecipes([...recipes, { id: `R-${Date.now()}`, ...formData, status: "active" }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    setSelectedRecipe(null);
  };

  const addIngredient = () => setFormData({ ...formData, ingredients: [...formData.ingredients, { name: "", quantity: "", unit: "kg" }] });
  const addStep = () => setFormData({ ...formData, steps: [...formData.steps, ""] });

  return (
    <AppLayout title="Recipes" subtitle="Production formulas & instructions">
      {/* Recipe Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-xl border border-border p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">{editRecipe ? "Edit Recipe" : "New Recipe"}</h3>
            <div className="space-y-3">
              {(["name", "product", "yield", "prepTime"] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {field === "prepTime" ? "Prep Time" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                </div>
              ))}

              {/* Ingredients */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Ingredients</label>
                {formData.ingredients.map((ing, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <input placeholder="Name" className="flex-1 px-2 py-1.5 bg-muted border border-border rounded-lg text-sm text-foreground outline-none" value={ing.name} onChange={(e) => { const updated = [...formData.ingredients]; updated[i].name = e.target.value; setFormData({ ...formData, ingredients: updated }); }} />
                    <input placeholder="Qty" className="w-16 px-2 py-1.5 bg-muted border border-border rounded-lg text-sm text-foreground outline-none" value={ing.quantity} onChange={(e) => { const updated = [...formData.ingredients]; updated[i].quantity = e.target.value; setFormData({ ...formData, ingredients: updated }); }} />
                    <select className="w-16 px-1 py-1.5 bg-muted border border-border rounded-lg text-xs text-foreground outline-none" value={ing.unit} onChange={(e) => { const updated = [...formData.ingredients]; updated[i].unit = e.target.value; setFormData({ ...formData, ingredients: updated }); }}>
                      {["kg", "g", "L", "mL", "pcs"].map((u) => <option key={u}>{u}</option>)}
                    </select>
                    <button onClick={() => setFormData({ ...formData, ingredients: formData.ingredients.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={addIngredient} className="mt-2 text-xs text-primary hover:underline">+ Add Ingredient</button>
              </div>

              {/* Steps */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Steps</label>
                {formData.steps.map((step, i) => (
                  <div key={i} className="flex gap-2 mt-2 items-center">
                    <span className="text-xs text-muted-foreground w-5 shrink-0">{i + 1}.</span>
                    <input className="flex-1 px-2 py-1.5 bg-muted border border-border rounded-lg text-sm text-foreground outline-none" value={step} onChange={(e) => { const updated = [...formData.steps]; updated[i] = e.target.value; setFormData({ ...formData, steps: updated }); }} />
                    <button onClick={() => setFormData({ ...formData, steps: formData.steps.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={addStep} className="mt-2 text-xs text-primary hover:underline">+ Add Step</button>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe Detail Panel */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-card rounded-xl border border-border p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">{selectedRecipe.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedRecipe.product}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(selectedRecipe)} className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(selectedRecipe.id)} className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => setSelectedRecipe(null)} className="p-1.5 hover:bg-muted rounded-md text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[["Yield", selectedRecipe.yield], ["Prep Time", selectedRecipe.prepTime], ["Category", selectedRecipe.category]].map(([label, value]) => (
                <div key={label} className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
                </div>
              ))}
            </div>
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ingredients</h4>
              <div className="space-y-1.5">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                    <span className="text-foreground">{ing.name}</span>
                    <span className="text-muted-foreground font-mono">{ing.quantity} {ing.unit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Steps</h4>
              <div className="space-y-2">
                {selectedRecipe.steps.map((step, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search recipes..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground" />
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
          <Plus className="w-4 h-4" />
          New Recipe
        </button>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-card rounded-xl border border-border p-5 text-left hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">{recipe.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{recipe.product}</p>
              </div>
              <StatusBadge status={recipe.status} />
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span>{recipe.yield}</span>
              <span>•</span>
              <span>{recipe.prepTime}</span>
              <span>•</span>
              <span>{recipe.ingredients.length} ingredients</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{recipe.category}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </AppLayout>
  );
};

export default Recipes;
