"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants";
import { CommentFormType } from "@/type/comment.type";
import axios from "axios";

export async function findCommentsByPostId(posts_id?: number) {
  try {
    const response = await axios.get(
      `${SERVER_URL}/comments/posts/${posts_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function createComment(
  values: CommentFormType,
  posts_id?: number
) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  const requestBody = {
    ...values,
    posts_id,
  };
  try {
    const response = await axios.post(`${SERVER_URL}/comments`, requestBody, {
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

export async function findCommentById(id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/comments/${id}`, {
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

export async function updateComment(values: CommentFormType, id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/comments/update/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteComment(id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/comments/delete/${id}`, {
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
