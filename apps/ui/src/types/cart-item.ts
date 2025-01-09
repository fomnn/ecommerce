import type { ImageUrl } from "./image-url";
import type { Product } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number | null;
}

export type CartItemWithProduct = CartItem & {
  product: Product;
  image_urls: ImageUrl[];
};

export type CartItemAdd = Omit<CartItem, "id" | "quantity">;
