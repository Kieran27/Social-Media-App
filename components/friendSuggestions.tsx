import React from "react";
import FriendRequest from "./friendRequest";

const FriendSuggestions = () => {
  return (
    <div className="w-1/6 bg-white shadow-xl py-3 px-5 rounded-2xl">
      <div className="flex justify-between">
        <h2>Friend Suggestions</h2>
        <a href="#"> See More </a>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
      </div>
    </div>
  );
};

export default FriendSuggestions;
