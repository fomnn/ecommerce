import type { User } from "@/types/user";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { apiFetch } from "@/lib/ofetch";
import { userStore } from "@/store/auth-store";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import * as React from "react";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: RootComponent,

});

function RootComponent() {
  const location = useLocation();
  const user = useStore(userStore);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    async function verify() {
      const headers = new Headers();
      headers.append("Authorization", `bearer ${token}`);

      try {
        const { user } = await apiFetch<{ user: User }>("/auth/verify", {
          method: "POST",
          headers,
        });

        userStore.setState(() => user);
      }
      catch {
        localStorage.removeItem("token");
      }
    }

    if (!user && token) {
      verify();
    }
  }, []);

  if (location.pathname.startsWith("/auth")) {
    return (
      <Outlet />
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Header />
      <div className="min-h-[calc(100vh-20rem)]">
        <Outlet />
      </div>
      <Footer />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
