import {
  PostFormCitySchema,
  PostFormCountrySchema,
  PostFormDistrictSchema,
  PostFormInfoSchema,
  PostFormLocationSchema,
  PostFormSchema,
} from "@/validation/post.schema";
import { z } from "zod";
import { CityType } from "./citiy.type";
import { CountType } from "./count.type";
import { CountryType } from "./country.type";
import { DistrictType } from "./district.type";

export type PostFormType = z.infer<typeof PostFormSchema>;

export type PostType = z.infer<typeof PostFormSchema> & {
  id: number;
  created_at: string;
  users: {
    id: string;
    username: string;
    url: string | null;
    nickname: string;
  };
  counts: CountType;
  districts: DistrictType;
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
