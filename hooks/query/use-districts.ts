import { findDistrictsAll } from "@/actions/district.actions";
import { useQuery } from "@tanstack/react-query";

export const useFindDistrictsAll = () => {
  const query = useQuery({
    queryKey: ["districts"],
    queryFn: findDistrictsAll,
  });
  return query;
};
