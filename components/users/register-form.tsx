"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/query/use-users";
import { SignupFormType } from "@/type/auth.type";
import { SignupFormSchema } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function RegisterForm() {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
  });
  const signup = useSignup();

  console.error(form.formState.errors);
  function onSubmit(values: SignupFormType) {
    signup.mutate(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">회원가입</CardTitle>
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
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="이메일" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>유저 아이디</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="유저 아이디"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>닉네임</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="닉네임" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>비밀번호</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="비밀번호"
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
                          <FormLabel>비밀번호 확인</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="비밀번호 확인"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button>회원가입</Button>
                </div>
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
