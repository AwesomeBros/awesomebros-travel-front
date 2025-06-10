import { useFindCitiesAll } from "@/hooks/query/use-cities";
import { useFindDistrictsAll } from "@/hooks/query/use-districts";
import { useFindCountriesAll } from "@/hooks/query/user-country";
import { useDetailFilterStore, useFilterStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { CityType } from "@/type/citiy.type";
import { CountryType } from "@/type/country.type";
import { DistrictType } from "@/type/district.type";
import FilterContainer from "./filter-container";

export function SearchFilter() {
  return (
    <>
      <CountryFilter />
      <CityFilter />
      <DistrictFilter />
    </>
  );
}

const CountryFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const { data: countries, isLoading } = useFindCountriesAll();
  if (isLoading) {
    return null;
  }

  return (
    <FilterContainer title="국가 선택하기" isShow={detailFilter === "country"}>
      <div className="flex flex-wrap items-center justify-start gap-4 mt-4">
        {countries.map((country: CountryType) => (
          <button
            key={country.id}
            type="button"
            className={cn(
              "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white cursor-pointer",
              {
                "bg-primary text-white":
                  filterValue.country.name === country.name,
              }
            )}
            onClick={() => {
              setFilterValue({
                ...filterValue,
                country: {
                  id: country.id,
                  name: country.name,
                },
                city: {
                  id: 0,
                  name: "",
                },
                district: {
                  id: 0,
                  name: "",
                },
              });
              setDetailFilter("city");
            }}
          >
            {country.name}
          </button>
        ))}
      </div>
    </FilterContainer>
  );
};

const CityFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const { data: cities, isLoading } = useFindCitiesAll();
  if (isLoading) return null;
  const filteredCities =
    cities?.filter(
      (city: CityType) => city.countries_id === filterValue.country.id
    ) ?? [];
  return (
    <FilterContainer title="도시 선택하기" isShow={detailFilter === "city"}>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {filteredCities.map((city: CityType) => (
          <button
            key={city.id}
            type="button"
            className={cn(
              "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white cursor-pointer",
              {
                "bg-primary text-white": filterValue.city.name === city.name,
              }
            )}
            onClick={() => {
              setFilterValue({
                ...filterValue,
                city: {
                  id: city.id,
                  name: city.name,
                },
                district: {
                  id: 0,
                  name: "",
                },
              });
              setDetailFilter("district");
            }}
          >
            {city.name}
          </button>
        ))}
      </div>
    </FilterContainer>
  );
};

const DistrictFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const { data: districts, isLoading } = useFindDistrictsAll();
  if (isLoading) return null;
  const filteredDistricts =
    districts?.filter(
      (district: DistrictType) => district.cities_id === filterValue.city.id
    ) ?? [];
  return (
    <FilterContainer title="지역 선택하기" isShow={detailFilter === "district"}>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {filteredDistricts.map((district: DistrictType) => (
          <button
            key={district.id}
            type="button"
            className={cn(
              "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white cursor-pointer",
              {
                "bg-primary text-white":
                  filterValue.district.name === district.name,
              }
            )}
            onClick={() => {
              setFilterValue({
                ...filterValue,
                district: {
                  id: district.id,
                  name: district.name,
                },
              });
              setDetailFilter("");
            }}
          >
            {district.name}
          </button>
        ))}
      </div>
    </FilterContainer>
  );
};
