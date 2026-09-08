import { Header } from "../components/Header";
import { CategoryNav } from "../components/CategoryNav";
import { FilterSidebar } from "../components/FilterSidebar";
import { CatalogToolbar } from "../components/CatalogToolbar";
import { ProductGrid } from "../components/ProductGrid";
import { useProducts } from "@/lib/ProductContext";
import { useState } from "react";

export function ProductListingPage() {
  const { products: allProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  // Only show active products to customers
  const activeProducts = allProducts.filter((p) => p.status === "active");

  const filteredProducts =
    activeCategory === "All"
      ? activeProducts
      : activeProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <Header />
      <CategoryNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          
          {/* Discovery Section */}
          <div className="mb-6 max-w-2xl">
            <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl mb-3">
              Good products. Better choices.
            </h1>
            <p className="text-base text-secondary-foreground">
              Discover products worth buying, without the endless scrolling.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            <FilterSidebar />
            
            <div className="flex-1 w-full min-w-0">
              <CatalogToolbar resultCount={filteredProducts.length} />
              <ProductGrid products={filteredProducts} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
