"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants";
import { PostFormType } from "@/type/post.type";
import axios from "axios";

export async function createPost(values: PostFormType) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/post`, values, {
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

export async function findPostsAll() {
  try {
    const response = await axios.get(`${SERVER_URL}/post`);
    const { body } = response.data;

    return body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findPostById(id: number) {
  try {
    const response = await axios.get(`${SERVER_URL}/post/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      throw new Error(message);
    }
    throw error;
  }
}
