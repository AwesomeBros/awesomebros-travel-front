import { isLiked, toggleLike } from "@/actions/likes.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useToggleLike() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: toggleLike,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: ["like", { postId }],
      });
      await queryClient.cancelQueries({
        queryKey: ["count", { postId }],
      });
      const previousLike = queryClient.getQueryData(["like", { postId }]);
      queryClient.setQueryData(
        ["like", { postId }],
        (old: boolean | undefined) => !old
      );
      const previousCount = queryClient.getQueryData(["count", { postId }]);
      queryClient.setQueryData(
        ["count", { postId }],
        (old: { likeCount: number } | undefined) => {
          if (old) {
            return {
              ...old,
              likeCount: old.likeCount + (previousLike ? -1 : 1),
            };
          }
          return old;
        }
      );
      return { previousLike, previousCount, postId };
    },
    onError: (error, postId, context) => {
      queryClient.setQueryData(["like", { postId }], context?.previousLike);
      toast.error("좋아요를 처리하는 중 오류가 발생했습니다.");
    },
    onSettled: (postId) => {
      queryClient.invalidateQueries({
        queryKey: ["like", { postId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["count", { postId }],
      });
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });
  return mutation;
}

export function useIsLiked(postId?: number) {
  const query = useQuery({
    enabled: !!postId,
    queryKey: ["like", { postId }],
    queryFn: () => isLiked(postId),
  });
  return query;
}
