import ReplyForm from "./replyForm";
import CommentReply from "./commentReply";
import { IComment } from "../../frontend - lib/interfaces";
import useLike from "../../hooks/useLike";
import { BiLike } from "react-icons/bi";
import useUpdateComment from "../../hooks/useUpdateComment";
import CommentReplyBody from "./commentReplyBody";
import EditComment from "./editComment";
import { Toaster } from "react-hot-toast";
import CommentReplyFooter from "./commentReplyFooter";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  commentData: IComment;
  toggle: () => void;
  setCommentId: Dispatch<SetStateAction<string>>;
};

const Comment = ({ commentData, toggle, setCommentId }: TProps) => {
  // Custom hook to handle likes
  const { handleLike, likes, liked } = useLike(commentData);

  // Custom hook to determine comment edit component
  const { editOpen, toggleEdit } = useUpdateComment();

  return (
    <>
      <section className="flex flex-col gap-5">
        <article className="flex flex-col">
          <div className="flex gap-6 items-center">
            <div className="h-12 min-w-[3rem] hidden bg-emerald-400 rounded-full sm:block"></div>
            {editOpen ? (
              <EditComment replyData={commentData} toggleEdit={toggleEdit} />
            ) : (
              <CommentReplyBody
                replyData={commentData}
                setCommentId={setCommentId}
                toggle={toggle}
                toggleEdit={toggleEdit}
              />
            )}
            <div className="hidden sm:flex flex-col">
              <button onClick={handleLike} className="text-xl">
                <BiLike className={liked ? "text-red-500" : "text-black"} />
              </button>
              <span className="text-center text-xl">{likes}</span>
            </div>
          </div>
          <CommentReplyFooter
            replyData={commentData}
            handleLike={handleLike}
            liked={liked}
            likes={likes}
            toggle={toggle}
            toggleEdit={toggleEdit}
            setCommentId={setCommentId}
          />
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
      <Toaster />
    </>
  );
};

export default Comment;
