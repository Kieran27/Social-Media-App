import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import formatDate from "../../frontend - lib/formatDate";
import { useAuth } from "../../hooks/useAuth";
import { IComment } from "../../frontend - lib/interfaces";
import { BiLike } from "react-icons/bi";

type TProps = {
  commentData: IComment;
};

const Comment = ({ commentData }: TProps) => {
  // Custom hook to get user details
  const { user } = useAuth();
  return (
    <div className="flex flex-col md:max-w-2xl md:w-full md:mx-auto">
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
                <button className="hover:text-red-500">
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
          <button className="text-xl">
            <BiLike />
          </button>
          <span className="text-center text-xl">
            {commentData.likes.length}
          </span>
        </div>
      </div>
      <footer className="flex justify-between px-2 sm:hidden">
        <div className="flex gap-2">
          <button className="text-lg">
            <BiLike />
          </button>
          <span className="text-center text-lg">0</span>
        </div>
        {user?.id === commentData.author._id && (
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
    </div>
  );
};

export default Comment;
