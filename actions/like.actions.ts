"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function toggleLike(postId?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;

  try {
    const response = await axios.post(
      `${SERVER_URL}/likes`,
      {
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
