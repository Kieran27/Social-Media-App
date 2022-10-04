import React from "react";
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
      <div className="flex">
        <ul className="flex flex-col min-w-full">
          <li>
            <a
              href=""
              className="flex justify-between items-center py-3 px-3 rounded-xl hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                  <IoPeople className="text-xl" />
                </div>
                <span className="font-medium tracking-wide">
                  Friend Requests
                </span>
              </div>
              <div>
                <IoChevronForwardSharp className="text-xl" />
              </div>
            </a>
          </li>
          <li>
            <a
              href=""
              className="flex justify-between items-center py-3 px-3 rounded-xl hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                  <IoPeople className="text-xl" />
                </div>
                <span className="font-medium tracking-wide">Friends</span>
              </div>
              <div>
                <IoChevronForwardSharp className="text-xl" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FriendRequestsPopup;
