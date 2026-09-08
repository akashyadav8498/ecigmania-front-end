import { Star, ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  // Format price
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card transition-transform hover:-translate-y-[1px] text-left h-full overflow-hidden">
      {/* Image Area */}
      <div className="relative flex items-center justify-center aspect-square w-full overflow-hidden bg-product-bg border-b border-border/50 p-6 sm:p-8">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center mix-blend-multiply"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Brand */}
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
          {product.brand}
        </span>

        {/* Title */}
        <h3 className="text-[15px] font-medium leading-snug tracking-tight text-foreground line-clamp-2 mb-1.5">
          {product.name}
        </h3>
        
        {/* Description / Subtitle */}
        <p className="text-[13px] text-secondary-foreground line-clamp-1 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating > 0 ? (
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-3.5 w-3.5 fill-rating text-rating" />
            <span className="text-[13px] font-medium text-foreground">
              {product.rating}
            </span>
          </div>
        ) : (
          <div className="mb-4"></div>
        )}

        {/* Price & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-0 mt-auto pt-4 border-t border-border/50">
          <div>
            <span className="block text-[10px] text-muted-foreground mb-0.5">Best Price</span>
            <span className="text-xl font-bold text-foreground leading-none">
              ₹{formattedPrice}
            </span>
          </div>
          <a
            href={product.affiliateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "default", size: "default", className: "w-full sm:w-auto justify-center rounded-md font-medium px-4 h-9 shadow-none hover:bg-primary/90 bg-primary text-primary-foreground transition-colors" })}
          >
            View Offer <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
