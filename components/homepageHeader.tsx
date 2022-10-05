import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import BirdImage from "../assets/birb.svg";
import ProfilePopup from "./profilePopup";
import FriendRequestCount from "./friendRequestCount";
import FriendRequestsPopup from "./friendRequestsPopup";
import { IoIosPerson, IoIosChatbubbles } from "react-icons/io";
import { IoPeople, IoPerson } from "react-icons/io5";

const HomepageHeader = () => {
  // Define state
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showFriendRequestsPopup, setShowFriendsRequestsPopup] =
    useState(false);

  // Component Logic
  const toggleProfilePopup: () => void = () => {
    if (showFriendRequestsPopup) {
      toggleFriendRequestsPopup();
    }
    setShowProfilePopup((showProfilePopup) => !showProfilePopup);
  };

  const toggleFriendRequestsPopup: () => void = () => {
    if (showProfilePopup) {
      toggleProfilePopup();
    }
    setShowFriendsRequestsPopup(
      (showFriendRequestsPopup) => !showFriendRequestsPopup
    );
  };

  return (
    <header className="flex justify-between items-center px-6 py-4">
      <div className="flex items-center">
        <Link href="/home" className="cursor-pointer">
          <a>
            <h1 className="text-3xl font-semibold tracking-wider">
              BirbSocial
            </h1>
          </a>
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-5">
          <li className="relative">
            <button
              aria-label="friend requests"
              onClick={toggleFriendRequestsPopup}
              className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center"
            >
              <IoPeople className="text-xl" />
            </button>
            <FriendRequestCount />
          </li>
          <li>
            <button
              aria-label="messages"
              className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center"
            >
              <IoIosChatbubbles className="text-xl" />
            </button>
          </li>
          <li>
            <div className="relative">
              <button
                aria-label="profile"
                onClick={toggleProfilePopup}
                className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center"
              >
                <IoPerson className="text-xl" />
              </button>
              {showProfilePopup && (
                <ProfilePopup profilePopupState={setShowProfilePopup} />
              )}
              {showFriendRequestsPopup && (
                <FriendRequestsPopup
                  friendRequestsPopup={setShowFriendsRequestsPopup}
                />
              )}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HomepageHeader;
