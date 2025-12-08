import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components";
import { useTranslation } from "@/i18n";

export const RegisterSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-linear-to-b from-green-50 to-background-success-secondary px-4 lg:px-0">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="check-circle flex size-20 items-center justify-center rounded-full">
          <Icon
            className="text-text-success-tertiary duration-500 animate-in fade-in-0 slide-in-from-left-4"
            height="1024"
            icon="ep:success-filled"
            width="1024"
          />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-medium text-text-default">{t("register.allSet")}</h1>
          <p className="text-md font-normal text-text-default">{t("register.success")}</p>
        </div>

        <div className="fixed bottom-10 left-0 flex w-full justify-center px-4 lg:static lg:bottom-auto lg:left-auto lg:px-0 lg:pt-24">
          <Button
            className="text-md h-10 w-full max-w-md rounded-md bg-background-brand-default px-3 py-2 font-medium text-text-neutral-on-neutral"
            onClick={() => {
              return navigate({ to: "/login" });
            }}
            type="button"
          >
            {t("register.redirectToLogin")}
          </Button>
        </div>
      </div>
    </div>
  );
};
