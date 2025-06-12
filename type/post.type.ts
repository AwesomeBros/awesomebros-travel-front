import { PostFormSchema } from "@/validation/post.schema";
import { z } from "zod";
import { CityType } from "./citiy.type";
import { CountryType } from "./country.type";
import { DistrictType } from "./district.type";

export type PostFormType = z.infer<typeof PostFormSchema>;

export type PostType = z.infer<typeof PostFormSchema> & {
  viewCount: number;
  id: number;
  createdAt: string;
  users: {
    id: string;
    username: string;
    url: string | null;
  };
  districts: DistrictType;
  cities: CityType;
  countries: CountryType;
};
