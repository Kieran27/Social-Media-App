import { useRef } from "react";
import FriendRequest from "./friendRequest";
import useOnClickOutside from "../hooks/useOnClickOutside";
import {
  IoPeople,
  IoPerson,
  IoChevronForwardSharp,
  IoLogOutOutline,
  IoLogoGithub,
} from "react-icons/io5";

type TProps = {
  friendRequestsPopup: () => void;
};

const FriendRequestsPopup = ({ friendRequestsPopup }: TProps) => {
  // Create ref to register when the user clicks outside of component
  const popupRef = useRef(null);

  // Custom hook to close popup on outside clicks
  useOnClickOutside(popupRef, () => friendRequestsPopup());

  return (
    <div
      ref={popupRef}
      className="absolute mt-2 right-0 bg-white shadow-xl border border-slate-200 px-3 py-5 rounded-md w-80 z-20"
    >
      <div className="flex flex-col gap-4">
        <FriendRequest />
        <FriendRequest />
        <FriendRequest />
      </div>
    </div>
  );
};

export default FriendRequestsPopup;
