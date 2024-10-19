"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../images/logo.svg";
import menu from "../images/menu.svg";
import exit from "../images/exit.svg";
import search from "../images/search.svg";
import login from "../images/login.svg";
import cart from "../images/cart.svg";
import Link from "next/link";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { loadCart } from "../../lib/cart/cartSlice";

const Header = () => {
  const pathname = usePathname();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(loadCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    router.push("/");
    Cookies.remove("user");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 w-full bg-[#000810] z-50">
      <div className="max-w-[1920px] m-auto h-[66px] flex justify-between items-center text-white sm:mx-[200px] gap-[30px]">
        <Link href="/">
          <Image src={logo} alt="logo" className="ml-[20px]" />
        </Link>
        <Image
          src={menu}
          alt="menu"
          width={30}
          className="cursor-pointer xl:hidden mr-[20px]"
          onClick={toggleMenu}
        />
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
        <ul className="hidden xl:flex gap-[35px] text-white">
          <Image src={search} alt="search" className="cursor-pointer" />
          <div className="w-[1px] h-auto bg-white"></div>
          <Link
            href={user ? "/profile" : "/signIn"}
            className="flex gap-[12px] group"
          >
            <Image
              src={login}
              alt="login"
              className="group-hover:text-[#0E86CA"
            />
            {user ? (
              <span className="group-hover:text-[#0E86CA] truncate w-[100px] text-white">
                {user.displayName}
              </span>
            ) : (
              <span className="group-hover:text-[#0E86CA] text-white">
                Логин
              </span>
            )}
          </Link>
          <div className="w-[1px] h-auto bg-white"></div>
          <Link href="/basket" className="flex gap-[12px] group">
            <Image src={cart} alt="cart" />
            <span className="group-hover:text-[#0E86CA]">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <button onClick={handleSignOut}>
              <Image src={exit} alt="exit" className="w-[22px]" />
            </button>
          ) : (
            ""
          )}
        </ul>
      </div>
      {isMenuOpen && (
        <div className="fixed top-[66px] left-0 w-full h-screen bg-[#000810] z-40 transition-transform transform translate-x-0 xl:hidden min-h-screen flex items-center justify-center text-[50px]">
          <ul className="flex flex-col items-center gap-[50px] pt-[20px]">
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
            <li>
              <Link
                href={user ? "/profile" : "/signIn"}
                className="flex gap-[12px] group"
              >
                <Image
                  src={login}
                  width={50}
                  alt="login"
                  className="group-hover:text-[#0E86CA]"
                />
                {user ? (
                  <span className="group-hover:text-[#0E86CA] truncate w-[200px] text-white">
                    {user.displayName}
                  </span>
                ) : (
                  <span className="group-hover:text-[#0E86CA] text-white">
                    Логин
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/basket" className="flex gap-[12px] group text-white">
                <Image src={cart} alt="cart" width={50} />
                <span className="group-hover:text-[#0E86CA]">
                  {cartItems.length}
                </span>
              </Link>
            </li>
            {user && (
              <li>
                <button onClick={handleSignOut}>
                  <Image src={exit} alt="exit" className="w-[70px]" />
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
