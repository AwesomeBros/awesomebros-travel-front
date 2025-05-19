import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }).trim(),
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }).trim(),
});

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "이름은 2글자 이상이어야 합니다.",
      })
      .trim(),
    email: z.string().email({ message: "이메일 형식이 아닙니다." }).trim(),
    token: z.string({ message: "토큰은 문자여야합니다." }).trim(),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "비밀번호는 알파벳이 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "비밀번호는 숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "비밀번호는 특수문자가 포함되어야 합니다.",
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });

export const ResetPasswordFormSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 아닙니다." }).trim(),
    token: z.string({ message: "토큰은 문자여야합니다." }).trim(),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "비밀번호는 알파벳이 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "비밀번호는 숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "비밀번호는 특수문자가 포함되어야 합니다.",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "비밀번호를 재입력하세요." })
      .trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });
