import type { ProviderClinics } from "@/types";

export const buildMapsUrl = (fullAddress: string): string => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
};

export const buildFullAddress = (location: ProviderClinics): string => {
  const { address, city, state, zip_code } = location;

  return [address, city, state, zip_code].join(", ").trim();
};
