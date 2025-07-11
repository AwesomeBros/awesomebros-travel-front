import CommentEditDialog from "@/components/comment/comment-edit-dialog";
import ShareDialog from "@/components/post/detail/share-dialog";
import PostEditDialog from "@/components/post/form/post-edit-dialog";
import PostWriteDialog from "@/components/post/form/post-write-dialog";
import UserEditDialog from "@/components/users/info/user-edit-dialog";

export default function OpenProvider() {
  return (
    <>
      <PostWriteDialog />
      <PostEditDialog />
      <ShareDialog />
      <CommentEditDialog />
      <UserEditDialog />
    </>
  );
}
