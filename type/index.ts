import {
  LoginFormSchema,
  PostFormSchema,
  ResetPasswordFormSchema,
  SignupFormSchema,
} from "@/validation";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type DetailFilterType = "country" | "city" | "district" | "";

export type DistrictType = {
  id?: string;
  name: string;
  cityId?: string;
};

export type CityType = {
  id?: string;
  name: string;
  countryId?: string;
};

export type CountryType = {
  id?: string;
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

export type PlaceType = {
  place_id: number;
  display_name: string;
  address: {
    city?: string;
    borough?: string;
    suburb?: string;
    province?: string;
    city_district?: string;
    amenity?: string;
    quarter?: string;
    aeroway?: string;
    beach?: string;
  };
  lat: number;
  lon: number;
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
