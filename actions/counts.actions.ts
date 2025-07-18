"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCountsByPostId(postId?: number) {
  const response = await axios.get(`${SERVER_URL}/counts/${postId}`);
  return response.data.body;
}
