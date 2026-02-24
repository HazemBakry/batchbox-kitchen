import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: ReactNode;
}

export function StatCard({ title, value, change, changeType = "neutral", icon }: StatCardProps) {
  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }[changeType];

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-card-foreground mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-1 ${changeColor}`}>{change}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
