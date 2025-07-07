import {
  createPost,
  findPostById,
  findPostsAll,
  incrementViewCount,
  updatePost,
} from "@/actions/posts.actions";
import { PostFormType } from "@/type/post.type";
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

export const useUpdatePost = (id?: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: PostFormType) => updatePost(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
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

export const useFindPostsAll = (sort?: string) => {
  const query = useQuery({
    queryKey: ["posts", { sort }],
    queryFn: () => findPostsAll(sort),
  });
  return query;
};

export const useFindPostById = (id?: number) => {
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
