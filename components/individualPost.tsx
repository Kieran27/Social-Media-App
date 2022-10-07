import { IoChatbubbleOutline, IoThumbsUpOutline } from "react-icons/io5";
import { useState } from "react";

const IndividualPost = () => {
  const [liked, setLiked] = useState(false);

  const likePost = () => {
    setLiked((liked) => !liked);
  };

  return (
    <div className="w-full px-5 py-3 flex gap-8 border-b">
      <div>
        <div className="h-12 w-12 bg-emerald-500 rounded-full"></div>
      </div>
      <div>
        <header className="flex items-center gap-3 mb-5">
          <span className="font-semibold tracking-wide text-lg">
            Post Author
          </span>
          <span className="text-lg"> | </span>
          <span className="text-gray-500 text-sm">Date</span>
        </header>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            qui laborum placeat doloremque illo soluta eligendi molestiae
            praesentium impedit ab.
          </p>
        </div>
        <footer className="flex justify-center mt-6 gap-16">
          <div className="flex items-center gap-3 text-xl text-gray-700">
            <IoChatbubbleOutline />
            <span>0</span>
          </div>
          <button
            onClick={likePost}
            className="flex items-center gap-3 text-xl text-gray-700"
          >
            <IoThumbsUpOutline
              className={liked ? "text-orange-500 animate-wiggle" : ""}
            />
            <span>0</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default IndividualPost;
