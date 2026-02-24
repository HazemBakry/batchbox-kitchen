import { ReactNode, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu, Bell, Search } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless open */}
      <div className={`fixed z-50 lg:static lg:block ${mobileOpen ? "block" : "hidden"}`}>
        <AppSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-card shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-foreground leading-none">{title}</h2>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm outline-none w-40 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">FM</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
