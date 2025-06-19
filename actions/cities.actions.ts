"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findCitiesAllByCountry(countries_id?: number) {
  const response = await axios.get(`${SERVER_URL}/cities`, {
    params: {
      countries_id,
    },
  });
  const { body } = await response.data;
  return body;
}
