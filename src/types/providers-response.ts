import type { Provider } from "@/types";

export type GetProvidersResponse = {
  data: Provider[];
  links: unknown;
  meta: {
    current_page: number;
    last_page: number;
  };
};
