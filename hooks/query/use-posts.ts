import {
  createPost,
  deletePost,
  findPostById,
  findPostsAll,
  findPostsByUserId,
  incrementViewCount,
  updatePost,
} from "@/actions/posts.actions";
import { PostFormType } from "@/type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success(data);
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
      toast.success(data);
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

export const useFindPostsAll = (params: {
  country?: string;
  city?: string;
  district?: string;
  sort?: string;
}) => {
  const query = useQuery({
    queryKey: ["posts", params],
    queryFn: () => findPostsAll(params),
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

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id?: number) => deletePost(id),
    onSuccess: (data, id) => {
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

export const useFindPostsByUserId = (params: {
  title?: string;
  userId?: string;
}) => {
  const query = useInfiniteQuery({
    queryKey: ["posts", params],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      findPostsByUserId({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
  });
  return query;
};
