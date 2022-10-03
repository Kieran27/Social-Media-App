import React from "react";
import Image from "next/image";
import BirdImage from "../assets/birb.svg";
import { IoIosPerson, IoIosChatbubbles } from "react-icons/io";
import { IoPeople, IoPerson } from "react-icons/io5";

const HomepageHeader = () => {
  return (
    <header className="bg-emerald-200 flex justify-between items-center px-12 py-5">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold tracking-wider">BirbSocial</h1>
      </div>
      <div>
        <ul className="flex items-center gap-5">
          <li>
            <button className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <IoPeople className="text-2xl" />
            </button>
          </li>
          <li>
            <button className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <IoIosChatbubbles className="text-2xl" />
            </button>
          </li>
          <li>
            <button className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <IoPerson className="text-2xl" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HomepageHeader;
