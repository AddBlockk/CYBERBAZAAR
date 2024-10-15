import React from "react";
import hero from "../images/hero.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={hero}
        alt="Hero"
        className="blur-sm top-[-10px] z-[1] brightness-75 rounded-bl-3xl rounded-br-3xl w-full h-auto"
      />
      <h1 className="uppercase absolute text-white top-[200px] text-[64px] font-bold drop-shadow-lg z-[2] select-none">
        Ваш кибер-рынок
      </h1>
    </div>
  );
};

export default Hero;
