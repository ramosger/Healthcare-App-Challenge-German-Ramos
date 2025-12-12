import type { DropdownOption, Provider } from "@/types";

export type ProviderFilterOptions = {
  specialtyOptions: DropdownOption[];
  clinicOptions: DropdownOption[];
};

export type ProviderFilters = {
  specialtyId: string | null;
  clinicId: string | null;
  gender: string | null;
};

export const initialProviderFilters: ProviderFilters = {
  specialtyId: null,
  clinicId: null,
  gender: null,
};

export const hasActiveProviderFilters = (filters: ProviderFilters): boolean => {
  return filters.specialtyId !== null || filters.clinicId !== null || filters.gender !== null;
};

export const getVisibleProviders = (filteredProviders: Provider[], searchTerm: string) => {
  const term = searchTerm.trim().toLowerCase();
  if (!term) {
    return filteredProviders;
  }

  return filteredProviders.filter((p) => {
    return p.name.toLowerCase().includes(term);
  });
};
