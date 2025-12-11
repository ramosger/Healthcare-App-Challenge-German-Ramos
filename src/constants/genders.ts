export const GENDERS = ["male", "female", "other"] as const;

export const GENDER_OPTIONS = GENDERS.map((g) => {
  return {
    label: g.charAt(0).toUpperCase() + g.slice(1),
    value: g,
  };
});
