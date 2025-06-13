"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCitiesAll() {
  const response = await axios.get(`${SERVER_URL}/cities`);
  const { body } = await response.data;
  return body;
}
