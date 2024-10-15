import Image from "next/image";
import React from "react";
import bgHeader from "../../images/bg-breadcrumbs.jpg";
import shopingBasket from "../../images/shopping_basket.svg";
import arrow from "../../images/arrowLeft.svg";
import Link from "next/link";

const Basket = () => {
  return (
    <>
      <div className="m-auto flex">
        <Image src={bgHeader} alt="" className="w-full h-auto" />
      </div>
      <div className="flex flex-col gap-10 items-center my-[80px]">
        <Image src={shopingBasket} alt="" width={170} />
        <h1 className="uppercase text-[34px] font-bold">Корзина пуста</h1>
        <Link
          href="/"
          className="bg-[#0E86CA] flex text-white items-center p-4 gap-4 font-bold"
        >
          <Image src={arrow} alt="" /> ПРОДОЛЖИТЬ ПОКУПКИ
        </Link>
      </div>
    </>
  );
};

export default Basket;
