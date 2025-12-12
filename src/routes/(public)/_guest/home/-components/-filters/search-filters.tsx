import { useMemo } from "react";

import { GENDER_OPTIONS, PROVIDER_FILTER_KEYS } from "@/constants";
import { useTranslation } from "@/i18n";
import { buildProviderFilterOptions, type ProviderFilters } from "@/services";
import type { Provider } from "@/types";
import { FilterDropdown, NameFilter, SearchFiltersHeader } from "..";

type SearchFiltersProps = {
  resultsCount: number;
  providers: Provider[];
  filters: ProviderFilters;
  onFiltersChange: (f: ProviderFilters) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export const SearchFilters = ({
  filters,
  onFiltersChange,
  onSearchChange,
  providers,
  resultsCount,
  searchTerm,
}: SearchFiltersProps) => {
  const { clinicOptions, specialtyOptions } = useMemo(() => {
    return buildProviderFilterOptions(providers);
  }, [providers]);

  const { t } = useTranslation();

  const createFilterChangeHandler = (key: keyof ProviderFilters) => {
    return (value: string | null) => {
      onFiltersChange({
        ...filters,
        [key]: value,
      });
    };
  };

  const providerLabel = resultsCount === 1 ? "provider" : "providers";

  return (
    <section className="mt-22 inline-flex w-full flex-col items-start justify-start gap-4 self-stretch px-6 py-3 lg:gap-7 lg:px-44 lg:pt-6 lg:pb-3">
      <SearchFiltersHeader />

      <div className="inline-flex flex-col items-start justify-start gap-5 self-stretch">
        <NameFilter onChange={onSearchChange} value={searchTerm} />

        <div className="inline-flex flex-col items-start justify-center gap-3 self-stretch lg:flex-row lg:justify-start">
          <FilterDropdown
            onChange={createFilterChangeHandler(PROVIDER_FILTER_KEYS.SPECIALTY)}
            options={specialtyOptions}
            placeholder="All specialties"
            value={filters.specialtyId}
          />

          <FilterDropdown
            onChange={createFilterChangeHandler(PROVIDER_FILTER_KEYS.GENDER)}
            options={GENDER_OPTIONS}
            placeholder="All genders"
            value={filters.gender}
          />

          <FilterDropdown
            onChange={createFilterChangeHandler(PROVIDER_FILTER_KEYS.CLINIC)}
            options={clinicOptions}
            placeholder="All clinics"
            value={filters.clinicId}
          />
        </div>
      </div>

      <p className="justify-start self-stretch text-base leading-6 font-medium text-text-secondary">
        {resultsCount} {providerLabel} {t("searchFilters.found")}
      </p>
    </section>
  );
};
