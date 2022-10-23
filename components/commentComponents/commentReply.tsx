import { useAuth } from "../../hooks/useAuth";
import useGetComment from "../../hooks/useGetComment";
import CommentDivider from "./commentDivider";
import useLike from "../../hooks/useLike";
import CommentReplyBody from "./commentReplyBody";
import ReplyForm from "./replyForm";
import useUpdateComment from "../../hooks/useUpdateComment";
import EditComment from "./editComment";
import CommentReplyFooter from "./commentReplyFooter";
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
  // Custom hook to get user data
  const { user } = useAuth();

  // Custom hook to fetch comment
  const { isLoading, data } = useGetComment(postId, replyId);
  const replyData: IComment = data?.data.comment;

  // Custom hook to handle likes
  const { handleLike, likes, liked } = useLike(replyData);

  // Custom hook to determine comment edit component
  const { editOpen, toggleEdit } = useUpdateComment();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (replyData) {
    return (
      <>
        <div className="flex flex-col relative ml-4 md:ml-8">
          <div className="relative">
            <CommentDivider />
            <article className="flex gap-6 items-center relative sm:mb-3">
              <div className="h-12 min-w-[3rem] hidden bg-emerald-400 rounded-full sm:block"></div>
              {editOpen ? (
                <EditComment replyData={replyData} toggleEdit={toggleEdit} />
              ) : (
                <CommentReplyBody
                  replyData={replyData}
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
            </article>
            <CommentReplyFooter
              replyData={replyData}
              handleLike={handleLike}
              liked={liked}
              likes={likes}
              toggle={toggle}
              toggleEdit={toggleEdit}
              setCommentId={setCommentId}
            />

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
