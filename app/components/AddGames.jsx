import React from "react";
import addGames from "../images/addGames.jpg";
import Image from "next/image";

const AddGames = () => {
  return (
    <div className="relative mt-[150px]">
      <Image
        src={addGames}
        alt="Hero"
        className="z-[1] brightness-75 select-none w-full h-auto"
      />
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <div className="max-w-[1920px] w-full text-center">
          <h1 className="uppercase text-white text-[32px] font-medium drop-shadow-lg select-none mb-[20px]">
            Создавай Миры
          </h1>
          <button className="uppercase bg-[#0E86CA] text-white p-4 text-[20px] font-bold rounded-2xl shadow-2xl">
            Исследуй сейчас
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGames;
