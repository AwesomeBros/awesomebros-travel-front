import { findCitiesAll } from "@/actions/city.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindCitiesAll = () => {
  const query = useQuery({
    queryKey: ["cities"],
    queryFn: findCitiesAll,
  });
  return query;
};
