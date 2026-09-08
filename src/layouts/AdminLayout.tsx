import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

/**
 * Derives the page title from the current pathname.
 */
function getPageTitle(pathname: string): string {
  const segment = pathname.replace("/admin", "").replace("/", "");
  if (!segment) return "Dashboard";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen flex bg-background font-sans text-foreground">
      {/* Desktop sidebar — persistent */}
      <aside className="hidden lg:flex lg:w-60 lg:shrink-0">
        <div className="fixed inset-y-0 left-0 w-60">
          <AdminSidebar />
        </div>
      </aside>

      {/* Mobile sidebar — Sheet drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" showCloseButton={true} className="w-60 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AdminSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader
          pageTitle={pageTitle}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
