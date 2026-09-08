import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <span className="text-2xl font-bold tracking-tighter text-foreground">
            Ecigmania
          </span>
        </div>

        {/* Search Field (Hidden on very small screens, visible on md+) */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-lg mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-background pl-10 pr-4 py-2"
              aria-label="Search products"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Icon */}
          <button className="md:hidden p-2 -mr-2 sm:mr-0 text-foreground hover:text-foreground/80 transition-colors" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          
          <Link to="/login" className="flex items-center gap-2 p-2 sm:p-0 -mr-2 sm:mr-0 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors" aria-label="Account">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline-block">Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
