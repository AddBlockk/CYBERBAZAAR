"use client";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Profile = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log("User profile:", user);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Пользователь не аутентифицирован</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-[200px]">
      <h2 className="text-2xl font-bold text-center mb-6">
        Профиль Пользователя
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ник
        </label>
        <input
          type="text"
          value={user.displayName || "Не указан"}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={user.email || "Не указан"}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          readOnly
        />
      </div>
    </div>
  );
};

export default Profile;
