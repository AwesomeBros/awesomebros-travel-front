import z from "zod";

export const PostFormSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).trim(),
  slug: z.string().min(1, { message: "슬러그를 입력해주세요." }).trim(),
  content: z.string().min(1, { message: "내용을 입력해주세요." }).trim(),
  url: z.string().min(1, { message: "섬네일을 업로드해주세요." }).trim(),
  cities_id: z.number().min(1, { message: "도시를 선택해주세요." }),
  districts_id: z.number().min(1, { message: "행정구역을 선택해주세요." }),
  countries_id: z.number().min(1, { message: "국가를 선택해주세요." }),
  thumbnail: z.string().min(1, { message: "썸네일을 업로드해주세요." }).trim(),
  coordinates: z
    .object({
      lat: z
        .number()
        .min(-90, { message: "유효한 위도를 입력해주세요." })
        .max(90, { message: "유효한 위도를 입력해주세요." }),
      lng: z
        .number()
        .min(-180, { message: "유효한 경도를 입력해주세요." })
        .max(180, { message: "유효한 경도를 입력해주세요." }),
      name: z.string().min(1, { message: "위치 이름을 입력해주세요." }).trim(),
    })
    .array()
    .optional(),
});

export const PostFormCountrySchema = z.object({
  countries_id: z.number().min(1, { message: "국가를 선택해주세요." }),
});

export const PostFormCitySchema = z.object({
  cities_id: z.number().min(1, { message: "도시를 선택해주세요." }),
});

export const PostFormDistrictSchema = z.object({
  districts_id: z.number().min(1, { message: "행정구역을 선택해주세요." }),
});

export const PostFormInfoSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).trim(),
  slug: z.string().min(1, { message: "슬러그를 입력해주세요." }).trim(),
  content: z.string().min(1, { message: "내용을 입력해주세요." }).trim(),
});

export const PostFormCoordinateSchema = z.object({
  coordinates: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
      name: z.string(),
    })
  ),
});
