import { findDistrictsAllByCity } from "@/actions/district.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindDistrictsAllByCity = (city?: string) => {
  const query = useQuery({
    enabled: !!city,
    queryKey: ["districts", { city }],
    queryFn: () => findDistrictsAllByCity(city),
  });
  return query;
};
