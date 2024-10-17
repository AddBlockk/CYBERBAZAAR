"use client";
import Image from "next/image";
import React from "react";
import bgHeader from "../../images/bg-breadcrumbs.jpg";
import shopingBasket from "../../images/shopping_basket.svg";
import arrow from "../../images/arrowLeft.svg";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../lib/cart/cartSlice";

const Basket = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <>
      <div className="m-auto flex">
        <Image src={bgHeader} alt="" className="w-full h-auto" />
      </div>
      <div className="flex flex-col gap-10 items-center my-[80px]">
        {cartItems.length === 0 ? (
          <>
            <Image src={shopingBasket} alt="" width={170} />
            <h1 className="uppercase text-[34px] font-bold">Корзина пуста</h1>
            <Link
              href="/"
              className="bg-[#0E86CA] flex text-white items-center p-4 gap-4 font-bold"
            >
              <Image src={arrow} alt="" /> ПРОДОЛЖИТЬ ПОКУПКИ
            </Link>
          </>
        ) : (
          <div className="w-full max-w-[1200px]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-8 bg-[#031632] mb-4 rounded"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                    <p className="text-yellow-500 font-bold text-[18px]">
                      ₽{item.price}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500 font-bold"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Basket;
