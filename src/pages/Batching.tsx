import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Play, Pause, CheckCircle2 } from "lucide-react";

interface Batch {
  id: string;
  product: string;
  recipe: string;
  quantity: string;
  line: string;
  status: "pending" | "in-progress" | "completed";
  startTime: string;
  progress: number;
  operator: string;
}

const initialBatches: Batch[] = [
  { id: "B-2401", product: "Wheat Bread Loaf", recipe: "R-101", quantity: "2,400 units", line: "Line A", status: "completed", startTime: "06:00 AM", progress: 100, operator: "John D." },
  { id: "B-2402", product: "Chocolate Chip Cookies", recipe: "R-115", quantity: "5,000 units", line: "Line B", status: "in-progress", startTime: "08:30 AM", progress: 65, operator: "Sarah M." },
  { id: "B-2403", product: "Tomato Pasta Sauce", recipe: "R-203", quantity: "1,800 jars", line: "Line C", status: "pending", startTime: "—", progress: 0, operator: "Mike R." },
  { id: "B-2404", product: "Vanilla Ice Cream", recipe: "R-322", quantity: "3,200 units", line: "Line A", status: "in-progress", startTime: "10:00 AM", progress: 38, operator: "Lisa K." },
  { id: "B-2405", product: "Granola Bars", recipe: "R-408", quantity: "10,000 units", line: "Line D", status: "pending", startTime: "—", progress: 0, operator: "Tom W." },
  { id: "B-2406", product: "Sourdough Bread", recipe: "R-103", quantity: "1,600 loaves", line: "Line A", status: "completed", startTime: "04:00 AM", progress: 100, operator: "John D." },
];

const Batching = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ product: "", recipe: "", quantity: "", line: "Line A", operator: "" });

  const filtered = batches.filter((b) => {
    const matchSearch = b.product.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const handleAdd = () => {
    setFormData({ product: "", recipe: "", quantity: "", line: "Line A", operator: "" });
    setShowForm(true);
  };

  const handleSave = () => {
    setBatches([...batches, {
      id: `B-${2407 + batches.length}`,
      ...formData,
      status: "pending",
      startTime: "—",
      progress: 0,
    }]);
    setShowForm(false);
  };

  const startBatch = (id: string) => {
    setBatches(batches.map((b) => b.id === id ? { ...b, status: "in-progress" as const, startTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), progress: 10 } : b));
  };

  const completeBatch = (id: string) => {
    setBatches(batches.map((b) => b.id === id ? { ...b, status: "completed" as const, progress: 100 } : b));
  };

  const stats = {
    total: batches.length,
    active: batches.filter((b) => b.status === "in-progress").length,
    completed: batches.filter((b) => b.status === "completed").length,
    pending: batches.filter((b) => b.status === "pending").length,
  };

  return (
    <AppLayout title="Batching" subtitle="Batch production tracking & management">
      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card rounded-xl border border-border p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Create New Batch</h3>
            <div className="space-y-3">
              {(["product", "recipe", "quantity", "operator"] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Production Line</label>
                <select className="w-full mt-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground outline-none" value={formData.line} onChange={(e) => setFormData({ ...formData, line: e.target.value })}>
                  {["Line A", "Line B", "Line C", "Line D", "Line E"].map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 bg-muted text-foreground rounded-lg text-sm">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm">Create Batch</button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Batches", value: stats.total, color: "text-foreground" },
          { label: "In Progress", value: stats.active, color: "text-info" },
          { label: "Completed", value: stats.completed, color: "text-success" },
          { label: "Pending", value: stats.pending, color: "text-warning" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-4 text-center">
            <p className="text-2xl font-bold ${stat.color}">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search batches..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          {(["all", "in-progress", "pending", "completed"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0">
          <Plus className="w-4 h-4" />
          New Batch
        </button>
      </div>

      {/* Table */}
      <DataTable headers={["Batch ID", "Product", "Quantity", "Line", "Operator", "Progress", "Status", "Actions"]}>
        {filtered.map((batch) => (
          <tr key={batch.id} className="hover:bg-muted/30 transition-colors">
            <td className="px-4 py-3 text-sm font-mono font-medium text-foreground">{batch.id}</td>
            <td className="px-4 py-3 text-sm text-foreground">{batch.product}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{batch.quantity}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{batch.line}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{batch.operator}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${batch.progress}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">{batch.progress}%</span>
              </div>
            </td>
            <td className="px-4 py-3"><StatusBadge status={batch.status} /></td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                {batch.status === "pending" && (
                  <button onClick={() => startBatch(batch.id)} className="p-1.5 rounded-md hover:bg-success/10 text-muted-foreground hover:text-success transition-colors" title="Start">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                )}
                {batch.status === "in-progress" && (
                  <button onClick={() => completeBatch(batch.id)} className="p-1.5 rounded-md hover:bg-success/10 text-muted-foreground hover:text-success transition-colors" title="Complete">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </AppLayout>
  );
};

export default Batching;
