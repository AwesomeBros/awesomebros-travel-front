import { findCitiesAll } from "@/actions/cities.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindCitiesAll = (countryId?: number) => {
  const query = useQuery({
    enabled: !!countryId,
    queryKey: ["cities", { countryId }],
    queryFn: () => findCitiesAll(countryId),
  });
  return query;
};
