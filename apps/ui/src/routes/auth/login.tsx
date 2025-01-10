import { apiFetch } from "@/lib/ofetch";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import "./auth.css";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="sm:grid grid-cols-2 h-screen">
      <div className="flex items-center h-full pb-24 sm:pb-0 justify-center">
        <div className="w-10/12 sm:w-7/12">
          <h1 className="text-2xl mb-6">Login</h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="flex flex-col">
                Email
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border p-2 rounded"
                />
              </label>
              <label className="flex flex-col">
                Password
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="border p-2 rounded"
                />
              </label>
            </div>

            <button type="submit" className="bg-orange-400 w-full py-2 px-4 rounded text-white">Login</button>
          </form>
          <p className="mt-4">
            Belum punya akun?
            {" "}
            <Link to="/auth/sign-up" className="text-orange-600">Daftar</Link>
          </p>
        </div>
      </div>
      <div className="h-full hidden sm:block overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
