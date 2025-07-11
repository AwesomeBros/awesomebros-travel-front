"use server";

import { signIn } from "@/auth";
import { SERVER_URL } from "@/constants";
import { LoginFormType, SignupFormType } from "@/type";
import { LoginFormSchema, SignupFormSchema } from "@/validation";
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

export async function login(value: LoginFormType) {
  const data = LoginFormSchema.parse(value);
  await signIn("credentials", {
    username: data.username,
    password: data.password,
    redirect: true,
  });
}
