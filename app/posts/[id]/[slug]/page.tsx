import { findPostById } from "@/actions/post.actions";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { NO_IMG } from "@/constants";
import { PostType } from "@/type/post.type";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: number; slug: string }>;
}) {
  const session = await auth();
  const { id, slug } = await params;
  const response = await findPostById(id);
  const post: PostType = response.body;
  console.log("post", post);
  if (!post) notFound();
  const currentURL = `/posts/${id}/${slug}`;
  const targetURL = `/posts/${id}/${encodeURIComponent(post.slug)}`;
  if (currentURL !== targetURL) {
    redirect(targetURL);
  }

  return (
    <div className="py-[100px] flex justify-center">
      <div className="w-[996px] flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[20px]">
            <div className="text-black text-[32px] font-medium leading-[140%]">
              {post.title}
            </div>
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-[8px]">
                <div className="relative size-[32px] overflow-hidden rounded-full">
                  <Image
                    src={post.users.url || NO_IMG}
                    fill
                    alt="user"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="text-[#000000b3] text-[16px] font-medium leading-[140%] cursor-pointer">
                  {post.users.username}
                </div>
                <div className="text-[#00000066] text-[16px] font-normal leading-[140%]">
                  {"|"}
                </div>
                <div className="text-[#00000066] text-[16px] font-normal leading-[140%]">
                  {format(post.createdAt, "yyyy-MM-dd HH:mm")}
                </div>
              </div>
              {/* {isWriter && (
              <div className="icon-button" onClick={onMoreButtonClickHandler}>
                <div className="icon more-icon"></div>
              </div>
            )} */}
              {session?.user.id === post.users.id && (
                <div className="board-detail-more-box">
                  <div className="board-detail-update-button">{"수정"}</div>
                  <div className="divider"></div>
                  <div className="board-detail-delete-button">{"삭제"}</div>
                </div>
              )}
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-[20px]">
            <div
              className="text-[#000000b3] text-[18px] font-medium leading-[150%] min-h-[500px]"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />

            {/* {board.boardImageList.map((image) => (
            <img className="board-detail-main-image" src={image} />
          ))} */}
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[12px]">
            {/* <div className="board-detail-bottom-button-group">
            <div className="icon-button" onClick={onFavoriteClickHandler}>
              {isFavorite ? (
                <div className="icon favorite-fill-icon"></div>
              ) : (
                <div className="icon favorite-light-icon"></div>
              )}
            </div>
            <div className="board-detail-bottom-button-text">{`좋아요 ${favoriteList.length}`}</div>
            <div className="icon-button" onClick={onShowFavoriteClickHandler}>
              {showFavorite ? (
                <div className="icon up-light-icon"></div>
              ) : (
                <div className="icon down-light-icon"></div>
              )}
            </div>
          </div> */}
            <div className="flex items-center gap-[6px]">
              <div className="icon-button">
                <div className="icon comment-icon"></div>
              </div>
              {/* <div className="board-detail-bottom-button-text">{`댓글 ${totalCommentCount}`}</div>
            <div className="icon-button" onClick={onShowCommentClickHandler}>
              {showComment ? (
                <div className="icon up-light-icon"></div>
              ) : (
                <div className="icon down-light-icon"></div>
              )}
            </div> */}
            </div>
          </div>
          {/* {showFavorite && (
          <div className="board-detail-bottom-favorite-box">
            <div className="board-detail-bottom-favorite-container">
              <div className="board-detail-bottom-favorite-title">
                {"좋아요 "}
                <span className="emphasis">{favoriteList.length}</span>
              </div>
              <div className="board-detail-bottom-favorite-contents">
                {favoriteList.map((item) => (
                  <FavoriteItem favoriteListItem={item} />
                ))}
              </div>
            </div>
          </div>
        )}
        {showComment && (
          <div className="board-detail-bottom-comment-box">
            <div className="board-detail-bottom-comment-container">
              <div className="board-detail-bottom-comment-title">
                {"댓글 "}
                <span className="emphasis">{totalCommentCount}</span>
              </div>
              <div className="board-detail-bottom-comment-list-container">
                {viewList.map((item) => (
                  <CommentItem commentListItem={item} />
                ))}
              </div>
            </div>
            <div className="divider"></div>
            <div className="board-detail-bottom-comment-pagination-box">
              <Pagination
                currentPage={currentPage}
                currentSection={currentSection}
                setCurrentPage={setCurrentPage}
                setCurrentSection={setCurrentSection}
                viewPageList={viewPageList}
                totalSection={totalSection}
              />
            </div>
            {loginUser !== null && (
              <div className="board-detail-bottom-comment-input-box">
                <div className="board-detail-bottom-comment-input-container">
                  <textarea
                    ref={commentRef}
                    className="board-detail-bottom-comment-textarea"
                    placeholder="댓글을 작성해주세요."
                    value={comment}
                    onChange={onCommentChangeHandler}
                  />
                  <div className="board-detail-bottom-comment-button-box">
                    <div
                      className={
                        comment === "" ? "disable-button" : "black-button"
                      }
                      onClick={onCommentSubmitButtonClickHandler}
                    >
                      {"댓글달기"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )} */}
          <Link href={"/post"} className="w-full shadow-sm border rounded-lg">
            목록
          </Link>
        </div>
      </div>
    </div>
  );
}
