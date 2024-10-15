"use client";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете добавить логику для обработки отправки формы
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-[50px]">
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
