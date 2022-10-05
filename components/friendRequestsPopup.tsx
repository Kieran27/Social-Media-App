import React from "react";
import FriendRequest from "./friendRequest";
import {
  IoPeople,
  IoPerson,
  IoChevronForwardSharp,
  IoLogOutOutline,
  IoLogoGithub,
} from "react-icons/io5";

const FriendRequestsPopup = () => {
  return (
    <div className="absolute mt-2 right-0 bg-white shadow-xl border border-slate-200 px-3 py-5 rounded-md w-80">
      <div className="flex flex-col gap-4">
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
      </div>
    </div>
  );
};

export default FriendRequestsPopup;
