"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCountsByPostId(posts_id?: number) {
  const response = await axios.get(`${SERVER_URL}/counts/${posts_id}`);
  console.log("findCountsByPostId response", response.data);

  return response.data;
}
