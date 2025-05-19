import {
  LoginFormSchema,
  ResetPasswordFormSchema,
  SignupFormSchema,
} from "@/validation/auth.schema";
import { z } from "zod";

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type SignupFormType = z.infer<typeof SignupFormSchema>;
export type EmailFormType = {
  email: string;
  type: "signup" | "reset";
};
export type ResetPasswordFormType = z.infer<typeof ResetPasswordFormSchema>;
