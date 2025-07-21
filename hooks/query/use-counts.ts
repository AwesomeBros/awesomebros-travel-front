import { findCountsByPostId } from "@/actions/counts.actions";
import { useQuery } from "@tanstack/react-query";

export function useFindCountsByPostId(posts_id?: number) {
  const query = useQuery({
    enabled: !!posts_id,
    queryKey: ["count", { posts_id }],
    queryFn: () => findCountsByPostId(posts_id),
    retry: false,
  });
  return query;
}
