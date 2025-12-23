import type { ProviderFilters } from "@/services";

export const providersKeys = {
  all: ["providers"] as const,
  list: (filters: ProviderFilters) => {
    return [...providersKeys.all, "list", filters] as const;
  },
};
