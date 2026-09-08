import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function FilterSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 lg:block pr-8">
      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="text-[13px] font-medium text-foreground mb-4">Category</h3>
          <ul className="space-y-3">
            {["Audio", "Electronics", "Laptops", "Accessories"].map((cat) => (
              <li key={cat} className="flex items-center space-x-3">
                <Checkbox id={`cat-${cat}`} />
                <label htmlFor={`cat-${cat}`} className="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-foreground">
                  {cat}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Filter */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-[13px] font-medium text-foreground mb-4">Brand</h3>
          <ul className="space-y-3">
            {["Apple", "Sony", "Samsung", "Logitech", "Amazon"].map((brand) => (
              <li key={brand} className="flex items-center space-x-3">
                <Checkbox id={`brand-${brand}`} />
                <label htmlFor={`brand-${brand}`} className="text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-secondary-foreground">
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Range */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-[13px] font-medium text-foreground mb-4">Price Range</h3>
          <RadioGroup defaultValue="under-20k" className="space-y-3">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="under-20k" id="r1" />
              <label htmlFor="r1" className="text-[13px] font-medium leading-none text-secondary-foreground">Under ₹20,000</label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="20k-50k" id="r2" />
              <label htmlFor="r2" className="text-[13px] font-medium leading-none text-secondary-foreground">₹20,000 - ₹50,000</label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="over-50k" id="r3" />
              <label htmlFor="r3" className="text-[13px] font-medium leading-none text-secondary-foreground">Over ₹50,000</label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Rating */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-[13px] font-medium text-foreground mb-4">Minimum Rating</h3>
          <RadioGroup defaultValue="4" className="space-y-3">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                <label htmlFor={`rating-${rating}`} className="text-[13px] font-medium leading-none text-secondary-foreground">{rating} Stars & Up</label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </aside>
  );
}
