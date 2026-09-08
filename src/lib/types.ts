export type Product = {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  merchant: string;
  affiliateUrl: string;
  status: "active" | "inactive";
};
