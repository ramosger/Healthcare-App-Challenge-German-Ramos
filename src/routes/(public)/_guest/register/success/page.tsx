import { createFileRoute } from "@tanstack/react-router";

import { RegisterSuccess } from "../-components";

const RegisterSuccessPage = () => {
  return <RegisterSuccess />;
};

export const Route = createFileRoute("/(public)/_guest/register/success/")({
  component: RegisterSuccessPage,
});
