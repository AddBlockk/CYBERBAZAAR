import React from "react";
import Hero from "./Hero";
import MainGames from "./MainGames";
import Recommendations from "./Recommendations";
import PopularNow from "./PopularNow";
import NewGames from "./NewGames";
import LastNews from "./LastNews";

const Main = () => {
  return (
    <div className="max-w-[1920px] m-auto relative">
      <Hero />
      <MainGames />
      <Recommendations />
      <PopularNow />
      <NewGames />
      <LastNews />
    </div>
  );
};

export default Main;
