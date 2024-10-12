import React from "react";
import Image from "next/image";
import logo from "../images/logo.svg";
import search from "../images/search.svg";
import login from "../images/login.svg";
import cart from "../images/cart.svg";

const Header = () => {
  return (
    <div className="bg-[#000810]">
      <div className="max-w-[1920px] m-auto h-[66px] flex justify-between items-center text-white px-[200px]">
        <a href="/">
          <Image src={logo} alt="logo" />
        </a>
        <ul className="flex gap-[40px]">
          <li>
            <a href="/" className="font-medium uppercase text-[#0E86CA]">
              Главная
            </a>
          </li>
          <li>
            <a href="/" className="font-medium uppercase">
              О нас
            </a>
          </li>
          <li>
            <a href="/" className="font-medium uppercase">
              Новости
            </a>
          </li>
        </ul>
        <ul className="flex gap-[35px]">
          <Image src={search} alt="search" />
          <div className="w-[1px] text-[#ececec]"></div>
          <a href="#" className="flex gap-[12px]">
            <Image src={login} alt="login" />
            <span>Логин</span>
          </a>
          <a href="#" className="flex gap-[12px]">
            <Image src={cart} alt="cart" />
            <span> ₽0.00</span>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Header;
