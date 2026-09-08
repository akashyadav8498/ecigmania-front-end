import { Filter, ChevronDown } from "lucide-react";

export function CatalogToolbar({ resultCount }: { resultCount: number }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-6">
      <div className="flex-1 min-w-0 mr-2">
        <p className="text-[13px] text-secondary-foreground font-medium truncate">
          Showing {resultCount} results
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Mobile Filter Button */}
        <button className="lg:hidden shrink-0 flex items-center gap-1 sm:gap-2 text-[13px] font-medium text-foreground py-1.5 px-2 sm:px-3 border border-border rounded-md hover:bg-muted/50 transition-colors">
          <Filter className="h-3.5 w-3.5" />
          Filters
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[13px] text-secondary-foreground hidden sm:inline-block">Sort by:</span>
          <button className="flex items-center gap-1 text-[13px] font-medium text-foreground py-1.5 px-2 sm:px-3 border border-border rounded-md hover:bg-muted/50 transition-colors">
            Featured
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
