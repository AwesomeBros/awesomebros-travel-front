import z from "zod";

export const PostFormSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).trim(),
  slug: z.string().min(1, { message: "슬러그를 입력해주세요." }).trim(),
  content: z.string().min(1, { message: "내용을 입력해주세요." }).trim(),
  url: z.string().optional(),
  cities_id: z.number().min(1, { message: "도시를 선택해주세요." }),
  districts_id: z.number().min(1, { message: "행정구역을 선택해주세요." }),
  countries_id: z.number().min(1, { message: "국가를 선택해주세요." }),
  address: z.string().optional(),
});
