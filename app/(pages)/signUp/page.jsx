"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const auth = getAuth();
  const router = useRouter();

  const checkUserExists = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error("Ошибка при проверке существования пользователя:", error);
      return false;
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userExists = await checkUserExists(email);
    if (userExists) {
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Пользователь с таким email уже существует.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Обновление профиля пользователя с именем
      await updateProfile(user, {
        displayName: name,
      });

      sessionStorage.setItem("user", "true");
      Swal.fire({
        icon: "success",
        title: "Вы успешно зарегистрировались!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Пользователь с таким email уже существует.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Повторите попытку",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-[200px] px-[10px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Создай Аккаунт</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Имя
          </label>
          <input
            type="text"
            id="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Зарегистрироваться
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-600">
            Уже есть аккаунт?{" "}
            <Link href="/signIn" className="text-blue-500 hover:underline">
              Авторизоваться
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
