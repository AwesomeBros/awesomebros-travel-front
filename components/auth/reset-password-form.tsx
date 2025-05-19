"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResetPassword, useVerifyToken } from "@/hooks/query/use-auth";
import { ResetPasswordFormType } from "@/type/auth.type";
import { ResetPasswordFormSchema } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function ResetPasswordForm() {
  const router = useRouter();
  const token = useParams<{ token: string }>().token;
  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      token: "",
    },
  });

  const { data, isError, error, isLoading } = useVerifyToken(token);
  const resetPassword = useResetPassword();

  if (!isLoading) {
    setTimeout(() => {
      form.setValue("email", data.body);
      form.setValue("token", token);
    }, 0);
  }
  if (isError) {
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        toast.error("잘못된 접근입니다.");
        router.push("/reset-password");
      }
    }
  }

  function onSubmit(values: ResetPasswordFormType) {
    resetPassword.mutate(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">비밀번호 찾기</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <input type="hidden" name="token" value={token} />
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>새로운 비밀번호</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="새로운 비밀번호"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>새로운 비밀번호 확인</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="새로운 비밀번호 확인"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button>비밀번호 재설정</Button>
                  <div className="text-sm text-center text-muted-foreground">
                    이미 계정이 있나요?{" "}
                    <Link
                      href={"/login"}
                      className="text-foreground link hover:underline underline-offset-2"
                    >
                      로그인
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
