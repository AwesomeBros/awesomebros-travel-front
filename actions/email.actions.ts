"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export const sendEmail = async (email: string, type: "signup" | "reset") => {
  const url =
    type === "signup"
      ? `${SERVER_URL}/auth/send-signup-email`
      : `${SERVER_URL}/auth/send-reset-password-email`;
  try {
    const response = await axios.post(url, {
      email,
      type,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      throw new Error(message);
    }
    throw error;
  }
};

export async function verifyToken(token: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/auth/verify-token`, {
      params: { token },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      throw new Error(message);
    }
    throw error;
  }
}
