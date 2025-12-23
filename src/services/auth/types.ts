import type { z } from "zod";

import type { getLoginSchema, getRegisterSchema, loginResponseSchema } from "./schemas";

export type LoginPayload = z.infer<ReturnType<typeof getLoginSchema>>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterPayload = z.infer<ReturnType<typeof getRegisterSchema>>;
