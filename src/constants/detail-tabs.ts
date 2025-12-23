export const DETAIL_TABS = {
  OVERVIEW: "overview",
  LOCATIONS: "locations",
} as const;

export type DetailTab = (typeof DETAIL_TABS)[keyof typeof DETAIL_TABS];

export const PROVIDER_FILTER_KEYS = {
  SPECIALTY: "specialtyId",
  CLINIC: "clinicId",
  GENDER: "gender",
} as const;
