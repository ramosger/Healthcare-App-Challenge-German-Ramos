import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useRouter, useSearch } from "@tanstack/react-router";

import { Button, ErrorMessage, Input, Label, PasswordInput, toast } from "@/components";
import { Trans, useTranslation } from "@/i18n";
import { getLoginRequestSchema, type LoginRequest, useLoginMutation } from "@/services";
import { setAuthStoreToken } from "@/stores";
import { handleAxiosFieldErrors } from "@/utils";

export const RegisterForm = () => {
  const { t } = useTranslation();

  const loginMutation = useLoginMutation();

  const router = useRouter();
  const search = useSearch({ from: "/(public)/_guest/register/" });
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(getLoginRequestSchema()),
  });

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: async ({ data: { authToken } }) => {
        toast.success(t("login.success"));
        setAuthStoreToken(authToken);
        await router.invalidate();
        await navigate({ to: search.redirect || "/" });
      },
      onError: (error) => {
        handleAxiosFieldErrors<LoginRequest>(error, setError, t("login.error"));
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm rounded-xl border border-border-default bg-background-default-default px-6 py-8 shadow-sm sm:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-normal tracking-tight text-text-default">
            {t("register.createAccount")}
          </h1>
          <p className="text-md pt-2 font-normal text-text-default-secondary">
            {t("register.subtitle")}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal text-text-default" htmlFor="fullName">
              {t("form.fullName")}
            </Label>

            <Input
              {...register("fullName")}
              className="h-11 rounded-md border-border-default bg-background-default-default text-sm"
              placeholder={t("form.fullName")}
            />

            <ErrorMessage errorMessage={errors?.fullName?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal text-text-default" htmlFor="email">
              {t("form.email")}
            </Label>

            <Input
              {...register("email")}
              className="h-11 rounded-md border-border-default bg-background-default-default text-sm"
              placeholder={t("form.email")}
            />

            <ErrorMessage errorMessage={errors?.email?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal text-text-default" htmlFor="password">
              {t("form.password")}
            </Label>

            <PasswordInput
              {...register("password")}
              className="h-11 rounded-md border-border-default bg-background-default-default text-sm"
              placeholder={t("form.password")}
            />

            <ErrorMessage errorMessage={errors?.password?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal text-text-default" htmlFor="password">
              {t("form.confirmPassword")}
            </Label>

            <PasswordInput
              {...register("password")}
              className="h-11 rounded-md border-border-default bg-background-default-default text-sm"
              placeholder={t("form.confirmPassword")}
            />

            <ErrorMessage errorMessage={errors?.password?.message} />
          </div>

          <Button
            className="text-md h-10 w-full rounded-md bg-background-brand-default px-3 py-2 font-medium text-text-neutral-on-neutral"
            type="submit"
          >
            {t("register.createAccount")}
          </Button>

          <p className="pt-2 text-center text-sm">
            <Trans
              components={{
                Link: (
                  <Link
                    className="font-medium text-text-default-secondary underline underline-offset-3 hover:opacity-80"
                    to="/login"
                  />
                ),
              }}
              i18nKey="register.withAccount"
            />
          </p>
        </form>
      </div>
    </div>
  );
};
