interface CategoryNavProps {
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
}

export function CategoryNav({ activeCategory = "All", setActiveCategory }: CategoryNavProps) {
  const categories = ["All", "Electronics", "Audio", "Laptops", "Accessories"];

  return (
    <div className="w-full border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" aria-label="Categories">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <a
                key={category}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (setActiveCategory) setActiveCategory(category);
                }}
                className={`
                  whitespace-nowrap border-b py-3 px-1 text-[13px] font-medium transition-colors
                  ${
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {category}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
