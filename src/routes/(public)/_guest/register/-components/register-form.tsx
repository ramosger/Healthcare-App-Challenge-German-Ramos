import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "@tanstack/react-router";

import { Button, ErrorMessage, Input, Label, PasswordInput, toast } from "@/components";
import { Trans, useTranslation } from "@/i18n";
import { getRegisterRequestSchema, type RegisterRequest, useRegisterMutation } from "@/services";
import { handleAxiosFieldErrors } from "@/utils";

export const RegisterForm = () => {
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);

  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(getRegisterRequestSchema()),
  });

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    registerMutation.mutate(data, {
      onSuccess: async () => {
        toast.success(t("register.success"));
        setIsSuccess(true);
      },
      onError: (error) => {
        handleAxiosFieldErrors<RegisterRequest>(error, setError, t("register.error"));
      },
    });
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-border-default bg-background-default-default px-6 py-8 shadow-sm lg:max-w-md lg:rounded-2xl lg:px-10 lg:py-10 lg:shadow-md">
      {isSuccess ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-background-brand-success flex h-12 w-12 items-center justify-center rounded-full">
            <Icon
              height="1024"
              icon="ep:success-filled"
              style={{ color: "#22C55E" }}
              width="1024"
            />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-text-default">{t("register.allSet")}</h1>
            <p className="pt-1 text-sm text-text-default-secondary">{t("register.success")}</p>
          </div>

          <Button
            className="h-10 rounded-md bg-background-brand-default px-4 py-2 pt-4 text-sm font-medium text-text-neutral-on-neutral"
            onClick={() => {
              navigate({ to: "/login" });
            }}
            type="button"
          >
            {t("register.redirectToLogin")}
          </Button>
        </div>
      ) : (
        <>
          <div className="pb-6">
            <h1 className="text-3xl font-normal tracking-tight text-text-default">
              {t("register.createAccount")}
            </h1>
            <p className="text-md pt-2 font-normal text-text-default-secondary">
              {t("register.subtitle")}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-normal" htmlFor="fullName">
                {t("form.fullName")}
              </Label>

              <Input
                {...register("fullName")}
                className={`h-11 rounded-md bg-background-default-default text-sm ${
                  errors.fullName
                    ? "border-border-danger-tertiary text-icon-danger-default focus:border-border-danger-tertiary focus:ring-0 focus-visible:border-border-danger-tertiary focus-visible:ring-0"
                    : "border-border-default text-text-default"
                }`}
                placeholder={t("form.fullName")}
              />

              <ErrorMessage errorMessage={errors?.fullName?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-normal" htmlFor="email">
                {t("form.email")}
              </Label>

              <Input
                {...register("email")}
                className={`h-11 rounded-md bg-background-default-default text-sm ${
                  errors.email
                    ? "border-border-danger-tertiary text-icon-danger-default focus:border-border-danger-tertiary focus:ring-0 focus-visible:border-border-danger-tertiary focus-visible:ring-0"
                    : "border-border-default text-text-default"
                }`}
                placeholder={t("form.email")}
              />

              <ErrorMessage errorMessage={errors?.email?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-normal" htmlFor="password">
                {t("form.password")}
              </Label>

              <PasswordInput
                {...register("password")}
                className={`h-11 rounded-md bg-background-default-default text-sm ${
                  errors.password
                    ? "border-border-danger-tertiary text-icon-danger-default focus:border-border-danger-tertiary focus:ring-0 focus-visible:border-border-danger-tertiary focus-visible:ring-0"
                    : "border-border-default text-text-default"
                }`}
                placeholder={t("form.password")}
              />

              <ErrorMessage errorMessage={errors?.password?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-normal" htmlFor="confirmPassword">
                {t("form.confirmPassword")}
              </Label>

              <PasswordInput
                {...register("confirmPassword")}
                className={`h-11 rounded-md bg-background-default-default text-sm ${
                  errors.confirmPassword
                    ? "border-border-danger-tertiary text-icon-danger-default focus:border-border-danger-tertiary focus:ring-0 focus-visible:border-border-danger-tertiary focus-visible:ring-0"
                    : "border-border-default text-text-default"
                }`}
                placeholder={t("form.confirmPassword")}
              />

              <ErrorMessage errorMessage={errors?.confirmPassword?.message} />
            </div>

            <Button
              className="text-md flex h-10 w-full items-center justify-center gap-2 rounded-md bg-background-brand-default px-3 py-2 font-medium text-text-neutral-on-neutral"
              disabled={!isValid || registerMutation.isPending}
              type="submit"
            >
              {registerMutation.isPending ? (
                <Icon
                  className="size-5 animate-spin text-text-default-secondary"
                  icon="eos-icons:loading"
                />
              ) : null}
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
        </>
      )}
    </div>
  );
};
