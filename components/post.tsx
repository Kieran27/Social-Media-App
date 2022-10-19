import { IoChatbubbleOutline, IoThumbsUpOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import Link from "next/link";
import formatDate from "../frontend - lib/formatDate";
import { useState } from "react";
import { IPost } from "../frontend - lib/interfaces";

type TProps = {
  postData: IPost;
};

const Post = ({ postData }: TProps) => {
  const [liked, setLiked] = useState(false);

  const likePost = () => {
    setLiked((liked) => !liked);
  };

  return (
    <Link href={`/post/${postData._id}`}>
      <a>
        <div className="w-full px-5 py-3 flex gap-8 border-b hover:bg-slate-100">
          <div className="hidden sm:block">
            <div className="h-12 w-12 bg-emerald-500 rounded-full"></div>
          </div>
          <div className="flex-grow">
            <header className="flex items-center gap-3 mb-5">
              <div className="h-7 w-7 bg-emerald-500 rounded-full sm:hidden"></div>
              <span className="font-semibold tracking-wide text-lg">
                {postData.author[0].username}
              </span>
              <span className="text-lg"> | </span>
              <span className="text-gray-500 text-sm">
                {formatDate(postData.timestamp)}
              </span>
            </header>
            <div>
              <p>{postData.content}</p>
            </div>
            <footer className="flex justify-start sm:justify-center mt-6 gap-4 sm:gap-16">
              <div className="flex items-center gap-3 text-xl text-gray-700">
                <IoChatbubbleOutline />
                <span>{postData.comments?.length}</span>
              </div>
              <button
                onClick={likePost}
                className="flex items-center gap-3 text-xl text-gray-700"
              >
                <BiLike
                  className={liked ? "text-orange-500 animate-wiggle" : ""}
                />
                <span>{postData.likes?.length || 0}</span>
              </button>
            </footer>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
