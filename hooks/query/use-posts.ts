import {
  createPost,
  findPostById,
  findPostsAll,
} from "@/actions/posts.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success(data.message);
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

export const useFindPostsAll = (sort?: string) => {
  const query = useQuery({
    queryKey: ["posts", { sort }],
    queryFn: () => findPostsAll(sort),
  });
  return query;
};

export const useFindPostById = (id: number) => {
  const query = useQuery({
    queryKey: ["post", { id }],
    queryFn: () => findPostById(id),
  });
  return query;
};
