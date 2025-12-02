import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { RegisterSuccess } from "./-components/register-success";
import { RegisterForm } from "./-components";

const RegisterPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <RegisterSuccess />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-auth px-6 pt-16 pb-10 lg:justify-center">
      <div className="w-full max-w-sm rounded-xl border border-border-default bg-background-default-default px-6 py-8 shadow-sm lg:max-w-md lg:rounded-2xl lg:px-10 lg:py-10 lg:shadow-md">
        <RegisterForm
          onSuccess={() => {
            return setIsSuccess(true);
          }}
        />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(public)/_guest/register/")({
  component: RegisterPage,
});
