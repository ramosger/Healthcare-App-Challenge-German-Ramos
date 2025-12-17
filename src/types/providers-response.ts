import type { Provider } from "@/types";

export type GetProvidersResponse = {
  data: Provider[];
  links: unknown;
  meta: {
    currentPage: number;
    lastPage: number;
  };
};
