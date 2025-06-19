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
