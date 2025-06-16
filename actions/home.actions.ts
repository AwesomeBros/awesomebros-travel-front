"use server";

import { SERVER_URL } from "@/constants";
import { HomeCitiesType, HomeSortType } from "@/type/types";
import axios from "axios";

export async function findPostsBySort(sort: HomeSortType) {
  try {
    const response = await axios.get(`${SERVER_URL}/posts`, {
      params: { sort },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findPostsByCities(city: HomeCitiesType) {
  try {
    const response = await axios.get(`${SERVER_URL}/posts/city`, {
      params: { city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
