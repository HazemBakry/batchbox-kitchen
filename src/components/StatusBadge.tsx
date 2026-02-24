interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "completed" | "in-progress" | "warning";
  label?: string;
}

const statusStyles: Record<StatusBadgeProps["status"], string> = {
  active: "bg-success/10 text-success",
  completed: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  pending: "bg-warning/10 text-warning",
  "in-progress": "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
