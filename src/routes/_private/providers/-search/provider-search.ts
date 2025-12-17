export type ProvidersSearch = {
  q: string;
  specialtyId: string | null;
  clinicId: string | null;
  gender: string | null;
  page: number;
};

export const parseNullableString = (v: unknown): string | null => {
  if (typeof v === "number" && Number.isFinite(v)) {
    return String(v);
  }
  if (typeof v === "string" && v.trim() !== "") {
    return v;
  }

  return null;
};

export const parseString = (v: unknown): string => {
  return typeof v === "string" ? v : "";
};

export const parsePage = (v: unknown): number => {
  let n = 1;

  if (typeof v === "string") {
    n = Number(v);
  } else if (typeof v === "number") {
    n = v;
  }

  if (!Number.isFinite(n) || n <= 0) {
    return 1;
  }

  return Math.floor(n);
};

export const validateProvidersSearch = (search: Record<string, unknown>): ProvidersSearch => {
  return {
    q: parseString(search.q),
    specialtyId: parseNullableString(search.specialtyId),
    clinicId: parseNullableString(search.clinicId),
    gender: parseNullableString(search.gender),
    page: parsePage(search.page),
  };
};
