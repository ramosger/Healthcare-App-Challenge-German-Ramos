import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";

import { Button, ErrorMessage, Input, Label, PasswordInput } from "@/components";
import { Trans, useTranslation } from "@/i18n";
import { getRegisterRequestSchema, type RegisterRequest, useRegisterMutation } from "@/services";
import { handleAxiosFieldErrors } from "@/utils";

type RegisterFormProps = {
  onSuccess?: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { t } = useTranslation();

  const registerMutation = useRegisterMutation();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterRequest>({
    mode: "onTouched",
    resolver: zodResolver(getRegisterRequestSchema()),
  });

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    registerMutation.mutate(data, {
      onSuccess: async () => {
        onSuccess?.();
      },
      onError: (error) => {
        handleAxiosFieldErrors<RegisterRequest>(error, setError, t("register.error"));
      },
    });
  };

  return (
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
  );
};
