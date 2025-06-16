import { findPostsByCities, findPostsBySort } from "@/actions/home.actions";
import CitiesPostsList from "@/components/home/cities-posts-list";
import PopularLatestPostsList from "@/components/home/popular-latest-posts-list";
import { getQueryClient } from "@/provider/get-query-client";
import { HomeCitiesType } from "@/type/types";

import { HomeSortType } from "@/type/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = getQueryClient();
  const sortType: HomeSortType = "latest";
  const cityType: HomeCitiesType = "서울";

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["posts", { sort: sortType }],
      queryFn: () => findPostsBySort(sortType),
    }),
    queryClient.prefetchQuery({
      queryKey: ["posts", { city: cityType }],
      queryFn: () => findPostsByCities(cityType),
    }),
  ]);

  const state = dehydrate(queryClient);

  return (
    <div className="flex flex-col">
      <HydrationBoundary state={state}>
        <PopularLatestPostsList />
        <CitiesPostsList />
      </HydrationBoundary>
    </div>
  );
}
