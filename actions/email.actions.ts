"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export const sendEmail = async (email: string, type: "signup" | "reset") => {
  const url =
    type === "signup"
      ? `${SERVER_URL}/email/send-signup-email`
      : `${SERVER_URL}/email/send-reset-password-email`;
  const response = await axios.post(url, {
    email,
    type,
  });
  return response.data;
};

export async function verifyToken(token: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/email/verify-token`, {
      params: { token },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.result?.resultMessage;
      throw new Error(message);
    }
    throw error;
  }
}
