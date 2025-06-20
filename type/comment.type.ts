import { CommentFormSchema } from "@/validation/comment.schema";
import { z } from "zod";

export type CommentFormType = z.infer<typeof CommentFormSchema>;

export type CommentType = z.infer<typeof CommentFormSchema> & {
  id: number;
  created_at?: string;
  users: {
    id: string;
    username: string;
    url: string | null;
    nickname: string;
  };
};
