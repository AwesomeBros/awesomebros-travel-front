import {
  createComment,
  deleteComment,
  findCommentById,
  findCommentsByPostId,
  updateComment,
} from "@/actions/comment.actions";
import { findCommentsByUserId } from "@/actions/user.actions";
import { CommentFormType } from "@/type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export function useFindCommentsByPostId(postId?: number) {
  const query = useInfiniteQuery({
    enabled: !!postId,
    queryKey: ["comments", { postId }],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => findCommentsByPostId(pageParam, postId),
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
}

export function useCreateComment(postId?: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: CommentFormType) => createComment(values, postId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["comments", { postId }],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export const useFindCommentsByUserId = (params: { content?: string }) => {
  const query = useInfiniteQuery({
    queryKey: ["comments", params],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      findCommentsByUserId({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
};

export function useFindCommentById(commentId?: string) {
  const query = useQuery({
    enabled: !!commentId,
    queryKey: ["comment", commentId],
    queryFn: () => findCommentById(commentId),
  });
  return query;
}

export const useUpdateComment = (id?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: CommentFormType) => updateComment(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment", { id }] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id?: string) => deleteComment(id),
    onSuccess: (data, id) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment", { id }] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};
