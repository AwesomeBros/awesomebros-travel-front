import { Dispatch, SetStateAction } from "react";
import { CityType } from "./citiy.type";
import { CountryType } from "./country.type";
import { DistrictType } from "./district.type";

export type DetailFilterType = "country" | "city" | "district" | "";

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
