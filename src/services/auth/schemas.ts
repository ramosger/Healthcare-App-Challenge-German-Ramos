import { z } from "zod";

import i18n from "@/i18n";

export const getLoginSchema = () => {
  return z.object({
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
  });
};

export const loginResponseSchema = z.object({
  data: z.object({
    accessToken: z.string(),
    tokenType: z.string(),
    expiresIn: z.number(),
  }),
});

export const getRegisterSchema = () => {
  return z
    .object({
      name: z.string().min(4, {
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
      passwordConfirmation: z
        .string()
        .min(1, {
          message: i18n.t("form.passwordErrors.passwordConfirmationRequired"),
        })
        .min(8, {
          message: i18n.t("form.errors.minLength", {
            field: i18n.t("form.passwordConfirmation"),
            length: 8,
          }),
        }),
    })
    .superRefine(({ password, passwordConfirmation }, ctx) => {
      if (password !== passwordConfirmation) {
        ctx.addIssue({
          code: "custom",
          message: i18n.t("form.errors.passwordMismatch"),
          path: ["passwordConfirmation"],
        });
      }
    });
};
