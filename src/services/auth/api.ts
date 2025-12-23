import { privateApi, publicApi } from "@/config/api";
import type { LoginPayload, LoginResponse, RegisterPayload } from "./types";

export const login = ({ email, password }: LoginPayload) => {
  return publicApi.post<LoginResponse>("/auth/login", { email, password });
};

export const register = ({ email, name, password, passwordConfirmation }: RegisterPayload) => {
  return publicApi.post<void>("/auth/signup", {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
};

export const logout = () => {
  return privateApi.post<void>("/auth/logout");
};
