"use client";
import { sendEmail, verifyToken } from "@/actions/email.actions";
import {
  deleteUser,
  getMe,
  login,
  resetPassword,
  signup,
  updateUser,
} from "@/actions/users.actions";
import { EmailFormType } from "@/type/auth.type";
import { UserFormType } from "@/type/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message !== "NEXT_REDIRECT") {
          toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      }
    },
  });
  return mutation;
};

export const useVerifyToken = (token: string) => {
  const query = useQuery({
    queryKey: ["checkVerifyToken"],
    queryFn: async () => verifyToken(token),
    enabled: !!token,
    retry: false,
  });
  return query;
};

export const useSignup = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};

export const useSendMail = () => {
  const mutation = useMutation({
    mutationFn: async ({ email, type }: EmailFormType) =>
      sendEmail(email, type),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};

export const useResetPassword = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.body);
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};

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
