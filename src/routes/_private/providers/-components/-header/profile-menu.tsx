import { useEffect, useState } from "react";

import { Icons } from "@/components";
import { useTranslation } from "@/i18n";

type ProfileMenuProps = {
  name: string;
  email: string;
  initials: string;
  onLogout?: () => void;
};

export const ProfileMenu = ({ email, initials, name, onLogout }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#profile-menu")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      return document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="relative size-8 cursor-pointer overflow-hidden rounded-full bg-background-brand-default font-light text-white lg:size-10"
        onClick={() => {
          setIsOpen((prev) => {
            return !prev;
          });
        }}
        type="button"
      >
        {initials}
      </button>

      {isOpen ? (
        <div className="absolute top-0 right-0 z-100 pt-10 lg:pt-12" id="profile-menu">
          <div className="inline-flex w-56 flex-col items-start justify-start rounded-md bg-background-surface p-2 shadow-[0px_1px_4px_0px_rgba(14,16,23,0.10)] outline-1 -outline-offset-1 outline-border-default">
            <div className="inline-flex flex-col items-start justify-start gap-2.5 self-stretch border-b border-border-default p-2">
              <p className="justify-start self-stretch text-sm leading-5 font-medium text-text-primary">
                {name}
              </p>
              <p className="justify-start self-stretch text-xs leading-4 font-normal text-text-secondary">
                {email}
              </p>
            </div>

            <button
              className="inline-flex cursor-pointer items-center justify-start gap-1 self-stretch rounded-lg p-2"
              onClick={() => {
                setIsOpen(false);
                onLogout?.();
              }}
              type="button"
            >
              <Icons.Logout />

              <p className="line-clamp-1 justify-start self-stretch text-sm leading-5 font-normal text-text-primary">
                {t("logout.logOut")}
              </p>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
