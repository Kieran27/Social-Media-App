import React from "react";
import FriendRequest from "./friendRequest";
import SuggestedFriendWidget from "./suggestedFriendWidget";

const FriendSuggestions = () => {
  return (
    <div className="col-span-3 bg-white shadow-xl py-8 px-5 rounded-2xl">
      <div className="flex justify-between">
        <h3 className="font-semibold text-xl">Friend Suggestions</h3>
        <a href="#"> See More </a>
      </div>
      <div className="mt-6 flex flex-col gap-7">
        <SuggestedFriendWidget />
        <SuggestedFriendWidget />
        <SuggestedFriendWidget />
      </div>
    </div>
  );
};

export default FriendSuggestions;
