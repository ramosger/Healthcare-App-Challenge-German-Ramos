import { createFileRoute } from "@tanstack/react-router";

import { RegisterForm } from "./-components";

const RegisterPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-auth">
      <div className="w-96 rounded-2xl p-3 shadow">
        <RegisterForm />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(public)/_guest/register/")({
  component: RegisterPage,
});
