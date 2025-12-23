import { createFileRoute } from "@tanstack/react-router";

import { Header, ProvidersListing } from "./-components";
import { validateProvidersSearch } from "./-search";

const RouteComponent = () => {
  return (
    <>
      <Header />
      <ProvidersListing />
    </>
  );
};

export const Route = createFileRoute("/_private/providers/")({
  validateSearch: validateProvidersSearch,
  component: RouteComponent,
});
