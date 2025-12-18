import type { DropdownOption } from "@/types";

export type ProviderFilterOptions = {
  specialtyOptions: DropdownOption[];
  clinicOptions: DropdownOption[];
};

export type ProviderFilters = {
  specialtyId: number | null;
  clinicId: number | null;
  gender: string | null;
};
