import { findCountsByPostId } from "@/actions/counts.actions";
import { useQuery } from "@tanstack/react-query";

export function useFindCountsByPostId(postId?: number) {
  const query = useQuery({
    enabled: !!postId,
    queryKey: ["count", { postId }],
    queryFn: () => findCountsByPostId(postId),
  });
  return query;
}
