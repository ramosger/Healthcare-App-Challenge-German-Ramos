import type { z } from "zod";

import type { getLoginRequestSchema, getRegisterSchema, loginResponseSchema } from "./schemas";

export type LoginRequest = z.infer<ReturnType<typeof getLoginRequestSchema>>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterPayload = z.infer<ReturnType<typeof getRegisterSchema>>;
