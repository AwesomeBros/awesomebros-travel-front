import z from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "유저 아이디를 입력하세요.",
    })
    .trim(),
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }).trim(),
});

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(1, {
        message: "유저 아이디를 입력하세요.",
      })
      .trim(),
    nickname: z
      .string()
      .min(1, {
        message: "닉네임을 입력하세요.",
      })
      .trim(),
    email: z.string().email({ message: "이메일 형식이 아닙니다." }).trim(),
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

export const UserFormSchema = z.object({
  nickname: z.string().optional(),
  url: z.string().optional(),
});

export const CommentFormSchema = z.object({
  content: z.string().min(1, { message: "댓글을 입력해주세요." }).trim(),
});

export const PostFormSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).trim(),
  slug: z.string().min(1, { message: "슬러그를 입력해주세요." }).trim(),
  content: z.string().min(1, { message: "내용을 입력해주세요." }).trim(),
  url: z.string().min(1, { message: "섬네일을 업로드해주세요." }).optional(),
  cities_id: z.number().min(1, { message: "도시를 선택해주세요." }),
  districts_id: z.number().min(1, { message: "행정구역을 선택해주세요." }),
  countries_id: z.number().min(1, { message: "국가를 선택해주세요." }),
  locations: z
    .object({
      lat: z
        .number()
        .min(-90, { message: "유효한 위도를 입력해주세요." })
        .max(90, { message: "유효한 위도를 입력해주세요." }),
      lng: z
        .number()
        .min(-180, { message: "유효한 경도를 입력해주세요." })
        .max(180, { message: "유효한 경도를 입력해주세요." }),
      name: z.string().min(1, { message: "위치 이름을 입력해주세요." }).trim(),
    })
    .array()
    .optional(),
});

export const PostFormCountrySchema = z.object({
  countries_id: z.number().min(1, { message: "국가를 선택해주세요." }),
});

export const PostFormCitySchema = z.object({
  cities_id: z.number().min(1, { message: "도시를 선택해주세요." }),
});

export const PostFormDistrictSchema = z.object({
  districts_id: z.number().min(1, { message: "행정구역을 선택해주세요." }),
});

export const PostFormInfoSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).trim(),
  slug: z.string().min(1, { message: "슬러그를 입력해주세요." }).trim(),
  content: z.string().min(1, { message: "내용을 입력해주세요." }).trim(),
});

export const PostFormLocationSchema = z.object({
  locations: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
      name: z.string(),
    })
  ),
});
