import { findPostsByCity, findPostsBySort } from "@/actions/home.actions";
import { HomeCitiesType, HomeSortType } from "@/type";
import { useQuery } from "@tanstack/react-query";

export function useFindPostsBySort(sort: HomeSortType) {
  const query = useQuery({
    queryKey: ["posts", { sort }],
    queryFn: () => findPostsBySort(sort),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}

export function useFindPostsByCity(city: HomeCitiesType) {
  const query = useQuery({
    enabled: !!city,
    queryKey: ["posts", { city }],
    queryFn: () => findPostsByCity(city),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}
