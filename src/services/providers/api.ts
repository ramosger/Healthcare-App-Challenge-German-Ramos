import { publicApi } from "@/config/api";
import type { ProviderFilters } from "@/services";
import { getAuthStoreState } from "@/stores";
import type { Provider } from "@/types";
import type { GetProvidersResponse } from "@/types";

export const getProviders = async (filters: ProviderFilters): Promise<Provider[]> => {
  const token = getAuthStoreState().token;
  console.log(token);

  const { clinicId, gender, specialtyId } = filters;

  const params = {
    ...(specialtyId ? { "filter[specialty_id]": specialtyId } : {}),
    ...(clinicId ? { "filter[clinic_id]": clinicId } : {}),
    ...(gender ? { "filter[gender]": gender } : {}),
  };

  const { data } = await publicApi.get<GetProvidersResponse>("/providers", {
    params,
    ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
  });

  return data.data;
};
