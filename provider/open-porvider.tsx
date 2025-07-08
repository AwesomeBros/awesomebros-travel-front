import ShareDialog from "@/components/post/detail/share-dialog";
import PostEditDialog from "@/components/post/form/post-edit-dialog";
import PostWriteDialog from "@/components/post/form/post-write-dialog";

export default function OpenProvider() {
  return (
    <>
      <PostWriteDialog />
      <PostEditDialog />
      <ShareDialog />
    </>
  );
}
