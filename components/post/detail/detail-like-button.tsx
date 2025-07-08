import { Icon } from "@/components/ui/icon";
import { useToggleLike } from "@/hooks/query/use-like";
import { useFindPostById } from "@/hooks/query/use-posts";
import { cn } from "@/lib/utils";

export default function DetailLikeButton({
  postId,
  userId,
}: {
  postId?: number;
  userId?: string;
}) {
  const { data } = useFindPostById(postId || 0);
  const toggleLike = useToggleLike();
  function toggleLikeHandler() {
    toggleLike.mutate(data.id);
  }

  return (
    <button
      className={cn(
        "border px-4 py-2.5 flex h-full w-fit items-center gap-2 text-lg rounded-xl hover:border-primary cursor-pointer",
        {
          "border-primary": data?.like?.some(
            (like: { userId: string }) => like.userId === userId
          ),
        }
      )}
      onClick={toggleLikeHandler}
    >
      <Icon.like
        className={cn({
          "size-6 stroke-2 stroke-white fill-[#00000080] like-drop-shadow":
            true,
          "fill-[#ff385c]": data?.like?.some(
            (like: { userId: string }) => like.userId === userId
          ),
        })}
      />{" "}
      좋아요
    </button>
  );
}
