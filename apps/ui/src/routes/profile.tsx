import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import clsx from "clsx";

import SolarLogin3Broken from "~icons/solar/login-3-broken";
import SolarUserRoundedBroken from "~icons/solar/user-rounded-broken";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  return (
    <div className="px-16 py-8">
      <h1 className="text-3xl font-semibold">
        Settings
      </h1>
      <div className="flex gap-6 mt-8">
        <div className="flex flex-col w-3/12 space-y-2">
          <Link
            to="/profile"
            className={clsx("flex px-4 py-2 rounded gap-2 items-center border", {
              "bg-zinc-100": location.pathname === "/profile",
            })}
          >
            <SolarUserRoundedBroken />
            Profile
          </Link>
          <Link
            to="/profile/authentication"
            className={clsx("flex px-4 py-2 rounded gap-2 items-center border", {
              "bg-zinc-100": location.pathname === "/profile/authentication",
            })}
          >
            <SolarLogin3Broken />
            Authentication
          </Link>
        </div>
        <div className="w-5/12 flex flex-col gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
