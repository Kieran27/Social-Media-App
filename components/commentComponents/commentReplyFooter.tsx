import { Dispatch, SetStateAction } from "react";
import { IComment } from "../../frontend - lib/interfaces";
import { useAuth } from "../../hooks/useAuth";
import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";

type TProps = {
  replyData: IComment;
  handleLike: () => void;
  liked: boolean;
  likes: number;
  toggle: () => void;
  toggleEdit: () => void;
  setCommentId: Dispatch<SetStateAction<string>>;
};

const CommentReplyFooter = ({
  replyData,
  handleLike,
  liked,
  likes,
  toggle,
  toggleEdit,
  setCommentId,
}: TProps) => {
  // Custom hook to get user data
  const { user } = useAuth();

  return (
    <footer className="flex justify-between px-2 ml-2 mb-1 sm:mb-0 sm:hidden">
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
          <button onClick={toggleEdit} className="hover:text-emerald-500">
            <IoPencilOutline />
          </button>
        </div>
      )}
    </footer>
  );
};

export default CommentReplyFooter;
