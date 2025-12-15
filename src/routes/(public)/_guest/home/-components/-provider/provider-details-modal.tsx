import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Icons } from "@/components";
import { useTranslation } from "@/i18n";
import { DETAIL_TABS, type DetailTab } from "@/services";
import type { Provider } from "@/types";
import { buildMediaUrl } from "@/utils";
import { ProviderLocations, ProviderOverview } from "..";

type ProviderDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
};

export const ProviderDetailsModal = ({ isOpen, onClose, provider }: ProviderDetailsModalProps) => {
  const [tab, setTab] = useState<DetailTab>(DETAIL_TABS.OVERVIEW);
  const baseTabClasses =
    "flex-1 cursor-pointer py-2 text-sm font-light rounded-full inline-flex items-center justify-center gap-2 transition";

  const { about, email, languages, name, phone, profilePic, specialty } = provider;
  const { t } = useTranslation();
  const profileImage = buildMediaUrl(profilePic);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-50 flex max-h-[624px] w-[90%] max-w-lg flex-col rounded-2xl border border-border-default bg-background-surface p-6 shadow-xl lg:max-h-[546px] lg:w-full lg:max-w-xl">
        <div className="cursor-pointer">
          <Icons.Close className="size-8.5 lg:size-10" onClose={onClose} />
        </div>

        <div className="flex items-center gap-4 pb-4">
          <img alt={name} className="size-20 rounded-lg object-cover" src={profileImage} />

          <div>
            <h2 className="text-2xl font-semibold text-text-primary">{name}</h2>
            <p className="text-xl font-medium text-text-secondary">{specialty.name}</p>
          </div>
        </div>

        <div className="bg-background-tertiary rounded-full">
          <div className="bg-background-default flex rounded-full p-1">
            <button
              className={twMerge(
                baseTabClasses,
                tab === DETAIL_TABS.OVERVIEW
                  ? "bg-background-brand text-white"
                  : "bg-background-tertiary text-text-primary",
              )}
              onClick={() => {
                return setTab(DETAIL_TABS.OVERVIEW);
              }}
            >
              <Icons.User className="size-8.5 lg:size-10" />
              {t("provider.details.subtitle")}
            </button>

            <button
              className={twMerge(
                baseTabClasses,
                tab === DETAIL_TABS.LOCATIONS
                  ? "bg-background-brand text-white"
                  : "bg-background-tertiary text-text-primary",
              )}
              onClick={() => {
                return setTab(DETAIL_TABS.LOCATIONS);
              }}
            >
              <Icons.LocationPin className="size-8.5 lg:size-10" />
              {t("provider.locations")}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {tab === DETAIL_TABS.OVERVIEW && (
            <ProviderOverview about={about} email={email} languages={languages} phone={phone} />
          )}

          {tab === DETAIL_TABS.LOCATIONS && <ProviderLocations locations={provider.clinics} />}
        </div>
      </div>
    </div>
  );
};
