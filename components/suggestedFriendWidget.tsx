import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";

const SuggestedFriendWidget = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-red-500 rounded-full"></div>
        <span className="font-medium text-m tracking-wide">UserName</span>
      </div>
      <div>
        <button className="w-12 h-12 bg-emerald-200  rounded-full flex items-center justify-center hover:bg-emerald-50">
          <IoPersonAddOutline className="text-2xl text-emerald-700" />
        </button>
      </div>
    </div>
  );
};

export default SuggestedFriendWidget;
