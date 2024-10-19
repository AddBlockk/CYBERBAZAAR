"use client";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        Cookies.set("user", "true", { expires: 7 });
        const userCookie = Cookies.get("user");
        Swal.fire({
          icon: "success",
          title: "Успешный вход",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Ошибка",
          text: "Повторите попытку",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      setError("Неверный email или пароль");
      Swal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Неверный email или пароль",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSignIn();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-[200px] px-[10px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>
      <form onSubmit={handleSubmit}>
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
            Авторизоваться
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-600">
            Нет аккаунта?{" "}
            <Link href="/signUp" className="text-blue-500 hover:underline">
              Создай Аккаунт
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
