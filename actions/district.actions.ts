"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findDistrictsAll() {
  const response = await axios.get(`${SERVER_URL}/district`);
  const { body } = await response.data;
  return body;
}
