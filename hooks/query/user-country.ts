import { findCountriesAll } from "@/actions/countries.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindCountriesAll = () => {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: findCountriesAll,
  });
  return query;
};
