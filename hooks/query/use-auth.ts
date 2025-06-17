"use client";
import { login, resetPassword, signup } from "@/actions/auth.actions";
import { sendEmail, verifyToken } from "@/actions/email.actions";
import { EmailFormType } from "@/type";
import { useMutation, useQuery } from "@tanstack/react-query";
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
          toast.error("이메일 또는 비밀번호가 일치하지 않습니다.");
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
      router.push("/");
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
