import React from "react";
import hero1 from "../images/hero-games/hero1.jpg";
import hero2 from "../images/hero-games/hero2.jpg";
import hero3 from "../images/hero-games/hero3.jpg";
import hero4 from "../images/hero-games/hero4.jpg";
import hero5 from "../images/hero-games/hero5.jpg";
import Image from "next/image";

const MainGames = () => {
  return (
    <div className="hidden relative xl:flex justify-center items-center pb-[200px] max-w-[1440px] m-auto">
      <div className="flex gap-[30px] top-[-200px] absolute z-10">
        <a href="#" className="hover:scale-110 overflow-hidden transition-all">
          <Image src={hero1} alt="Игра 1" />
        </a>
        <a href="#" className="hover:scale-110 overflow-hidden transition-all">
          <Image src={hero2} alt="Игра 2" />
        </a>
        <a href="#" className="hover:scale-110 overflow-hidden transition-all">
          <Image src={hero3} alt="Игра 3" />
        </a>
        <a href="#" className="hover:scale-110 overflow-hidden transition-all">
          <Image src={hero4} alt="Игра 4" />
        </a>
        <a href="#" className="hover:scale-110 overflow-hidden transition-all">
          <Image src={hero5} alt="Игра 5" />
        </a>
      </div>
    </div>
  );
};

export default MainGames;
