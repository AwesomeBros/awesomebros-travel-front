import { findPostsByCities, findPostsBySort } from "@/actions/home.actions";
import { auth } from "@/auth";
import CitiesPostsList from "@/components/home/cities-posts-list";
import PopularLatestPostsList from "@/components/home/popular-latest-posts-list";
import { getQueryClient } from "@/provider/get-query-client";
import { HomeCitiesType, HomeSortType } from "@/type/type";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HomePage() {
  const session = await auth();
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
    <div className="flex flex-col bg-white p-4 rounded-xl shadow-md">
      <HydrationBoundary state={state}>
        <PopularLatestPostsList session={session} />
        <CitiesPostsList session={session} />
      </HydrationBoundary>
    </div>
  );
}
