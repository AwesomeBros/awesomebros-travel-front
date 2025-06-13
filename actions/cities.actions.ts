"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCitiesAll() {
  const response = await axios.get(`${SERVER_URL}/cities`);
  return response.data;
}
