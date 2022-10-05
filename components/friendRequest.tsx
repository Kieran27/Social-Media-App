import React from "react";

const FriendRequest = () => {
  return (
    <div className="flex flex-col border-b gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-200"></div>
          <span className="text-base">Friend Name sent a friend request</span>
        </div>
        <div>
          <div className="w-5 h-5 rounded-full bg-emerald-500"></div>
        </div>
      </div>
      <div className="flex justify-center gap-4 pb-2">
        <button className="bg-emerald-500 text-white font-bold py-2 px-5 rounded-xl hover:bg-emerald-300">
          Accept
        </button>
        <button className="bg-gray-400 text-white font-bold py-2 px-5 rounded-xl hover:bg-gray-300">
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
