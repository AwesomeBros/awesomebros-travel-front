import { findPostsAll } from "@/actions/posts.actions";
import PostsList from "@/components/post/posts-list";
import { getQueryClient } from "@/provider/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  searchParams: {
    country?: string;
    city?: string;
    district?: string;
    page?: string;
  };
}

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;

  const quetyClient = getQueryClient();
  await quetyClient.prefetchQuery({
    queryKey: ["posts", params],
    queryFn: () => findPostsAll(params),
  });

  const state = dehydrate(quetyClient);
  return (
    <main className="container mx-auto">
      <div className="flex justify-center">
        <HydrationBoundary state={state}>
          <PostsList params={params} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
