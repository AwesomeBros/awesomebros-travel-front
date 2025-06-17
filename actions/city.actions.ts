"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCitiesAllByCountry(countryId?: string) {
  const response = await axios.get(`${SERVER_URL}/city`, {
    params: {
      countryId,
    },
  });
  const { body } = await response.data;
  return body;
}
