import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Settings, Activity, Thermometer, Gauge, Zap } from "lucide-react";

interface ProductionLine {
  id: string;
  name: string;
  status: "active" | "inactive" | "warning";
  currentProduct: string;
  throughput: string;
  temperature: string;
  efficiency: number;
  uptime: string;
  lastMaintenance: string;
  operator: string;
}

const lines: ProductionLine[] = [
  { id: "1", name: "Line A — Bakery", status: "active", currentProduct: "Vanilla Ice Cream", throughput: "420 units/hr", temperature: "200°C", efficiency: 94, uptime: "99.2%", lastMaintenance: "Feb 10", operator: "John D." },
  { id: "2", name: "Line B — Bakery", status: "warning", currentProduct: "Chocolate Chip Cookies", throughput: "380 units/hr", temperature: "185°C", efficiency: 78, uptime: "95.8%", lastMaintenance: "Jan 28", operator: "Sarah M." },
  { id: "3", name: "Line C — Sauces", status: "active", currentProduct: "Tomato Pasta Sauce", throughput: "250 jars/hr", temperature: "95°C", efficiency: 91, uptime: "98.5%", lastMaintenance: "Feb 15", operator: "Mike R." },
  { id: "4", name: "Line D — Snacks", status: "active", currentProduct: "Granola Bars", throughput: "600 units/hr", temperature: "170°C", efficiency: 96, uptime: "99.7%", lastMaintenance: "Feb 18", operator: "Tom W." },
  { id: "5", name: "Line E — Beverages", status: "inactive", currentProduct: "—", throughput: "—", temperature: "—", efficiency: 0, uptime: "—", lastMaintenance: "Feb 20", operator: "—" },
];

const ProductionLines = () => {
  const [selectedLine, setSelectedLine] = useState<ProductionLine | null>(null);

  return (
    <AppLayout title="Production Lines" subtitle="Monitor and manage manufacturing lines">
      {/* Line Detail Modal */}
      {selectedLine && (
        <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLine(null)}>
          <div className="bg-card rounded-xl border border-border p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">{selectedLine.name}</h3>
              <StatusBadge status={selectedLine.status} />
            </div>
            <div className="space-y-3">
              {[
                ["Current Product", selectedLine.currentProduct],
                ["Throughput", selectedLine.throughput],
                ["Temperature", selectedLine.temperature],
                ["Uptime", selectedLine.uptime],
                ["Last Maintenance", selectedLine.lastMaintenance],
                ["Operator", selectedLine.operator],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-card-foreground font-medium">{value}</span>
                </div>
              ))}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="text-card-foreground font-medium">{selectedLine.efficiency}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${selectedLine.efficiency}%` }} />
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedLine(null)} className="mt-6 w-full py-2 bg-muted text-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Line Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {lines.map((line) => (
          <button
            key={line.id}
            onClick={() => setSelectedLine(line)}
            className="bg-card rounded-xl border border-border p-5 text-left hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-card-foreground">{line.name}</h4>
              <StatusBadge status={line.status} />
            </div>

            {line.status !== "inactive" ? (
              <>
                <p className="text-xs text-muted-foreground mb-3">
                  Currently producing: <span className="text-foreground font-medium">{line.currentProduct}</span>
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-info" />
                    <span className="text-xs text-muted-foreground">{line.throughput}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-xs text-muted-foreground">{line.temperature}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">{line.efficiency}% eff.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-warning" />
                    <span className="text-xs text-muted-foreground">{line.uptime} uptime</span>
                  </div>
                </div>

                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${line.efficiency >= 90 ? "bg-success" : line.efficiency >= 75 ? "bg-warning" : "bg-destructive"}`}
                    style={{ width: `${line.efficiency}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-6">
                <div className="text-center">
                  <Settings className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Under Maintenance</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">Since {line.lastMaintenance}</p>
                </div>
              </div>
            )}

            {line.operator !== "—" && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Operator</span>
                <span className="text-xs text-foreground font-medium">{line.operator}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </AppLayout>
  );
};

export default ProductionLines;
