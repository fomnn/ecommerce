import type { ProductWithImageUrls } from "@/types/product";
import { apiFetch } from "@/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { products } = await apiFetch<{ products: ProductWithImageUrls[] }>("/products");

      return products;
    },
  });
};

export function useGetProductById(productId: string) {
  return useQuery({
    queryKey: ["products", { productId }],
    queryFn: async () => {
      const { product } = await apiFetch<{ product: ProductWithImageUrls }>(`/products/${productId}`);

      return product;
    },
  });
}

// export function useGetImageByProductId(productId: string) {
//   return useQuery({
//     queryKey: ["products", { productId, image: true }],
//     queryFn: async () => {

//     },
//   });
// }
