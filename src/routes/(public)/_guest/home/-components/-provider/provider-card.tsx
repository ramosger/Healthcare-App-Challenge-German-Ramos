import { Icons } from "@/components";
import { useTranslation } from "@/i18n";
import type { Provider } from "@/types";
import { buildMediaUrl } from "@/utils";

type ProviderCardProps = {
  provider: Provider;
  onViewDetails?: () => void;
};

export const ProviderCard = ({ onViewDetails, provider }: ProviderCardProps) => {
  const { clinics, name, profilePic, specialty } = provider;
  const { t } = useTranslation();

  const primaryClinic = clinics[0];
  const primaryLocation = primaryClinic?.name ?? primaryClinic?.address ?? "No main location";
  const profileImage = buildMediaUrl(profilePic);

  const extraLocationsCount = clinics.length > 1 ? clinics.length - 1 : 0;
  const extraLocationsLabel =
    extraLocationsCount > 0
      ? `+ ${extraLocationsCount} more ${extraLocationsCount === 1 ? "location" : "locations"}`
      : null;

  return (
    <div className="flex flex-col self-stretch overflow-hidden rounded-xl bg-background-surface outline-1 outline-border-default">
      <img alt={name} className="h-56 w-full object-cover" src={profileImage} />

      <div className="flex flex-1 flex-col justify-between gap-3 p-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-text-primary">{name}</h2>
            <p className="text-xl font-medium text-text-secondary">{specialty.name}</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-1">
              <Icons.LocationPin className="size-6" />
              <span className="text-base leading-6 font-medium text-text-secondary">
                {primaryLocation}
              </span>
            </div>

            {extraLocationsLabel ? (
              <div className="pl-7">
                <span className="text-base leading-6 font-medium text-text-secondary">
                  {extraLocationsLabel}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <button
          className="w-full cursor-pointer rounded-md bg-background-brand-default py-2 text-base leading-6 font-medium text-text-neutral-on-neutral"
          onClick={onViewDetails}
          type="button"
        >
          {t("provider.details.title")}
        </button>
      </div>
    </div>
  );
};
