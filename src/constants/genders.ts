export const GENDERS = ["male", "female", "other"] as const;

export const GENDER_OPTIONS = GENDERS.map((g) => {
  return {
    label: g,
    value: g,
  };
});
