import { UserFormSchema } from "@/validation/auth.schema";
import z from "zod";

export type UserType = {
  id: string;
  username: string;
  email: string;
  nickname: string;
  url?: string | null;
  provider?: string;
  created_at: string;
};

export type UserFormType = z.infer<typeof UserFormSchema>;
