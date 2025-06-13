"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCountriesAll() {
  const response = await axios.get(`${SERVER_URL}/countries`);
  const { body } = await response.data;
  return body;
}
