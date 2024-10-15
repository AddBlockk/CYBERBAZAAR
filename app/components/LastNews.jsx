"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../firebase";
import arrow from "../images/yellow-arrow.svg";
import calendar from "../images/calendar.svg";
import commentaries from "../images/commentaries.svg";

const LastNews = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Функция для получения данных из базы данных
    const fetchData = async () => {
      try {
        const menuRef = ref(database, "news");
        const menuSnapshot = await get(menuRef);
        const menuData = menuSnapshot.val() || {};

        // Преобразование объекта в массив
        const newsArray = Object.keys(menuData).map((key) => ({
          id: key,
          ...menuData[key],
        }));

        // Получение URL-адресов изображений из Firebase Storage
        const recommendationsWithImages = await Promise.all(
          newsArray.map(async (item) => {
            if (item.image) {
              try {
                const imageUrl = await getDownloadURL(
                  storageRef(storage, `news${item.image}`)
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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white max-w-[1440px] m-auto px-[20px] pt-[70px]">
      <h2 className="text-[30px]">Последние новости</h2>
      <div className="md:grid grid-cols-1 flex flex-col items-center md:grid-cols-3 gap-4 mt-[30px]">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded flex flex-col h-full overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={490}
              height={258}
              className="scale-[1.01] hover:scale-105 transition-all"
            />
            <div className="p-2 flex-grow">
              <h3 className="text-sd font-bold my-2">{item.title}</h3>
              <div className="flex gap-6">
                <div className="flex gap-2 text-[#909090] text-[14px] cursor-pointer">
                  <Image src={calendar} alt="" />
                  <p>{item.date}</p>
                </div>
                <div className="flex gap-2 text-[#909090] text-[14px] cursor-pointer">
                  <Image src={commentaries} alt="" />
                  <p>{item.date}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between my-[20px] p-2 mt-auto">
              <p className="text-yellow-500 font-bold flex gap-2 text-[13px] cursor-pointer">
                <Image src={arrow} alt="" />
                Читать дальше
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastNews;
