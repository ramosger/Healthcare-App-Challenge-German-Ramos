import { publicApi } from "@/config/api";
import type { LoginRequest, RegisterPayload } from "./types";

export const login = ({ email, password }: LoginRequest) => {
  return Promise.resolve({
    data: { authToken: `super-encrypted-auth-token-for-${email}-${password}` },
  });
  // return publicApi.post<ServiceResponse<LoginResponse>>('auth/login', { email, password });
};

export const register = ({ email, name, password, passwordConfirmation }: RegisterPayload) => {
  return publicApi.post<void>("/auth/signup", {
    name,
    email,
    password,
    passwordConfirmation,
  });
};
