import React from "react";
import FriendRequest from "./friendRequest";
import SuggestedFriendWidget from "./suggestedFriendWidget";

const FriendSuggestions = () => {
  return (
    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-white shadow-xl py-8 px-5 rounded-2xl self-start sticky top-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">Friend Suggestions</h3>
        <a className="text-sm hover:text-gray-300" href="#">
          See More
        </a>
      </div>
      <div className="mt-6 flex flex-col gap-7">
        <SuggestedFriendWidget />
        <SuggestedFriendWidget />
        <SuggestedFriendWidget />
        <SuggestedFriendWidget />
      </div>
    </aside>
  );
};

export default FriendSuggestions;
