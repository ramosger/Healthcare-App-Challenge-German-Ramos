import { createFileRoute } from "@tanstack/react-router";

import { LoginForm } from "./-components";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-auth px-6 py-10">
      <div className="w-full max-w-sm rounded-xl border border-border-default bg-background-default-default px-6 py-8 shadow-sm lg:max-w-lg lg:rounded-2xl lg:px-10 lg:py-10 lg:shadow-md">
        <LoginForm />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/(public)/_guest/login/")({ component: LoginPage });
