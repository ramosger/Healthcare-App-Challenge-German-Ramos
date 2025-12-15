import { useMemo, useState } from "react";

import { ErrorComponent, Spinner } from "@/components";
import { EmptyState } from "@/components";
import { useProviders } from "@/hooks";
import { useTranslation } from "@/i18n";
import { initialProviderFilters, type ProviderFilters } from "@/services";
import type { Provider } from "@/types";
import { SearchFilters } from "../-filters";
import { ProviderCard, ProviderDetailsModal } from "..";

export const ProvidersListing = () => {
  const [filters, setFilters] = useState<ProviderFilters>(initialProviderFilters);
  const [selectedProviderId, setSelectedProviderId] = useState<Provider["id"] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const { error, isLoading, providers, refetch, visibleProviders } = useProviders(
    filters,
    searchTerm,
  );

  const selectedProvider = useMemo(() => {
    return (
      visibleProviders.find(({ id }) => {
        return id === selectedProviderId;
      }) ?? null
    );
  }, [visibleProviders, selectedProviderId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-110">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorComponent error={error} fetchData={refetch} />;
  }

  return (
    <>
      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
        onSearchChange={setSearchTerm}
        providers={providers}
        resultsCount={visibleProviders.length}
        searchTerm={searchTerm}
      />

      {visibleProviders.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center px-6 text-center">
          <div className="flex size-50 items-center justify-center">
            <EmptyState />
          </div>

          <p className="text-base leading-6 font-medium text-text-tertiary">
            {t("provider.notFound")}
            <br />
            {t("provider.adjustFilters")}
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-3 px-6 lg:grid-cols-3 lg:gap-4 lg:px-44">
          {visibleProviders.map((provider) => {
            return (
              <ProviderCard
                key={provider.id}
                onViewDetails={() => {
                  return setSelectedProviderId(provider.id);
                }}
                provider={provider}
              />
            );
          })}
        </div>
      )}

      {selectedProvider ? (
        <ProviderDetailsModal
          onClose={() => {
            return setSelectedProviderId(null);
          }}
          provider={selectedProvider}
          isOpen
        />
      ) : null}
    </>
  );
};
