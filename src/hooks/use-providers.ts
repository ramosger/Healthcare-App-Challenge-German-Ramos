import { useCallback, useEffect, useMemo, useState } from "react";

import type { ProviderFilters } from "@/services";
import { getProviders, getVisibleProviders } from "@/services";
import type { Provider } from "@/types";

export const useProviders = (filters: ProviderFilters, searchTerm: string) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProviders = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getProviders(filters);

      setProviders(data);
      setError(null);
    } catch (err) {
      setError(`There was a problem loading providers. Please try again. - (${err})`);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  const visibleProviders = useMemo(() => {
    return getVisibleProviders(providers, searchTerm);
  }, [providers, searchTerm]);

  return {
    providers,
    visibleProviders,
    isLoading,
    error,
    refetch: loadProviders,
  };
};
