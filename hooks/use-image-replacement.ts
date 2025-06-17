"use client";
import { changePathContentImage } from "@/actions/file.actions";
import { useState } from "react";

export default function useQuillImageReplacement() {
  const [urlArray, setUrlArray] = useState<string[]>([]);

  const replaceImages = async (content: string, slug: string) => {
    const srcArray: string[] = [];
    const gainSource = /<img[^>]*src\s*=\s*["']?([^>"']+)["']?[^>]*>/g;
    let endContent = content;

    let match;
    while ((match = gainSource.exec(content)) !== null) {
      const result = match[1];
      console.log("src 추출 결과:", result);
      srcArray.push(result);
    }

    const requestData = { urls: srcArray, slug };

    try {
      const urls = await changePathContentImage(requestData);
      setUrlArray(urls);
      srcArray.forEach((src, index) => {
        endContent = endContent.replace(src, urls[index]);
      });
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }

    return endContent;
  };

  return { urlArray, replaceImages };
}
