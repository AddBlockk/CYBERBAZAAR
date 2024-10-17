"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../images/logo.svg";
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

  return (
    <div className="fixed top-0 w-full bg-[#000810] z-50">
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
          <Link
            href={user ? "/profile" : "/signIn"}
            className="flex gap-[12px] group"
          >
            <Image
              src={login}
              alt="login"
              className="group-hover:text-[#0E86CA]"
            />
            {user ? (
              <span className="group-hover:text-[#0E86CA]">
                {user.displayName}
              </span>
            ) : (
              <span className="group-hover:text-[#0E86CA]">Логин</span>
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
    </div>
  );
};

export default Header;
