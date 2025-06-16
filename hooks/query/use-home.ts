import { findPostsByCities, findPostsBySort } from "@/actions/home.actions";
import { HomeCitiesType, HomeSortType } from "@/type/types";
import { useQuery } from "@tanstack/react-query";

export function useFindPostsBySort(sort: HomeSortType) {
  const query = useQuery({
    queryKey: ["posts", { sort }],
    queryFn: () => findPostsBySort(sort),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}

export function useFindPostsByCities(city: HomeCitiesType) {
  const query = useQuery({
    queryKey: ["posts", { city }],
    queryFn: () => findPostsByCities(city),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}
