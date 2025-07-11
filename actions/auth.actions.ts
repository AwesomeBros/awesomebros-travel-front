"use server";

import { signIn } from "@/auth";
import { SERVER_URL } from "@/constants";
import { LoginFormType, ResetPasswordFormType, SignupFormType } from "@/type";
import {
  LoginFormSchema,
  ResetPasswordFormSchema,
  SignupFormSchema,
} from "@/validation";
import axios from "axios";
import { redirect } from "next/navigation";

export const signup = async (value: SignupFormType) => {
  const data = SignupFormSchema.parse(value);
  const { name, email, token, password } = data;
  await axios.post(`${SERVER_URL}/auth/signup`, {
    name,
    email,
    token,
    password,
  });

  await signIn("credentials", {
    email,
    password,
    redirect: true,
  });

  return { message: "회원가입에 성공하였습니다." };
};

export const resetPassword = async (value: ResetPasswordFormType) => {
  const data = ResetPasswordFormSchema.parse(value);
  const { email, token, password } = data;
  try {
    const response = await axios.post(`${SERVER_URL}/auth/reset-password`, {
      email,
      token,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.result?.resultMessage;
      throw new Error(message);
    }
    throw error;
  }
};

export async function login(value: LoginFormType) {
  const data = LoginFormSchema.parse(value);
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: true,
  });
  redirect("/");
}
