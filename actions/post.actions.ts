"use server";

import { auth } from "@/auth";
import { NOMINATIM_URL, SERVER_URL } from "@/constants";
import { PostFormType } from "@/type";
import axios from "axios";
import { cookies } from "next/headers";

export async function createPost(values: PostFormType) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/post/create`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function updatePost(values: PostFormType, id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/post/update/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function deletePost(id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/post/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function findPostsAll(params: {
  country?: string;
  city?: string;
  district?: string;
  page?: string;
}) {
  try {
    const response = await axios.get(`${SERVER_URL}/post`, {
      params,
    });
    const { body } = response.data;

    return body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function findPostById(id?: number) {
  try {
    const response = await axios.get(`${SERVER_URL}/post/${id}`);

    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function incrementViewCount(id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  const visitorIdCookie = (await cookies()).get("visitor_id");

  let headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!token && visitorIdCookie) {
    headers["X-Visitor-Id"] = visitorIdCookie.value;
  }

  try {
    const response = await axios.post(
      `${SERVER_URL}/post/${id}/view`,
      {},
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function getCoordinate(value: string) {
  try {
    const response = await axios.get(`${NOMINATIM_URL}`, {
      params: {
        q: value,
        format: "geocodejson",
        addressdetails: 1,
        "accept-language": "ko",
        polygon_geojson: 0,
      },
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

export async function incrementViewCount(id?: number) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  const visitorIdCookie = (await cookies()).get("visitor_id");

  let headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!token && visitorIdCookie) {
    headers["X-Visitor-Id"] = visitorIdCookie.value;
  }

  try {
    const response = await axios.post(
      `${SERVER_URL}/post/${id}/view`,
      {},
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.message;
      throw new Error(message);
    }
    throw error;
  }
}
