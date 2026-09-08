import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/lib/types";
import { useProducts } from "@/lib/ProductContext";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  merchant: z.string().min(1, "Merchant is required"),
  affiliateUrl: z.string().url("Must be a valid URL").min(1, "URL is required"),
  image: z.string().url("Must be a valid URL").min(1, "Image URL is required"),
  status: z.enum(["active", "inactive"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const navigate = useNavigate();
  const { addProduct, updateProduct } = useProducts();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData || {
      name: "",
      brand: "",
      description: "",
      price: 0,
      category: "",
      merchant: "",
      affiliateUrl: "",
      image: "",
      status: "active",
    },
  });

  const categoryValue = watch("category");
  const statusValue = watch("status");

  const onSubmit = (data: ProductFormValues) => {
    if (initialData) {
      updateProduct(initialData.id, data);
    } else {
      addProduct({
        ...data,
        id: crypto.randomUUID(),
        rating: 0, // Default rating for new products
      });
    }
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name</label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-[13px] text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Brand</label>
            <Input {...register("brand")} />
            {errors.brand && (
              <p className="text-[13px] text-destructive">{errors.brand.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select 
              value={categoryValue} 
              onValueChange={(val) => {
              if (val) setValue("category", val, { shouldValidate: true });
            }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-[13px] text-destructive">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea {...register("description")} rows={4} />
          {errors.description && (
            <p className="text-[13px] text-destructive">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pricing</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (INR)</label>
          <Input type="number" step="0.01" {...register("price")} />
          {errors.price && (
            <p className="text-[13px] text-destructive">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Commerce */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Commerce</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Merchant</label>
            <Input {...register("merchant")} />
            {errors.merchant && (
              <p className="text-[13px] text-destructive">{errors.merchant.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Affiliate URL</label>
            <Input type="url" {...register("affiliateUrl")} />
            {errors.affiliateUrl && (
              <p className="text-[13px] text-destructive">{errors.affiliateUrl.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Media</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Image URL</label>
          <Input type="url" {...register("image")} />
          {errors.image && (
            <p className="text-[13px] text-destructive">{errors.image.message}</p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Status</h3>
        
        <div className="space-y-2 w-full sm:w-[200px]">
          <Select 
            value={statusValue} 
            onValueChange={(val) => {
              if (val) setValue("status", val as "active" | "inactive", { shouldValidate: true });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-[13px] text-destructive">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/admin/products")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
