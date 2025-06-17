import { findDistrictsAll } from "@/actions/districts.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindDistrictsAll = (cityId?: number) => {
  const query = useQuery({
    enabled: !!cityId,
    queryKey: ["districts", { cityId }],
    queryFn: () => findDistrictsAll(cityId),
  });
  return query;
};
