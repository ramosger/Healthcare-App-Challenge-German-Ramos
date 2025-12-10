import { Icons } from "@/components";
import { useTranslation } from "@/i18n";
import { ProfileMenu } from "./profile-menu";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 z-50 inline-flex w-full items-center justify-between border-b border-border-default-default bg-white p-6 lg:px-44 lg:py-6">
      <div className="relative h-10 w-60 lg:h-11 lg:w-72">
        <div className="absolute top-0 left-0 inline-flex size-10 items-center justify-start gap-2 rounded-lg p-2 lg:size-12 lg:gap-2.5 lg:rounded-xl lg:p-2.5">
          <div className="flex items-center justify-start gap-2">
            <Icons.Logo className="size-8.5 lg:size-10" />
          </div>
        </div>

        <div className="absolute top-[1.60px] left-[49.96px] inline-flex h-9 w-48 flex-col items-start justify-start gap-2 lg:top-[1.92px] lg:left-[60.14px] lg:h-10 lg:w-56 lg:gap-2.5">
          <h2 className="h-3.5 w-36 text-lg leading-tight font-semibold text-text-primary lg:h-4 lg:w-40 lg:text-2xl">
            {t("header.title")}
          </h2>
          <p className="h-3 w-44 text-xs leading-tight font-light text-text-secondary lg:h-3.5 lg:w-52 lg:text-sm">
            {t("header.subtitle")}
          </p>
        </div>
      </div>

      <ProfileMenu
        email="adamsmith@gmail.com"
        initials="AS"
        name="Adam Smith"
        onLogout={() => {}}
      />
    </header>
  );
};
