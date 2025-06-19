import { findCitiesAllByCountry } from "@/actions/cities.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindCitiesAllByCountry = (countries_id?: number) => {
  const query = useQuery({
    enabled: !!countries_id,
    queryKey: ["cities", { countries_id }],
    queryFn: () => findCitiesAllByCountry(countries_id),
  });
  return query;
};
