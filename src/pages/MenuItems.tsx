import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Filter, Edit2, Trash2, Eye } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  unitCost: string;
  status: "active" | "inactive";
  recipe: string;
}

const initialItems: MenuItem[] = [
  { id: "1", name: "Wheat Bread Loaf", category: "Bakery", sku: "BK-001", unitCost: "$2.40", status: "active", recipe: "R-101" },
  { id: "2", name: "Chocolate Chip Cookies", category: "Bakery", sku: "BK-015", unitCost: "$4.80", status: "active", recipe: "R-115" },
  { id: "3", name: "Tomato Pasta Sauce", category: "Sauces", sku: "SC-003", unitCost: "$3.20", status: "active", recipe: "R-203" },
  { id: "4", name: "Vanilla Ice Cream 1L", category: "Frozen", sku: "FR-022", unitCost: "$5.60", status: "active", recipe: "R-322" },
  { id: "5", name: "Granola Bars (6-pack)", category: "Snacks", sku: "SN-008", unitCost: "$3.90", status: "active", recipe: "R-408" },
  { id: "6", name: "Organic Apple Juice 1L", category: "Beverages", sku: "BV-011", unitCost: "$2.10", status: "inactive", recipe: "R-511" },
  { id: "7", name: "Sourdough Bread", category: "Bakery", sku: "BK-003", unitCost: "$3.80", status: "active", recipe: "R-103" },
  { id: "8", name: "Blueberry Muffins (4-pack)", category: "Bakery", sku: "BK-020", unitCost: "$5.20", status: "active", recipe: "R-120" },
];

const categories = ["All", "Bakery", "Sauces", "Frozen", "Snacks", "Beverages"];

const MenuItems = () => {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [viewItem, setViewItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState({ name: "", category: "Bakery", sku: "", unitCost: "", recipe: "" });

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleAdd = () => {
    setEditItem(null);
    setFormData({ name: "", category: "Bakery", sku: "", unitCost: "", recipe: "" });
    setShowForm(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditItem(item);
    setFormData({ name: item.name, category: item.category, sku: item.sku, unitCost: item.unitCost, recipe: item.recipe });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editItem) {
      setItems(items.map((i) => (i.id === editItem.id ? { ...i, ...formData } : i)));
    } else {
      setItems([...items, { id: Date.now().toString(), ...formData, status: "active" }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const toggleStatus = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: i.status === "active" ? "inactive" : "active" } : i)));
  };

  return (
    <AppLayout title="Menu Items" subtitle="Manage your product catalog">
      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
          <div className="bg-card rounded-xl border border-border p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">{viewItem.name}</h3>
            <div className="space-y-3">
              {[
                ["Category", viewItem.category],
                ["SKU", viewItem.sku],
                ["Unit Cost", viewItem.unitCost],
                ["Recipe", viewItem.recipe],
                ["Status", viewItem.status],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-card-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setViewItem(null)} className="mt-6 w-full py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-xl border border-border p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">{editItem ? "Edit Item" : "Add New Item"}</h3>
            <div className="space-y-3">
              {(["name", "sku", "unitCost", "recipe"] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{field === "unitCost" ? "Unit Cost" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</label>
                <select
                  className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors shrink-0 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable headers={["Name", "Category", "SKU", "Unit Cost", "Recipe", "Status", "Actions"]}>
        {filtered.map((item) => (
          <tr key={item.id} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-foreground">{item.name}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{item.category}</td>
            <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{item.sku}</td>
            <td className="px-4 py-3 text-sm text-foreground">{item.unitCost}</td>
            <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{item.recipe}</td>
            <td className="px-4 py-3">
              <button onClick={() => toggleStatus(item.id)}>
                <StatusBadge status={item.status} />
              </button>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <button onClick={() => setViewItem(item)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleEdit(item)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </AppLayout>
  );
};

export default MenuItems;
