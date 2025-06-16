"use server";

import { auth, signIn } from "@/auth";
import { SERVER_URL } from "@/constants";
import {
  LoginFormType,
  ResetPasswordFormType,
  SignupFormType,
} from "@/type/auth.type";
import {
  LoginFormSchema,
  ResetPasswordFormSchema,
  SignupFormSchema,
} from "@/validation/auth.schema";
import axios from "axios";

export const signup = async (value: SignupFormType) => {
  const data = SignupFormSchema.parse(value);
  const { username, email, nickname, password } = data;
  await axios.post(`${SERVER_URL}/users/register`, {
    username,
    email,
    nickname,
    password,
  });

  return { message: "회원가입에 성공하였습니다." };
};

export const resetPassword = async (value: ResetPasswordFormType) => {
  const data = ResetPasswordFormSchema.parse(value);
  const { email, password } = data;
  try {
    const response = await axios.post(`${SERVER_URL}/auth/reset-password`, {
      email,
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
    email: data.username,
    password: data.password,
    redirect: false,
  });
}

export async function getMe() {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  const response = await axios.get(`${SERVER_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
