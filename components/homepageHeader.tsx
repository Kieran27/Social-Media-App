import { useState } from "react";
import Image from "next/image";
import BirdImage from "../assets/birb.svg";
import ProfilePopup from "./profilePopup";
import { IoIosPerson, IoIosChatbubbles } from "react-icons/io";
import { IoPeople, IoPerson } from "react-icons/io5";

const HomepageHeader = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const toggleProfilePopup: (e: any) => void = () => {
    setShowProfilePopup((showProfilePopup) => !showProfilePopup);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-lg">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold tracking-wider">BirbSocial</h1>
      </div>
      <div>
        <ul className="flex items-center gap-5">
          <li>
            <button className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
              <IoPeople className="text-xl" />
            </button>
          </li>
          <li>
            <button className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
              <IoIosChatbubbles className="text-xl" />
            </button>
          </li>
          <li>
            <div onClick={toggleProfilePopup} className="relative">
              <button className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                <IoPerson className="text-xl" />
              </button>
              {showProfilePopup && <ProfilePopup />}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HomepageHeader;
