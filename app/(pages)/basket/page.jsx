"use client";
import Image from "next/image";
import React from "react";
import bgHeader from "../../images/bg-breadcrumbs.jpg";
import shopingBasket from "../../images/shopping_basket.svg";
import arrow from "../../images/arrowLeft.svg";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../../lib/cart/cartSlice";

const Basket = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleBuy = () => {
    dispatch(clearCart());
    Swal.fire({
      icon: "success",
      title: "Успешная покупка",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="bg-[#000810] min-h-screen">
      <div className="m-auto flex">
        <Image src={bgHeader} alt="" className="w-full h-auto" />
      </div>
      <div className="flex flex-col gap-10 items-center py-[50px]">
        {cartItems.length === 0 ? (
          <>
            <Image src={shopingBasket} alt="" width={170} />
            <h1 className="uppercase text-[34px] font-bold text-white">
              Корзина пуста
            </h1>
            <Link
              href="/"
              className="bg-[#0E86CA] flex text-white items-center p-4 gap-4 font-bold"
            >
              <Image src={arrow} alt="" /> ПРОДОЛЖИТЬ ПОКУПКИ
            </Link>
          </>
        ) : (
          <div className="w-full max-w-[1024px] px-[10px]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="md:flex gap-[20px] items-center md:max-w-[1024px] justify-between p-8 bg-[#031632] mb-4 rounded-lg hover:bg-[#152e54] transition-all"
              >
                <div className="sm:flex items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="mr-4 w-[300px] sm:w-[200px]"
                  />
                  <div className="flex flex-col gap-[20px]">
                    <h3 className="text-xl font-bold text-white mt-[20px] sm:mt-[0px]">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 min-w-[100px] max-w-[500px]">
                      {item.description}
                    </p>
                    <p className="text-yellow-500 font-bold text-[18px]">
                      ₽{item.price}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500 font-bold bg-red-950 p-4 hover:bg-red-800 hover:text-red-50 rounded-lg transition-all mt-[20px] md:mt-[0px]"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Удалить
                </button>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                onClick={handleBuy}
                className="text-white text-2xl bg-[#031632] p-6 rounded-lg hover:bg-[#152e54] transition-all"
              >
                Приобрести
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
