import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import formatDate from "../../frontend - lib/formatDate";
import { useAuth } from "../../hooks/useAuth";
import useGetComment from "../../hooks/useGetComment";
import CommentDivider from "./commentDivider";
import useLike from "../../hooks/useLike";
import ReplyForm from "./replyForm";
import { IComment } from "../../frontend - lib/interfaces";
import { BiLike } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  postId: string;
  replyId: string;
  toggle: () => void;
  setCommentId: Dispatch<SetStateAction<string>>;
};

const CommentReply = ({ postId, replyId, toggle, setCommentId }: TProps) => {
  // Custom hook
  const { user } = useAuth();
  const { isLoading, data } = useGetComment(postId, replyId);
  const replyData: IComment = data?.data.comment;

  // Custom hook to handle likes
  const { mutate, handleLike, likes, liked } = useLike(replyData);

  if (replyData) {
    return (
      <>
        <div className="flex flex-col relative ml-4 md:ml-8">
          <div className="relative">
            <CommentDivider />
            <article className="flex gap-6 items-center relative sm:mb-3">
              <div className="h-12 min-w-[3rem] hidden bg-emerald-400 rounded-full sm:block"></div>
              <div className="flex-grow bg-gray-100 rounded-3xl px-5 py-4">
                <header className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-emerald-400 rounded-full sm:hidden mr-2"></div>
                    <p className="text-sm font-semibold tracking-wide">
                      {replyData.author.username} |
                      <span className="text-gray-400 font-medium tracking-normal ml-2">
                        {formatDate(replyData.timestamp)}
                      </span>
                    </p>
                  </div>
                  {user?.id === replyData.author._id && (
                    <div className="hidden sm:flex gap-4">
                      <button
                        onClick={() => {
                          setCommentId(replyData._id);
                          toggle();
                        }}
                        className="hover:text-red-500"
                      >
                        <IoTrashOutline />
                      </button>
                      <button className="hover:text-emerald-500">
                        <IoPencilOutline />
                      </button>
                    </div>
                  )}
                </header>
                <p className="text-sm">{replyData.content}</p>
              </div>
              <div className="hidden sm:flex flex-col">
                <button onClick={handleLike} className="text-xl">
                  <BiLike className={liked ? "text-red-500" : "text-black"} />
                </button>
                <span className="text-center text-xl">{likes}</span>
              </div>
            </article>
            <footer className="flex justify-between px-2 ml-8 mb-1 sm:mb-0 sm:hidden">
              <div className="flex gap-2">
                <button onClick={handleLike} className="text-lg">
                  <BiLike className={liked ? "text-red-500" : "text-black"} />
                </button>
                <span className="text-center text-lg">{likes}</span>
              </div>
              {user?.id === replyData.author._id && (
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setCommentId(replyData._id);
                      toggle();
                    }}
                    className="hover:text-red-500"
                  >
                    <IoTrashOutline />
                  </button>
                  <button className="hover:text-emerald-500">
                    <IoPencilOutline />
                  </button>
                </div>
              )}
            </footer>

            <ReplyForm commentId={replyData._id} postId={replyData.postId} />
          </div>
          {/* if comment has replies - map over ids and fetch */}
          {replyData.replies.map((replyId) => {
            return (
              <CommentReply
                key={replyId}
                postId={replyData.postId}
                replyId={replyId}
                toggle={toggle}
                setCommentId={setCommentId}
              />
            );
          })}
        </div>
      </>
    );
  }
};

export default CommentReply;
