import React from "react";
import Image from "next/image";

export const FormLogin = () => {
  return (
    <div className="relative w-3/12">
      <Image
        className="absolute -top-16 -right-16"
        src="/ornamen1.png"
        style={{ zIndex: "-9999" }}
        width={147}
        height={262}
        alt="image"
      />
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold text-gray-500 text-center mt-3 mb-8 uppercase">
          SAMPAM APP
        </h1>
        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              USERNAME
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="flex font-semibold items-center mb-2 text-sm text-gray-600"
            >
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full  bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
          >
            Sign In
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-10 capitalize">
          &copy;2024 | Build by sampam team
        </p>
      </div>
      <Image
        src="/ornamen2.png"
        className="absolute -bottom-14 -left-20"
        width={147}
        height={262}
        alt="image"
        style={{ zIndex: "-9999" }}
      />
    </div>
  );
};
