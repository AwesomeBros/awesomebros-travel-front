import { CommentFormSchema } from "@/validation/comment.schema";
import { z } from "zod";
import { PostType } from "./post.type";

export type CommentFormType = z.infer<typeof CommentFormSchema>;

export type CommentType = z.infer<typeof CommentFormSchema> & {
  id: number;
  created_at: string;
  users: {
    id: string;
    username: string;
    url: string | null;
    nickname: string;
  };
  posts: PostType;
};
