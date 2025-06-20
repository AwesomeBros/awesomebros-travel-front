import {
  createPost,
  findPostById,
  findPostsAll,
  incrementViewCount,
} from "@/actions/post.actions";
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

export const useFindPostsAll = (params: {
  country?: string;
  city?: string;
  district?: string;
}) => {
  const query = useQuery({
    queryKey: ["posts", params],
    queryFn: () => findPostsAll(params),
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

export const useIncrementViewCount = (id?: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => incrementViewCount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};
