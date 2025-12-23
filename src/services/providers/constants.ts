export const GENDERS = ["male", "female", "other"] as const;

export const GENDER_OPTIONS = GENDERS.map((g) => {
  return {
    label: g,
    value: g,
  };
});

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
