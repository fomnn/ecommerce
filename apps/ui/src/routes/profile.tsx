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
    <div className="px-4 sm:px-16 py-8">
      <h1 className="text-3xl font-semibold">
        Settings
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 mt-8">
        <div className="flex flex-row sm:flex-col w-full sm:w-3/12 gap-2 text-sm sm:text-base sm:space-y-2">
          <Link
            to="/profile"
            className={clsx("flex px-2 sm:px-4 py-1 sm:py-2 rounded gap-2 items-center border", {
              "bg-zinc-100": location.pathname === "/profile",
            })}
          >
            <SolarUserRoundedBroken />
            Profile
          </Link>
          <Link
            to="/profile/authentication"
            className={clsx("flex px-2 sm:px-4 py-1 sm:py-2 rounded gap-2 items-center border", {
              "bg-zinc-100": location.pathname === "/profile/authentication",
            })}
          >
            <SolarLogin3Broken />
            Authentication
          </Link>
        </div>
        <div className="sm:w-5/12 flex flex-col gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
