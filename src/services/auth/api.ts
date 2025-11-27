import { publicApi } from "@/config/api";
import type { LoginRequest, RegisterRequest } from "./types";

export const login = ({ email, password }: LoginRequest) => {
  return Promise.resolve({
    data: { authToken: `super-encrypted-auth-token-for-${email}-${password}` },
  });
  // return publicApi.post<ServiceResponse<LoginResponse>>('auth/login', { email, password });
};

export const register = ({ confirmPassword, email, fullName, password }: RegisterRequest) => {
  return publicApi.post<void>("auth/signup", {
    name: fullName,
    email,
    password,
    password_confirmation: confirmPassword,
  });
};
