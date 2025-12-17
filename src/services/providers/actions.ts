import type { DropdownOption, Provider } from "@/types";
import type { ProviderFilterOptions, ProviderFilters } from "./types";

export const buildProviderFilterOptions = (providers: Provider[]): ProviderFilterOptions => {
  const specialtiesMap = new Map<string, { id: string; name: string }>();
  const clinicsMap = new Map<string, { id: string; name: string }>();

  providers.forEach((p) => {
    if (p.specialty) {
      const specialtyId = String(p.specialty.id);

      specialtiesMap.set(specialtyId, {
        id: specialtyId,
        name: p.specialty.name,
      });
    }

    p.clinics.forEach((c) => {
      const clinicId = String(c.id);

      clinicsMap.set(clinicId, {
        id: clinicId,
        name: c.name,
      });
    });
  });

  const specialtyOptions: DropdownOption[] = Array.from(specialtiesMap.values())
    .map((s) => {
      return {
        label: s.name,
        value: s.id,
      };
    })
    .sort((a, b) => {
      return a.label.localeCompare(b.label);
    });

  const clinicOptions: DropdownOption[] = Array.from(clinicsMap.values())
    .map((c) => {
      return {
        label: c.name,
        value: c.id,
      };
    })
    .sort((a, b) => {
      return a.label.localeCompare(b.label);
    });

  return { specialtyOptions, clinicOptions };
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
