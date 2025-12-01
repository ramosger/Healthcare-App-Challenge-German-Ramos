import { z } from "zod";

import i18n from "@/i18n";

export const getLoginRequestSchema = () => {
  return z.object({
    email: z.email({
      message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
    }),
    password: z.string().min(6, {
      message: i18n.t("form.errors.minLength", { field: i18n.t("form.password"), length: 6 }),
    }),
  });
};

export const loginResponseSchema = z.object({
  authToken: z.string(),
});

export const getRegisterRequestSchema = () => {
  return z
    .object({
      fullName: z.string().min(4, {
        message: i18n.t("form.errors.required", { field: i18n.t("form.fullName") }),
      }),
      email: z
        .string()
        .min(1, {
          message: i18n.t("form.errors.required", {
            field: i18n.t("form.email"),
          }),
        })
        .email({
          message: i18n.t("form.errors.invalidField", {
            field: i18n.t("form.email"),
          }),
        }),
      password: z
        .string()
        .min(1, {
          message: i18n.t("form.errors.required", {
            field: i18n.t("form.password"),
          }),
        })
        .min(8, {
          message: i18n.t("form.errors.minLength", {
            field: i18n.t("form.password"),
            length: 8,
          }),
        }),
      confirmPassword: z
        .string()
        .min(1, {
          message: i18n.t("form.errors.confirmPasswordRequired"),
        })
        .min(8, {
          message: i18n.t("form.errors.minLength", {
            field: i18n.t("form.confirmPassword"),
            length: 8,
          }),
        }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: i18n.t("form.errors.passwordMismatch"),
          path: ["confirmPassword"],
        });
      }
    });
};
