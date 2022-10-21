import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import formatDate from "../../frontend - lib/formatDate";
import { useAuth } from "../../hooks/useAuth";
import useGetComment from "../../hooks/useGetComment";
import CommentDivider from "./commentDivider";
import ReplyForm from "./replyForm";
import { IComment } from "../../frontend - lib/interfaces";
import { BiLike } from "react-icons/bi";

type TProps = {
  postId: string;
  replyId: string;
};

const CommentReply = ({ postId, replyId }: TProps) => {
  // Custom hook
  const { user } = useAuth();
  const { isLoading, data } = useGetComment(postId, replyId);
  const replyData: IComment = data?.data.comment;

  if (replyData) {
    return (
      <>
        <div className="flex flex-col md:max-w-2xl md:w-full md:mx-auto relative ml-8">
          <CommentDivider />
          <article className="flex gap-6 items-center sm:mb-3">
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
                    <button className="hover:text-red-500">
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
              <button className="text-xl">
                <BiLike />
              </button>
              <span className="text-center text-xl">
                {replyData.likes.length}
              </span>
            </div>
          </article>
          <footer className="flex justify-between px-2 ml-8 mb-1 sm:mb-0 sm:hidden">
            <div className="flex gap-2">
              <button className="text-lg">
                <BiLike />
              </button>
              <span className="text-center text-lg">0</span>
            </div>
            {user?.id === replyData.author._id && (
              <div className="flex gap-4">
                <button className="hover:text-red-500">
                  <IoTrashOutline />
                </button>
                <button className="hover:text-emerald-500">
                  <IoPencilOutline />
                </button>
              </div>
            )}
          </footer>
          <div className="ml-8">
            <ReplyForm commentId={replyData._id} postId={replyData.postId} />
          </div>
        </div>
        {/* if comment has replies - map over ids and fetch */}
        {replyData.replies.map((replyId) => {
          return (
            <CommentReply
              key={replyId}
              postId={replyData.postId}
              replyId={replyId}
            />
          );
        })}
      </>
    );
  }
};

export default CommentReply;
