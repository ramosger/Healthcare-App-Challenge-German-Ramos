import { privateApi } from "@/config/api";
import type { ProviderFilters } from "@/services";
import type { Provider } from "@/types";
import type { GetProvidersResponse } from "@/types";

export const getProviders = async (filters: ProviderFilters): Promise<Provider[]> => {
  const { clinicId, gender, specialtyId } = filters;

  const params = {
    ...(specialtyId ? { "filter[specialty_id]": specialtyId } : {}),
    ...(clinicId ? { "filter[clinic_id]": clinicId } : {}),
    ...(gender ? { "filter[gender]": gender } : {}),
  };

  const { data } = await privateApi.get<GetProvidersResponse>("/providers", {
    params,
  });

  return data.data;
};
