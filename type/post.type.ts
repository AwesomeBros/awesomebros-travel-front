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

// export type PlaceType = {
//   place_id: number;
//   display_name: string;
//   address: {
//     city?: string;
//     borough?: string;
//     suburb?: string;
//     province?: string;
//     city_district?: string;
//     amenity?: string;
//     quarter?: string;
//     aeroway?: string;
//     beach?: string;
//   };
//   lat: number;
//   lon: number;
// };

export type PlaceType = {
  geometry: {
    coordinates: [number, number];
    type: "Point";
  };
  properties: {
    geocoding: {
      city: string | null;
      district: string | null;
      country: string | null;
      locality: string | null;
      name: string;
      street: string | null;
      place_id: number;
      label: string;
    };
  };
};
