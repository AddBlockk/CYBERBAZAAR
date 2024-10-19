"use client";
import React, { Suspense, useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../firebase";
import addCart from "../images/addCart.svg";
import Image from "next/image";
import LoadingSkeleton from "./Loading";

const NewGames = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Функция для получения данных из базы данных
    const fetchData = async () => {
      try {
        const menuRef = ref(database, "newGames");
        const menuSnapshot = await get(menuRef);
        const menuData = menuSnapshot.val() || {};

        // Преобразование объекта в массив
        const recommendationsArray = Object.keys(menuData).map((key) => ({
          id: key,
          ...menuData[key],
        }));

        // Получение URL-адресов изображений из Firebase Storage
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

        setData(recommendationsWithImages); // Установка преобразованных данных в состояние
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-white max-w-[1440px] m-auto px-[20px] pt-[70px]">
      <div className="md:flex justify-between items-center mb-[15px]">
        <h2 className="text-[30px]">Новые игры</h2>
        <ul className="flex gap-[54px] text-[14px] flex-wrap">
          <li>
            <a href="#">Virtual Reality</a>
          </li>
          <li>
            <a href="#">Гонки</a>
          </li>
          <li>
            <a href="#" className="text-[#e8c22b]">
              2D Игры
            </a>
          </li>
          <li>
            <a href="#">3D Игры</a>
          </li>
        </ul>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        {data ? (
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
                <div className="flex justify-between my-[20px] p-2 mt-auto items-center">
                  <p className="text-yellow-500 font-bold text-[18px]">
                    ₽{item.price}
                  </p>
                  <Image
                    src={addCart}
                    alt="addCart"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <LoadingSkeleton />
        )}
      </Suspense>
    </div>
  );
};

export default NewGames;
