import { IoChatbubbleOutline, IoThumbsUpOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import post from "../api - lib/models/post";

const Post = ({ postData }: any) => {
  const [liked, setLiked] = useState(false);
  console.log(postData);

  const likePost = () => {
    setLiked((liked) => !liked);
  };

  return (
    <Link href={`/post/${postData._id}`}>
      <a>
        <div className="w-full px-5 py-3 flex gap-8 border-b hover:bg-slate-100">
          <div>
            <div className="h-12 w-12 bg-emerald-500 rounded-full"></div>
          </div>
          <div className="flex-grow">
            <header className="flex items-center gap-3 mb-5">
              <span className="font-semibold tracking-wide text-lg">
                {postData.author[0].username}
              </span>
              <span className="text-lg"> | </span>
              <span className="text-gray-500 text-sm">
                {postData.timestamp}
              </span>
            </header>
            <div>
              <p>{postData.content}</p>
            </div>
            <footer className="flex justify-center mt-6 gap-16">
              <div className="flex items-center gap-3 text-xl text-gray-700">
                <IoChatbubbleOutline />
                <span>{postData.comments.length}</span>
              </div>
              <button
                onClick={likePost}
                className="flex items-center gap-3 text-xl text-gray-700"
              >
                <IoThumbsUpOutline
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
