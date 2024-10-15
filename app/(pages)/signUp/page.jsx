"use client";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", "true");
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-[50px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Создай Аккаунт</h2>
      <form>
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
            onClick={handleSignUp}
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
