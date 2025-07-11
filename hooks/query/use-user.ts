import { deleteUser, getMe, updateUser } from "@/actions/user.actions";
import { UserFormType } from "@/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMe = (userId?: string) => {
  const query = useQuery({
    enabled: !!userId,
    queryKey: ["user", userId],
    queryFn: getMe,
  });
  return query;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: UserFormType) => updateUser(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user", data.body.id] });
    },
  });
  return mutation;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userId?: string) => deleteUser(userId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user", data.body.id] });
    },
  });
  return mutation;
};
