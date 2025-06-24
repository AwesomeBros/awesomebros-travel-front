"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function getCurrentUser() {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;

  try {
    const response = await axios.get(`${SERVER_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function findPostsByUserId(params: {
  title?: string;
  page?: number;
}) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/user/posts`, {
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
