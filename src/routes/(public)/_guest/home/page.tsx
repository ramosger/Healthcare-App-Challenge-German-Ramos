import { createFileRoute } from "@tanstack/react-router";

import { Header, ProvidersListing } from "./-components";

const RouteComponent = () => {
  return (
    <>
      <Header />
      <ProvidersListing />
    </>
  );
};

export const Route = createFileRoute("/(public)/_guest/home/")({
  component: RouteComponent,
});
