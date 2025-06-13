import { findPostsAll } from "@/actions/posts.actions";
import HomePostsList from "@/components/home/home-posts-list";
import { getQueryClient } from "@/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function HomePage() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["posts", { sort: "popular" }],
    queryFn: () => findPostsAll("popular"),
  });
  queryClient.prefetchQuery({
    queryKey: ["posts", { sort: "latest" }],
    queryFn: () => findPostsAll("latest"),
  });
  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <HomePostsList />
    </HydrationBoundary>
  );
}
