import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { EmptyState, ErrorComponent } from "@/components";
import { useDebounce, useProviders } from "@/hooks";
import { useTranslation } from "@/i18n";
import { initialProviderFilters, type ProviderFilters } from "@/services";
import type { Provider } from "@/types";
import { Route } from "../../page";
import { SearchFilters } from "../-filters";
import { ProviderCard, ProviderCardSkeleton, ProviderDetailsModal } from "..";

export const ProvidersListing = () => {
  const [selectedProviderId, setSelectedProviderId] = useState<Provider["id"] | null>(null);
  const { t } = useTranslation();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const filters: ProviderFilters = {
    specialtyId: search.specialtyId != null ? String(search.specialtyId) : null,
    clinicId: search.clinicId != null ? String(search.clinicId) : null,
    gender: search.gender,
  };

  const searchTerm = search.q;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const providersQuery = useProviders(filters, debouncedSearchTerm);

  const optionsQuery = useProviders(initialProviderFilters, "");

  const { hasMore, isLoadingMore, loadMore } = providersQuery;

  const onSearchChange = useCallback(
    (q: string) => {
      navigate({
        search: (prev) => {
          return { ...prev, q, page: 1 };
        },
        replace: true,
      });
    },
    [navigate],
  );

  const onFiltersChange = useCallback(
    (next: ProviderFilters) => {
      navigate({
        search: (prev) => {
          return {
            ...prev,
            specialtyId: next.specialtyId ? Number(next.specialtyId) : null,
            clinicId: next.clinicId ? Number(next.clinicId) : null,
            gender: next.gender,
            page: 1,
          };
        },
        replace: true,
      });
    },
    [navigate],
  );

  const { error, isLoading, refetch, visibleProviders } = providersQuery;

  const optionProviders = optionsQuery.providers;

  const selectedProvider = useMemo(() => {
    return (
      visibleProviders.find(({ id }) => {
        return id === selectedProviderId;
      }) ?? null
    );
  }, [visibleProviders, selectedProviderId]);

  useEffect(() => {
    const el = loadMoreRef.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (!first?.isIntersecting) {
        return;
      }
      if (isLoadingMore) {
        return;
      }
      if (!hasMore) {
        return;
      }

      loadMore();
    });

    observer.observe(el);

    return () => {
      return observer.disconnect();
    };
  }, [hasMore, isLoadingMore, loadMore, visibleProviders.length]);

  if (isLoading) {
    return (
      <>
        <SearchFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          onSearchChange={onSearchChange}
          providers={optionProviders}
          resultsCount={undefined}
          searchTerm={searchTerm}
        />

        <div className="grid w-full grid-cols-1 gap-3 px-6 lg:grid-cols-3 lg:gap-4 lg:px-44">
          {Array.from({ length: 6 }).map((_, idx) => {
            return <ProviderCardSkeleton key={idx} />;
          })}
        </div>
      </>
    );
  }

  if (error) {
    return <ErrorComponent error={error} fetchData={refetch} />;
  }

  return (
    <>
      <SearchFilters
        filters={filters}
        onFiltersChange={onFiltersChange}
        onSearchChange={onSearchChange}
        providers={optionProviders}
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

      <div className="h-30 w-full" ref={loadMoreRef} />

      {isLoadingMore ? (
        <div className="px-6 py-6 text-center text-sm text-text-tertiary">
          {t("provider.loadMore")}
        </div>
      ) : null}

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
