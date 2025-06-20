import {
  createComment,
  findCommentsByPostId,
} from "@/actions/comments.actions";
import { CommentFormType } from "@/type/comment.type";
import {
  useInfiniteQuery,
  useMutation,
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
