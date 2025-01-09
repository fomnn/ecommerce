import type { User } from "@/types/user";
import { apiFetch } from "@/lib/ofetch";
import { userStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  return useMutation({
    mutationFn: async (userData: object) => {
      const { user, token } = await apiFetch<{ user: User; token: string }>("/auth/sign-up", {
        method: "POST",
        body: userData,
      });

      localStorage.setItem("token", token);
      userStore.setState(() => user);
    },
  });
}

export function useVerifyToken() {
  return useMutation({
    mutationFn: async (token: string) => {
      const headers = new Headers();
      headers.append("Authorization", `bearer ${token}`);

      const { user } = await apiFetch<{ user: User }>("/auth/verify", {
        method: "POST",
        headers,
      });

      userStore.setState(() => user);
    },
  });
}
