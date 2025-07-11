"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants";
import { UserFormType } from "@/type";
import axios from "axios";

export async function getMe() {
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

export async function findLikesByUserId(params: {
  title?: string;
  page?: number;
}) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/user/likes`, {
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
