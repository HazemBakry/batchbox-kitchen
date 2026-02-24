import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, AlertTriangle, Package } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: string;
  unit: string;
  minLevel: string;
  status: "active" | "warning" | "inactive";
  lastRestocked: string;
}

const inventoryItems: InventoryItem[] = [
  { id: "1", name: "Wheat Flour", category: "Dry Goods", stock: "2,400", unit: "kg", minLevel: "500 kg", status: "active", lastRestocked: "Feb 20" },
  { id: "2", name: "Sugar", category: "Dry Goods", stock: "1,800", unit: "kg", minLevel: "300 kg", status: "active", lastRestocked: "Feb 18" },
  { id: "3", name: "Butter", category: "Dairy", stock: "320", unit: "kg", minLevel: "200 kg", status: "warning", lastRestocked: "Feb 15" },
  { id: "4", name: "Chocolate Chips", category: "Confectionery", stock: "680", unit: "kg", minLevel: "150 kg", status: "active", lastRestocked: "Feb 19" },
  { id: "5", name: "Crushed Tomatoes", category: "Canned Goods", stock: "1,200", unit: "kg", minLevel: "400 kg", status: "active", lastRestocked: "Feb 17" },
  { id: "6", name: "Eggs", category: "Dairy", stock: "150", unit: "pcs", minLevel: "500 pcs", status: "warning", lastRestocked: "Feb 22" },
  { id: "7", name: "Olive Oil", category: "Oils", stock: "85", unit: "L", minLevel: "50 L", status: "active", lastRestocked: "Feb 14" },
  { id: "8", name: "Yeast", category: "Baking", stock: "12", unit: "kg", minLevel: "10 kg", status: "warning", lastRestocked: "Feb 16" },
];

const Inventory = () => {
  const [search, setSearch] = useState("");

  const filtered = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = inventoryItems.filter((i) => i.status === "warning").length;

  return (
    <AppLayout title="Inventory" subtitle="Raw materials & stock levels">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{inventoryItems.length}</p>
            <p className="text-xs text-muted-foreground">Total Items</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{lowStock}</p>
            <p className="text-xs text-muted-foreground">Low Stock Alerts</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{inventoryItems.length - lowStock}</p>
            <p className="text-xs text-muted-foreground">Adequate Stock</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 mb-4 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground" />
      </div>

      <DataTable headers={["Name", "Category", "Stock", "Min Level", "Status", "Last Restocked"]}>
        {filtered.map((item) => (
          <tr key={item.id} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-foreground">{item.name}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{item.category}</td>
            <td className="px-4 py-3 text-sm font-mono text-foreground">{item.stock} {item.unit}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{item.minLevel}</td>
            <td className="px-4 py-3">
              <StatusBadge status={item.status} label={item.status === "warning" ? "Low Stock" : "Adequate"} />
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{item.lastRestocked}</td>
          </tr>
        ))}
      </DataTable>
    </AppLayout>
  );
};

export default Inventory;
