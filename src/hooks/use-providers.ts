import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { providersKeys } from "@/queries/providers.keys";
import type { ProviderFilters } from "@/services";
import { getProviders, getVisibleProviders } from "@/services";
import type { Provider } from "@/types";

export const useProviders = (filters: ProviderFilters, searchTerm: string) => {
  const query = useInfiniteQuery({
    queryKey: providersKeys.list(filters),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return getProviders(filters, pageParam);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta.current_page < lastPage.meta.last_page
        ? lastPage.meta.current_page + 1
        : undefined;
    },
    staleTime: 30000,
  });

  const providers = useMemo<Provider[]>(() => {
    return (
      query.data?.pages.flatMap((p) => {
        return p.data;
      }) ?? []
    );
  }, [query.data]);

  const visibleProviders = useMemo(() => {
    return getVisibleProviders(providers, searchTerm);
  }, [providers, searchTerm]);

  return {
    providers,
    visibleProviders,
    isLoading: query.isLoading,
    error: query.error ? "There was a problem loading providers. Please try again." : null,
    refetch: query.refetch,
    loadMore: query.fetchNextPage,
    isLoadingMore: query.isFetchingNextPage,
    hasMore: query.hasNextPage,
  };
};
