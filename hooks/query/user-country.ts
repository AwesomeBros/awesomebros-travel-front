import { findCountriesAll } from "@/actions/country.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindCountriesAll = () => {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: findCountriesAll,
  });
  return query;
};
