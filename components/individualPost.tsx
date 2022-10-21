import {
  IoChatbubbleOutline,
  IoTrashOutline,
  IoPencilOutline,
} from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import formatDate from "../frontend - lib/formatDate";
import { IPost } from "../frontend - lib/interfaces";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import DeletePost from "./postCreation/deletePost";
import useToggle from "../hooks/useToggle";

interface IProps {
  postData: IPost;
  postId: string;
  toggleEditForm: () => void;
}

const IndividualPost = ({ postData, postId, toggleEditForm }: IProps) => {
  const [liked, setLiked] = useState(false);

  // Custom hooks
  const { user } = useAuth();
  const { toggle, isToggled } = useToggle();

  const likePost = () => {
    setLiked((liked) => !liked);
  };

  return (
    <>
      {isToggled && <DeletePost toggle={toggle} postId={postId} />}
      <div className="w-full px-5 py-3 flex gap-8 border-b">
        <div className="hidden sm:block">
          <div className="h-12 w-12 bg-emerald-500 rounded-full"></div>
        </div>
        <div className="flex-grow">
          <header className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 bg-emerald-500 rounded-full sm:hidden"></div>
              <span className="font-semibold tracking-wide text-lg">
                {postData?.author.username}
              </span>
              <span className="text-lg"> | </span>
              <span className="text-gray-500 text-sm">
                {postData?.timestamp}
              </span>
            </div>
            {user?.id && (
              <div className="flex gap-5 text-lg sm:text-xl">
                <button className="hover:text-red-500" onClick={toggle}>
                  <IoTrashOutline />
                </button>
                <button
                  className="hover:text-emerald-500"
                  onClick={toggleEditForm}
                >
                  <IoPencilOutline />
                </button>
              </div>
            )}
          </header>
          <div>
            <p>{postData?.content}</p>
          </div>
          <footer className="flex justify-start sm:justify-center mt-6 gap-4 sm:gap-16">
            <div className="flex items-center gap-3 text-xl text-gray-700">
              <IoChatbubbleOutline />
              <span>{postData?.comments?.length}</span>
            </div>
            <button
              onClick={likePost}
              className="flex items-center gap-3 text-xl text-gray-700"
            >
              <BiLike
                className={liked ? "text-orange-500 animate-wiggle" : ""}
              />
              <span>{postData?.likes?.length || 0}</span>
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default IndividualPost;
