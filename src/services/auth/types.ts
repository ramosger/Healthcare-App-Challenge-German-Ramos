import type { z } from "zod";

import type {
  getLoginRequestSchema,
  getRegisterRequestSchema,
  loginResponseSchema,
} from "./schemas";

export type LoginRequest = z.infer<ReturnType<typeof getLoginRequestSchema>>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterRequest = z.infer<ReturnType<typeof getRegisterRequestSchema>>;
