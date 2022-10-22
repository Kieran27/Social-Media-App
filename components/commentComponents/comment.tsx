import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import formatDate from "../../frontend - lib/formatDate";
import { useAuth } from "../../hooks/useAuth";
import ReplyForm from "./replyForm";
import CommentReply from "./commentReply";
import { IComment } from "../../frontend - lib/interfaces";
import useLike from "../../hooks/useLike";
import { BiLike } from "react-icons/bi";
import { Dispatch, SetStateAction, useState } from "react";

type TProps = {
  commentData: IComment;
  toggle: () => void;
  setCommentId: Dispatch<SetStateAction<string>>;
};

const Comment = ({ commentData, toggle, setCommentId }: TProps) => {
  // Custom hook to get user details
  const { user } = useAuth();

  // Custom hook to handle likes
  const { isLoading, mutate, handleLike, likes, liked } = useLike(commentData);

  return (
    <>
      <section className="flex flex-col gap-5">
        <article className="flex flex-col">
          <div className="flex gap-6 items-center">
            <div className="h-12 min-w-[3rem] hidden bg-emerald-400 rounded-full sm:block"></div>
            <div className="flex-grow bg-gray-100 rounded-3xl px-5 py-4">
              <header className="flex justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-5 w-5 bg-emerald-400 rounded-full sm:hidden mr-2"></div>
                  <p className="text-sm font-semibold tracking-wide">
                    {commentData.author.username} |
                    <span className="text-gray-400 font-medium tracking-normal ml-2">
                      {formatDate(commentData.timestamp)}
                    </span>
                  </p>
                </div>
                {user?.id === commentData.author._id && (
                  <div className="hidden sm:flex gap-4">
                    <button
                      onClick={() => {
                        setCommentId(commentData._id);
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
              <p className="text-sm">{commentData.content}</p>
            </div>
            <div className="hidden sm:flex flex-col">
              <button onClick={handleLike} className="text-xl">
                <BiLike className={liked ? "text-red-500" : "text-black"} />
              </button>
              <span className="text-center text-xl">{likes}</span>
            </div>
          </div>
          <footer className="flex justify-between px-2 sm:hidden">
            <div className="flex gap-2">
              <button className="text-lg" onClick={handleLike}>
                <BiLike className={liked ? "text-red-500" : "text-black"} />
              </button>
              <span className="text-center text-lg"> {likes}</span>
            </div>
            {user?.id === commentData.author._id && (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setCommentId(commentData._id);
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
        </article>
        {/* if comment has replies - map over ids and fetch */}
        {commentData.replies.map((replyId) => {
          return (
            <CommentReply
              key={replyId}
              postId={commentData.postId}
              replyId={replyId}
              toggle={toggle}
              setCommentId={setCommentId}
            />
          );
        })}
        <div className="md:max-w-2xl md:w-full md:mx-auto">
          <ReplyForm commentId={commentData._id} postId={commentData.postId} />
        </div>
      </section>
    </>
  );
};

export default Comment;
