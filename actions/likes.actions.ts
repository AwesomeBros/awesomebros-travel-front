"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function toggleLike(posts_id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;

  try {
    const response = await axios.post(
      `${SERVER_URL}/likes`,
      {
        posts_id,
      },
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
