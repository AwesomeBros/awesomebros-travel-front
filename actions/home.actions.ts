"use server";

import { SERVER_URL } from "@/constants";
import { HomeSortType } from "@/type";
import axios from "axios";

export async function findPostsBySort(sort: HomeSortType) {
  try {
    const response = await axios.get(`${SERVER_URL}/home`, {
      params: { sort },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findPostsByCity(city: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/home/city`, {
      params: { city },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
