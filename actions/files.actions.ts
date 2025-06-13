"use server";

import { SERVER_URL } from "@/constants";
import axios from "axios";
import { auth } from "../auth";

export async function imageUpload(formData: FormData) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  const response = await axios.post(`${SERVER_URL}/file/image`, formData, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function changePathContentImage(data: {
  urls: string[];
  slug: string;
}) {
  const session = await auth();
  const token = session?.serverTokens?.accessToken;
  // console.log("업로드할 파일:", data.urls);
  // console.log("업로드할 파일 개수:", data.urls.length);
  // console.log("slug:", data.slug);

  const response = await axios.post(
    `${SERVER_URL}/file/content/image-path`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
