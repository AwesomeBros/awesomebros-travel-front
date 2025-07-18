import { Icon } from "@/components/ui/icon";
import { useIsLiked, useToggleLike } from "@/hooks/query/use-likes";
import { cn } from "@/lib/utils";

export default function DetailLikeButton({ postId }: { postId?: number }) {
  const toggleLike = useToggleLike();
  const { data: isLiked } = useIsLiked(postId);
  function toggleLikeHandler() {
    toggleLike.mutate(postId);
  }

  return (
    <button
      className={cn(
        "border px-4 py-2.5 flex h-full w-fit items-center gap-2 text-lg rounded-xl hover:border-primary cursor-pointer",
        {
          "border-primary": isLiked,
        }
      )}
      onClick={toggleLikeHandler}
    >
      <Icon.like
        className={cn({
          "size-6 stroke-2 stroke-white fill-[#00000080] like-drop-shadow":
            true,
          "fill-[#ff385c]": isLiked,
        })}
      />{" "}
      좋아요
    </button>
  );
}
