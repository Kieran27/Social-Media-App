import formatDate from "../../frontend - lib/formatDate";
import { Dispatch, SetStateAction } from "react";
import { IComment } from "../../frontend - lib/interfaces";
import { useAuth } from "../../hooks/useAuth";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";

type TProps = {
  replyData: IComment;
  setCommentId: Dispatch<SetStateAction<string>>;
  toggle: () => void;
  toggleEdit: () => void;
};

const CommentReplyBody = ({
  replyData,
  setCommentId,
  toggle,
  toggleEdit,
}: TProps) => {
  // Custom hook to get user data
  const { user } = useAuth();

  return (
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
            <button onClick={toggleEdit} className="hover:text-emerald-500">
              <IoPencilOutline />
            </button>
          </div>
        )}
      </header>
      <p className="text-sm">{replyData.content}</p>
    </div>
  );
};

export default CommentReplyBody;
