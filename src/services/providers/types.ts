import type { DropdownOption } from "@/types";

export type ProviderFilterOptions = {
  specialtyOptions: DropdownOption[];
  clinicOptions: DropdownOption[];
};

export type ProviderFilters = {
  specialtyId: string | null;
  clinicId: string | null;
  gender: string | null;
};
