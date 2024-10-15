"use client";
import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import MainGames from "./MainGames";
import Recommendations from "./Recommendations";
import PopularNow from "./PopularNow";
import NewGames from "./NewGames";
import LastNews from "./LastNews";
import AddGames from "./AddGames";
import ArrowUp from "../images/ArrowUp.svg"; // Импортируем иконку стрелки
import Image from "next/image";

const Main = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="m-auto relative">
      <Hero />
      <MainGames />
      <Recommendations />
      <PopularNow />
      <NewGames />
      <LastNews />
      <AddGames />
      {isVisible && (
        <Image
          src={ArrowUp}
          alt=""
          onClick={scrollToTop}
          className="fixed bottom-7 right-7 bg-blue-500 text-white w-[40px] z-10 px-[5px] rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        />
      )}
    </div>
  );
};

export default Main;
