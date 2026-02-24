import { useState } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  BookOpen,
  Layers3,
  Factory,
  Settings,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Menu Items", url: "/menu-items", icon: UtensilsCrossed },
  { title: "Recipes", url: "/recipes", icon: BookOpen },
  { title: "Batching", url: "/batching", icon: Layers3 },
  { title: "Production Lines", url: "/production-lines", icon: Factory },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 shrink-0 h-screen sticky top-0`}
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Factory className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-slide-in overflow-hidden">
            <h1 className="text-sm font-bold text-foreground tracking-tight leading-none">
              FoodOps
            </h1>
            <p className="text-[10px] text-sidebar-foreground mt-0.5">Manufacturing</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              activeClassName=""
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
