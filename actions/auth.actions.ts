"use server";

import { auth, signIn } from "@/auth";
import { SERVER_URL } from "@/constants/common";
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
    redirect: false,
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
