import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="h-full flex items-center w-full justify-center mt-20">Later 😁😁</div>;
}
