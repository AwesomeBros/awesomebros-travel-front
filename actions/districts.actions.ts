"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findDistrictsAll(cityId?: number) {
  const response = await axios.get(`${SERVER_URL}/districts`, {
    params: {
      cityId,
    },
  });
  return response.data;
}
