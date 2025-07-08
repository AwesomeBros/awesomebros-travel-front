import { toggleLike } from "@/actions/like.actions";
import { findLikesByUserId } from "@/actions/user.actions";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

// export function useFindLikePostById(id?: number, userId?: string) {
//   const query = useQuery({
//     queryKey: ["like", { id }, { userId }],
//     queryFn: () => findPostById(id, userId),
//   });
//   return query;
// }

export function useToggleLike() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["like"],
    mutationFn: toggleLike,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["like"] });
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return mutation;
}

export const useFindLikesByUserId = (params: {
  title?: string;
  userId?: string;
}) => {
  const query = useInfiniteQuery({
    queryKey: ["likes", params],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      findLikesByUserId({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
};
