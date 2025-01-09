import type { ImageUrl } from "./image-url";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  weight: number;
  category: CategorySlugs;
  created_at: string;
  updated_at: string;
}

export type CategorySlugs = "makanan_anjing" | "makanan_kucing" | "makanan_burung";

export type ProductWithImageUrls = Product & {
  image_urls: ImageUrl[];
};
