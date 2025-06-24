import {
  createPost,
  deletePost,
  findPostById,
  findPostsAll,
  updatePost,
} from "@/actions/post.actions";
import { findPostsByUserId } from "@/actions/user.actions";
import { PostFormType } from "@/type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
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

export const useFindPostById = (id?: number) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["post", { id }],
    queryFn: () => findPostById(id),
  });
  return query;
};

export const useIncreaseViewCount = (id: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/post/${id}/view`,
        {},
        { withCredentials: true }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", { id }] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutation;
};
