"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../images/logo.svg";
import search from "../images/search.svg";
import login from "../images/login.svg";
import cart from "../images/cart.svg";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className="bg-[#000810]">
      <div className="max-w-[1920px] m-auto h-[66px] flex justify-between items-center text-white px-[200px]">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <ul className="hidden xl:flex gap-[40px]">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-[#0E86CA]" : "text-white"
              } font-medium uppercase hover:text-[#4dd8fe] transition-all`}
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`${
                pathname === "/aboutUs" ? "text-[#0E86CA]" : "text-white"
              } font-medium uppercase hover:text-[#4dd8fe] transition-all`}
            >
              О нас
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`${
                pathname === "/news" ? "text-[#0E86CA]" : "text-white"
              } font-medium uppercase hover:text-[#4dd8fe] transition-all`}
            >
              Новости
            </Link>
          </li>
        </ul>
        <ul className="hidden xl:flex gap-[35px]">
          <Image src={search} alt="search" className="cursor-pointer" />
          <div className="w-[1px] h-auto bg-white"></div>
          <Link href="/signIn" className="flex gap-[12px] group">
            <Image
              src={login}
              alt="login"
              className="group-hover:text-[#0E86CA]"
            />
            <span className="group-hover:text-[#0E86CA]">Логин</span>
          </Link>
          <div className="w-[1px] h-auto bg-white"></div>
          <Link href="/basket" className="flex gap-[12px] group">
            <Image src={cart} alt="cart" />
            <span className="group-hover:text-[#0E86CA]"> 0</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
