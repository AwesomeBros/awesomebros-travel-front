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
} from "@/validation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type DetailFilterType = "country" | "city" | "district" | "";

export type DistrictType = {
  id: string;
  name: string;
  cityId?: string;
};

export type CityType = {
  id: string;
  name: string;
  countryId?: string;
};

export type CountryType = {
  id: string;
  name: string;
};

export interface FilterProps {
  country: CountryType;
  city: CityType;
  district: DistrictType;
}

export interface FilterComponentProps {
  filterValue: FilterProps;
  setFilterValue: Dispatch<SetStateAction<FilterProps>>;
  setDetailFilter: Dispatch<SetStateAction<DetailFilterType | null>>;
}

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type SignupFormType = z.infer<typeof SignupFormSchema>;
export type EmailFormType = {
  email: string;
  type: "signup" | "reset";
};
export type ResetPasswordFormType = z.infer<typeof ResetPasswordFormSchema>;

export type PostFormType = z.infer<typeof PostFormSchema>;

export type PostType = z.infer<typeof PostFormSchema> & {
  id: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  like: { userId: string }[];
  location: PostFormLocationType;
  district: DistrictType;
  city: CityType;
  country: CountryType;
  viewCount: number;
  likeCount: number;
  commentCount: number;
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

export type CommentFormType = z.infer<typeof CommentFormSchema>;
export type CommentType = z.infer<typeof CommentFormSchema> & {
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  post: {
    id: number;
    slug: string;
  };
};
export type LocationType = {
  id?: string;
  lat: number;
  lng: number;
  name: string;
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  image: string | null;
  provider: string | null;
  createdAt: string;
};
