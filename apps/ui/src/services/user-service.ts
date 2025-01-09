import type { User } from "@/types/user";
import { apiFetch } from "@/lib/ofetch";
import { userStore } from "@/store/auth-store";
import getHeaders from "@/utils/getHeaders";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserProfile() {
  return useMutation({
    mutationFn: async ({ user }: { user: User }) => {
      const data = await apiFetch<{ user: User; message: "string" }>("/users", {
        method: "PUT",
        headers: getHeaders(),
        body: user,
      });

      userStore.setState(() => data.user);

      return data;
    },
  });
}
