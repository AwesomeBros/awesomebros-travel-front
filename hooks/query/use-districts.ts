import { findDistrictsAllByCity } from "@/actions/districts.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindDistrictsAllByCity = (cities_id?: number) => {
  const query = useQuery({
    enabled: !!cities_id,
    queryKey: ["districts", { cities_id }],
    queryFn: () => findDistrictsAllByCity(cities_id),
  });
  return query;
};
