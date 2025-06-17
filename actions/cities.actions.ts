"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCitiesAll(countryId?: number) {
  const response = await axios.get(`${SERVER_URL}/cities`, {
    params: {
      countryId,
    },
  });
  return response.data;
}
