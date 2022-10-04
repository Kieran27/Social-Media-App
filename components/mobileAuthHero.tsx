import React from "react";
import Image from "next/image";
import BirdImage from "../assets/birb.svg";

const MobileAuthHero = () => {
  return (
    <div className="h-32 w-full bg-emerald-500">
      <Image src={BirdImage} alt="Picture of bird" width={500} height={500} />
    </div>
  );
};

export default MobileAuthHero;
