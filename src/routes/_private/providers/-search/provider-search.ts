export type ProvidersSearch = {
  q: string;
  specialtyId: string | null;
  clinicId: string | null;
  gender: string | null;
  page: number;
};

const parseMaybeJsonString = (v: string): string => {
  try {
    const parsed = JSON.parse(v);

    return typeof parsed === "string" ? parsed : v;
  } catch {
    return v;
  }
};

export const parseNullableString = (v: unknown): string | null => {
  if (v == null) {
    return null;
  }

  if (typeof v === "number" && Number.isFinite(v)) {
    return String(v);
  }

  if (typeof v !== "string") {
    return null;
  }

  const raw = parseMaybeJsonString(v).trim();

  if (!raw) {
    return null;
  }

  const lower = raw.toLowerCase();
  if (lower === "null" || lower === "undefined") {
    return null;
  }

  return raw;
};

export const parseString = (v: unknown): string => {
  if (typeof v !== "string") {
    return "";
  }

  return parseMaybeJsonString(v);
};

export const parsePage = (v: unknown): number => {
  let n = 1;

  if (typeof v === "string") {
    n = Number(parseMaybeJsonString(v));
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
