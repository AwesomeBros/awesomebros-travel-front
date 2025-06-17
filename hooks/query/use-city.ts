import { findCitiesAllByCountry } from "@/actions/city.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindCitiesAllByCountry = (countryId?: string) => {
  const query = useQuery({
    enabled: !!countryId,
    queryKey: ["cities", { countryId }],
    queryFn: () => findCitiesAllByCountry(countryId),
  });
  return query;
};
