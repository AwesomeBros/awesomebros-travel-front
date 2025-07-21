import { Icon } from "@/components/ui/icon";
import { useIsLiked, useToggleLike } from "@/hooks/query/use-likes";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DetailLikeButton({ postId }: { postId?: number }) {
  const { data: session } = useSession({ required: true });
  const toggleLike = useToggleLike();
  const { data: isLiked } = useIsLiked(postId);
  const router = useRouter();
  function toggleLikeHandler() {
    if (!session) {
      toast.error("로그인이 필요한 서비스입니다.");
      router.push("/users/login");
    } else {
      toggleLike.mutate(postId);
    }
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
