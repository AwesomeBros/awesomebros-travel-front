"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";

export async function findDistrictsAllByCity(cityId?: string) {
  const response = await axios.get(`${SERVER_URL}/district`, {
    params: {
      cityId,
    },
  });
  const { body } = await response.data;
  return body;
}
