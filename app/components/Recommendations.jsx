"use client";
import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../firebase";
import addCart from "../images/addCart.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../lib/cart/cartSlice";

const Recommendations = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuRef = ref(database, "recommendations");
        const menuSnapshot = await get(menuRef);
        const menuData = menuSnapshot.val() || {};

        const recommendationsArray = Object.keys(menuData).map((key) => ({
          id: key,
          ...menuData[key],
        }));

        const recommendationsWithImages = await Promise.all(
          recommendationsArray.map(async (item) => {
            if (item.image) {
              try {
                const imageUrl = await getDownloadURL(
                  storageRef(storage, `recommendations${item.image}`)
                );
                return { ...item, image: imageUrl };
              } catch (imageError) {
                console.error(
                  `Error fetching image for ${item.image}:`,
                  imageError
                );
                return { ...item, image: null };
              }
            }
            return item;
          })
        );

        setData(recommendationsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="text-white max-w-[1440px] m-auto px-[20px]">
      <div className="flex justify-between items-center mb-[15px]">
        <h2 className="text-[30px]">Рекомендации</h2>
        <ul className="flex gap-[54px] text-[14px]">
          <li>
            <a href="#">Virtual Reality</a>
          </li>
          <li>
            <a href="#">Гонки</a>
          </li>
          <li>
            <a href="#">2D Игры</a>
          </li>
          <li>
            <a href="#" className="text-[#e8c22b]">
              3D Игры
            </a>
          </li>
        </ul>
      </div>
      <div className="md:grid grid-cols-1 flex flex-col items-center md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded bg-[#031632] flex flex-col max-w-[300px] h-full overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={200}
              className="scale-[1.01] hover:scale-105 transition-all"
              style={{ clipPath: "inset(0 0 5px 0)" }}
            />
            <div className="p-2 flex-grow">
              <h3 className="text-xl font-bold mt-2">{item.title}</h3>
              <p className="text-gray-400 mt-[10px]">{item.description}</p>
            </div>
            <div className="flex justify-between my-[20px] p-2 mt-auto">
              <p className="text-yellow-500 font-bold text-[18px]">
                ₽{item.price}
              </p>
              <Image
                src={addCart}
                alt="addCart"
                className="cursor-pointer"
                onClick={() => handleAddToCart(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
