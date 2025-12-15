import { Icons } from "@/components";
import { useTranslation } from "@/i18n";
import type { Clinic } from "@/types";
import { buildFullAddress, buildMapsUrl } from "@/utils";

type ProviderLocationsProps = {
  locations: Clinic[];
};

export const ProviderLocations = ({ locations }: ProviderLocationsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 pt-6">
      <h3 className="text-lg font-medium text-text-primary">{t("provider.locations")}</h3>

      <ul className="space-y-3">
        {locations.map((location) => {
          const fullAddress = buildFullAddress(location);
          const mapsUrl = buildMapsUrl(fullAddress);

          return (
            <li className="space-y-3 rounded-xl border border-border-default p-5" key={location.id}>
              <h4 className="text-md font-medium text-text-primary">{location.name}</h4>

              <div className="space-y-1 leading-6 font-light text-text-secondary">
                <p>{location.address}</p>
                <p>
                  {location.city}, {location.state} {location.zip_code}
                </p>
                <p>{location.phone}</p>
              </div>

              {mapsUrl ? (
                <a
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border-default py-2.5 font-medium text-text-primary"
                  href={mapsUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icons.LocationPin className="size-8.5 lg:size-10" />
                  {t("provider.viewOnMaps")}
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
