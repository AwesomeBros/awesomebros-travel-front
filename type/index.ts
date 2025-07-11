import {
  CommentFormSchema,
  LoginFormSchema,
  PostFormCitySchema,
  PostFormCountrySchema,
  PostFormDistrictSchema,
  PostFormInfoSchema,
  PostFormLocationSchema,
  PostFormSchema,
  ResetPasswordFormSchema,
  SignupFormSchema,
  UserFormSchema,
} from "@/validation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type DetailFilterType = "country" | "city" | "district" | "";

export interface FilterProps {
  countries: CountryType;
  cities: CityType;
  districts: DistrictType;
}

export interface FilterComponentProps {
  filterValue: FilterProps;
  setFilterValue: Dispatch<SetStateAction<FilterProps>>;
  setDetailFilter: Dispatch<SetStateAction<DetailFilterType | null>>;
}

export type HomeSortType = "latest" | "popular";
export type HomeCitiesType =
  | "서울"
  | "부산"
  | "대구"
  | "인천"
  | "광주"
  | "대전"
  | "울산"
  | "세종"
  | "경기"
  | "강원"
  | "충북"
  | "충남"
  | "전북"
  | "전남"
  | "경북"
  | "경남"
  | "제주";

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type SignupFormType = z.infer<typeof SignupFormSchema>;
export type EmailFormType = {
  email: string;
  type: "signup" | "reset";
};
export type ResetPasswordFormType = z.infer<typeof ResetPasswordFormSchema>;

export type CityType = {
  id?: number;
  name: string;
  countries_id?: number;
};

export type CommentFormType = z.infer<typeof CommentFormSchema>;

export type CommentType = z.infer<typeof CommentFormSchema> & {
  id: number;
  created_at: string;
  users: {
    id: string;
    username: string;
    url: string | null;
    nickname: string;
  };
  posts: PostType;
};

export type CountryType = {
  id?: number;
  name: string;
};

export type DistrictType = {
  id?: number;
  name: string;
  cities_id?: number;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  nickname: string;
  url?: string | null;
  provider?: string;
  created_at: string;
};

export type UserFormType = z.infer<typeof UserFormSchema>;

export type PostFormType = z.infer<typeof PostFormSchema>;

export type PostType = z.infer<typeof PostFormSchema> & {
  viewCount: number;
  id: number;
  createdAt: string;
  users: {
    id: string;
    username: string;
    url: string | null;
    nickname: string;
  };
  like: { userId: string }[];
  district: DistrictType;
  cities: CityType;
  countries: CountryType;
};

export type PostFormCountryType = z.infer<typeof PostFormCountrySchema>;
export type PostFormCityType = z.infer<typeof PostFormCitySchema>;
export type PostFormDistrictType = z.infer<typeof PostFormDistrictSchema>;
export type PostFormInfoType = z.infer<typeof PostFormInfoSchema>;
export type PostFormLocationType = z.infer<typeof PostFormLocationSchema>;

export type PlaceType = {
  geometry: {
    coordinates: [number, number];
    type?: "Point";
  };
  properties: {
    geocoding: {
      city?: string | null;
      district?: string | null;
      country?: string | null;
      locality?: string | null;
      name: string;
      street?: string | null;
      place_id?: number;
      label?: string;
    };
  };
};

export type LocationType = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};
