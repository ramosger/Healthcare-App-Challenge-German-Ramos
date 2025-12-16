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

export const Route = createFileRoute("/_private/providers/")({
  component: RouteComponent,
});
