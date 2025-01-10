import { useSignUp } from "@/services/authentication-service";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import "./auth.css";

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/auth/sign-up" });
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { mutate: signUp } = useSignUp();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signUp(userData, {
      onError: (e) => {
        console.error(e);
      },
      onSuccess: () => {
        navigate({
          to: "/",
        });
      },
    });
  }
  return (
    <div className="sm:grid grid-cols-2 h-screen">
      <div className="flex items-center h-full justify-center">
        <div className="w-10/12 sm:w-7/12">
          <h1 className="text-2xl mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="flex flex-col">
                Fullname
                <input
                  value={userData.fullname}
                  onChange={e => setUserData(ud => ({
                    ...ud,
                    fullname: e.target.value,
                  }))}
                  type="text"
                  placeholder="Enter your fullname"
                  className="border p-2 rounded"
                />
              </label>
              <label className="flex flex-col">
                Email
                <input
                  value={userData.email}
                  onChange={e => setUserData(ud => ({
                    ...ud,
                    email: e.target.value,
                  }))}
                  type="email"
                  placeholder="Enter your email"
                  className="border p-2 rounded"
                />
              </label>
              <label className="flex flex-col">
                Address
                <input
                  value={userData.address}
                  onChange={e => setUserData(ud => ({
                    ...ud,
                    address: e.target.value,
                  }))}
                  type="text"
                  placeholder="Enter your address"
                  className="border p-2 rounded"
                />
              </label>
              <label className="flex flex-col">
                Phone
                <input
                  value={userData.phone}
                  onChange={e => setUserData(ud => ({
                    ...ud,
                    phone: e.target.value,
                  }))}
                  type="text"
                  placeholder="Enter your phone number"
                  className="border p-2 rounded"
                />
              </label>
              <label className="flex flex-col">
                Password
                <input
                  value={userData.password}
                  onChange={e => setUserData(ud => ({
                    ...ud,
                    password: e.target.value,
                  }))}
                  type="password"
                  placeholder="Enter your password"
                  className="border p-2 rounded"
                />
              </label>
              <label className="flex flex-col">
                Password Confirmation
                <input
                  value={passwordConfirmation}
                  onChange={e => setPasswordConfirmation(e.target.value)}
                  type="password"
                  placeholder="Confirm your password"
                  className="border p-2 rounded"
                />
              </label>
            </div>

            <button type="submit" className="bg-orange-400 w-full py-2 px-4 rounded text-white">Sign Up</button>
          </form>
          <p className="mt-4">
            Already have an account?
            {" "}
            <Link to="/auth/login" className="text-orange-600">Login</Link>
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
