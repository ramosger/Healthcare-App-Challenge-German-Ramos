import { createFileRoute } from "@tanstack/react-router";

import { RegisterForm } from "./-components";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-auth px-6 pt-16 pb-10 lg:justify-center">
      <RegisterForm />
    </div>
  );
};

export const Route = createFileRoute("/(public)/_guest/register/")({
  component: RegisterPage,
});
