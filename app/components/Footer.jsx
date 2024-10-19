import React from "react";
import logo from "../images/logo.svg";
import phone from "../images/phone.svg";
import address from "../images/address.svg";
import email from "../images/email.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="pt-[50px] m-auto w-full h-auto text-[#909090] relative bg-[url('./images/footer.jpg')]">
      <div className="flex justify-center">
        <a href="/">
          <Image src={logo} alt="logo" />
        </a>
      </div>
      <div className="flex justify-center items-center max-w-[680px] m-auto pt-[50px] flex-wrap">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src={address} alt="" />
            <p>Адрес: улица Куликова, 42</p>
          </div>
          <div className="flex items-center gap-3">
            <Image src={email} alt="" />
            <p>Email: cyberbazaar@mail.ru</p>
          </div>
          <div className="flex items-center gap-3">
            <Image src={phone} alt="" />
            <p>Телефон: +79643636353</p>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-[100%] bg-[#0E86CA] absolute bottom-[100px] left-0"></div>
      <div className="flex justify-center pt-[160px] pb-[40px] text-white">
        <p>© 2024 Cyber Bazaar</p>
      </div>
    </footer>
  );
};

export default Footer;
