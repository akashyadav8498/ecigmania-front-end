import type { Product } from "@/lib/types";
import type { ImportRow } from "./types";

const generateId = () => {
  return "prod_" + Math.random().toString(36).substr(2, 9);
};

export const mapImportRowToProduct = (row: ImportRow): Product => {
  return {
    id: generateId(),
    name: row.name!,
    brand: row.brand!,
    category: row.category!,
    description: row.description!,
    price: Number(row.price),
    merchant: row.merchant!,
    affiliateUrl: row.affiliateUrl!,
    image: row.image!,
    status: (row.status === "active" ? "active" : "inactive") as "active" | "inactive",
    rating: 0,
  };
};

export const mapImportRowsToProducts = (rows: ImportRow[]): Product[] => {
  return rows.map(mapImportRowToProduct);
};
