import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import {
  UtensilsCrossed,
  Layers3,
  Factory,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const recentBatches = [
  { id: "B-2401", product: "Wheat Bread Loaf", qty: "2,400 units", line: "Line A", status: "completed" as const, time: "2h ago" },
  { id: "B-2402", product: "Chocolate Chip Cookies", qty: "5,000 units", line: "Line B", status: "in-progress" as const, time: "Active" },
  { id: "B-2403", product: "Tomato Pasta Sauce", qty: "1,800 jars", line: "Line C", status: "pending" as const, time: "Queued" },
  { id: "B-2404", product: "Vanilla Ice Cream", qty: "3,200 units", line: "Line A", status: "in-progress" as const, time: "Active" },
  { id: "B-2405", product: "Granola Bars", qty: "10,000 units", line: "Line D", status: "pending" as const, time: "Queued" },
];

const alerts = [
  { type: "warning" as const, message: "Line B temperature above threshold", time: "12 min ago" },
  { type: "info" as const, message: "Raw material shipment arriving at 3 PM", time: "1h ago" },
  { type: "success" as const, message: "Quality check passed for Batch B-2401", time: "2h ago" },
];

const alertIcons = {
  warning: <AlertTriangle className="w-4 h-4 text-warning" />,
  info: <Factory className="w-4 h-4 text-info" />,
  success: <CheckCircle2 className="w-4 h-4 text-success" />,
};

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard" subtitle="Production overview & key metrics">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Products"
          value={48}
          change="+3 this week"
          changeType="positive"
          icon={<UtensilsCrossed className="w-5 h-5" />}
        />
        <StatCard
          title="Active Batches"
          value={12}
          change="2 completing soon"
          changeType="neutral"
          icon={<Layers3 className="w-5 h-5" />}
        />
        <StatCard
          title="Production Lines"
          value="4/5"
          change="1 under maintenance"
          changeType="negative"
          icon={<Factory className="w-5 h-5" />}
        />
        <StatCard
          title="Yield Rate"
          value="96.4%"
          change="+1.2% vs last month"
          changeType="positive"
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Batches */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Batches</h3>
          <DataTable headers={["Batch ID", "Product", "Quantity", "Line", "Status"]}>
            {recentBatches.map((batch) => (
              <tr key={batch.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm font-mono font-medium text-foreground">{batch.id}</td>
                <td className="px-4 py-3 text-sm text-foreground">{batch.product}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{batch.qty}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{batch.line}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={batch.status} />
                </td>
              </tr>
            ))}
          </DataTable>
        </div>

        {/* Alerts */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Alerts</h3>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <div className="mt-0.5">{alertIcons[alert.type]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
