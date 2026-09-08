import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileUp,
  Mail,
  Users,
} from "lucide-react";
import { getCurrentRole } from "@/lib/authService";
import type { UserRole } from "@/lib/authService";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiredRole?: UserRole;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Imports", href: "/admin/imports", icon: FileUp },
  { label: "Emails", href: "/admin/emails", icon: Mail },
  { label: "Users", href: "/admin/users", icon: Users, requiredRole: "super_admin" },
];

type AdminSidebarProps = {
  onNavigate?: () => void;
};

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const currentRole = getCurrentRole();
  const visibleItems = navItems.filter(
    (item) => !item.requiredRole || currentRole === item.requiredRole
  );

  return (
    <div className="flex h-full flex-col bg-card border-r border-border">
      {/* Brand */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <NavLink
          to="/admin"
          onClick={onNavigate}
          className="text-xl font-bold tracking-tighter text-foreground"
        >
          Ecigmania
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {visibleItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/admin"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-foreground"
                      : "text-secondary-foreground hover:bg-accent/50 hover:text-foreground",
                  ].join(" ")
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-3">
        <p className="text-[11px] text-muted-foreground">
          Role: {currentRole}
        </p>
      </div>
    </div>
  );
}
