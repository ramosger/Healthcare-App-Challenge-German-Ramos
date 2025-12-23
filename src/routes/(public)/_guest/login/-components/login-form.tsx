import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";

import { Button, ErrorMessage, Input, Label, PasswordInput } from "@/components";
import { Trans, useTranslation } from "@/i18n";
import { getLoginSchema, type LoginPayload, useLogin } from "@/services";
import { setAuthStoreToken } from "@/stores";
import { getLoggedUserStoreUser, setLoggedUserStoreUser } from "@/stores";
import { getInitials } from "@/utils";

const baseInputClasses =
  "h-11 rounded-md bg-background-default-default text-sm placeholder:text-text-default";

const errorInputClasses =
  "border-border-danger-tertiary text-icon-danger-default focus:border-border-danger-tertiary focus:ring-0 focus-visible:border-border-danger-tertiary focus-visible:ring-0";

const normalInputClasses = "border-border-default text-text-default";

export const LoginForm = () => {
  const { t } = useTranslation();

  const { isPending: isLoginPending, mutate: loginUser } = useLogin();

  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginPayload>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(getLoginSchema()),
  });

  const onSubmit: SubmitHandler<LoginPayload> = (payload) => {
    loginUser(payload, {
      onSuccess: async ({ data }) => {
        const email = payload.email.trim();

        const existingUser = getLoggedUserStoreUser();
        const name =
          existingUser?.email?.toLowerCase() === email.toLowerCase() ? existingUser.name : "";

        const initials = getInitials(name, email);

        setAuthStoreToken(data.data.accessToken);
        setLoggedUserStoreUser({ email, name, initials });

        await navigate({
          to: "/providers",
          search: {
            q: "",
            specialtyId: null,
            clinicId: null,
            gender: null,
            page: 1,
          },
          replace: true,
        });
      },
      onError: () => {
        setError("password", {
          type: "manual",
          message: t("login.invalidCredentials"),
        });
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 pb-6">
        <h1 className="text-3xl font-normal tracking-tight text-text-default">
          {t("login.title")}
        </h1>

        <p className="text-md font-normal text-text-default-secondary">{t("login.subtitle")}</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-normal" htmlFor="email">
            {t("form.email")}
          </Label>

          <Input
            {...register("email")}
            className={twMerge(
              baseInputClasses,
              errors.email ? errorInputClasses : normalInputClasses,
            )}
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
            className={twMerge(
              baseInputClasses,
              errors.password ? errorInputClasses : normalInputClasses,
            )}
            placeholder={t("form.password")}
          />

          <ErrorMessage errorMessage={errors?.password?.message} />
        </div>

        <Button
          aria-busy={isLoginPending}
          className="text-md flex h-10 w-full items-center justify-center gap-2 rounded-md bg-background-brand-default px-3 py-2 font-medium text-text-neutral-on-neutral"
          data-loading={isLoginPending}
          disabled={isLoginPending}
          type="submit"
        >
          {isLoginPending ? (
            <Icon
              className="size-5 animate-spin text-text-default-secondary"
              icon="eos-icons:loading"
            />
          ) : null}
          {t("login.login")}
        </Button>

        <div className="pt-2 text-center text-sm">
          <Trans
            components={{
              Link: (
                <Link
                  className="font-medium text-text-default-secondary underline underline-offset-3 hover:opacity-80"
                  to="/register"
                />
              ),
            }}
            i18nKey="login.noAccount"
          />
        </div>
      </form>
    </>
  );
};
