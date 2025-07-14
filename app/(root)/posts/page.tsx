import { findPostsAll } from "@/actions/posts.actions";
import PostsList from "@/components/post/posts-list";
import { getQueryClient } from "@/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function BoardPage() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => findPostsAll(),
  });
  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <PostsList />
    </HydrationBoundary>
  );
}
