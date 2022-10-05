import React from "react";
import Image from "next/image";
import BirdImage from "../assets/birb.svg";

const MobileAuthHero = () => {
  return (
    <div className=" xl:hidden w-full bg-emerald-200 flex items-center justify-center py-3 gap-5">
      <div className="max-w-sm">
        <Image src={BirdImage} alt="Picture of bird" width={125} height={125} />
      </div>
      <div className="text-center">
        <h2 className="text-5xl font-bold tracking-wider">Birber</h2>
        <p className="mt-3 text-lg">Talk with your friends</p>
      </div>
    </div>
  );
};

export default MobileAuthHero;
