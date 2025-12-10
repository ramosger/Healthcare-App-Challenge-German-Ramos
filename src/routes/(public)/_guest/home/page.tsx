import { createFileRoute } from "@tanstack/react-router";

import { Header } from "./-components/-header";

const RouteComponent = () => {
  return <Header />;
};

export const Route = createFileRoute("/(public)/_guest/home/")({
  component: RouteComponent,
});
