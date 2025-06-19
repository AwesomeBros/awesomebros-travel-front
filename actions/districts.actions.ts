"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findDistrictsAllByCity(cities_id?: number) {
  const response = await axios.get(`${SERVER_URL}/districts`, {
    params: {
      cities_id,
    },
  });
  const { body } = await response.data;
  return body;
}
