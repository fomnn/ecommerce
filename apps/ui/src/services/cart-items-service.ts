import type { CartItem, CartItemAdd, CartItemWithProduct } from "@/types/cart-item";
import { apiFetch } from "@/lib/ofetch";
import getHeaders from "@/utils/getHeaders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetCartItems() {
  return useQuery({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", `bearer ${token}`);

      const { cartItems } = await apiFetch<{ cartItems: CartItemWithProduct[] }>("/cart-items", {
        headers,
      });

      return {
        cartItems,
      };
    },
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCartItem: CartItemAdd) => {
      const headers = getHeaders();

      const { cartItems } = await apiFetch<{ cartItems: CartItemWithProduct }>("/cart-items", {
        headers,
        body: newCartItem,
        method: "POST",
      });

      return {
        cartItems,
      };
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart-items"] }),
  });
}

export function useReduceCartItemQuantity(id: string, quantity: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const headers = getHeaders();

      const body = {
        quantity: quantity - 1,
      };

      const data = await apiFetch(`/cart-items/${id}`, {
        headers,
        method: "PUT",
        body,
      });

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart-items"] }),
  });
}

export function useAddCartItemQuantity(id: string, quantity: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const headers = getHeaders();

      const body = {
        quantity: quantity + 1,
      };

      const data = await apiFetch(`/cart-items/${id}`, {
        headers,
        method: "PUT",
        body,
      });

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart-items"] }),
  });
}

export function useDeleteCartItemById(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const headers = getHeaders();

      const data = await apiFetch(`/cart-items/${id}`, {
        headers,
        method: "Delete",
      });

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart-items"] }),
  });
}

export function useDeleteAllCartItemByUserId() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_: null) => {
      const headers = getHeaders();

      const data = await apiFetch<{ message: string }>(`/cart-items`, {
        headers,
        method: "Delete",
      });

      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart-items"] }),
  });
}
