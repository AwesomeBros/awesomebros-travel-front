"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants";
import { ResetPasswordFormType, UserFormType } from "@/type";
import { ResetPasswordFormSchema } from "@/validation";
import axios from "axios";

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

export async function getMe() {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  const response = await axios.get(`${SERVER_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function findCommentsByUserId(params: {
  content?: string;
  page?: number;
}) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/user/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function updateUser(values: UserFormType) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.put(`${SERVER_URL}/user/update`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteUser(userId?: string) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/user/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
