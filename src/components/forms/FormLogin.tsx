import React from "react";
import Image from "next/image";
import Link from "next/link";

export const FormLogin = () => {
  return (
    <div className="max-w-md relative">
      <Image
        className="absolute -top-16 -right-16"
        src="/vercel.svg"
        style={{ zIndex: "-9999" }}
        width={147}
        height={262}
        alt="image"
      />
      <div className="w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <Image width={147} height={262} src="/vercel.svg" alt="Logo" />
        </div>
        <h1 className="text-lg font-semibold text-gray-500 mt-8 mb-3">
          Welcome to WA-Gateway Arkatama👋
        </h1>
        <p className="text-base text-gray-500 mt-0 mb-6">
          Please sign-in to your account and start the adventure
        </p>
        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-600"
            >
              EMAIL OR USERNAME
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
              className="flex justify-between font-semibold items-center mb-2 text-sm text-gray-600"
            >
              PASSWORD{" "}
              <span>
                {" "}
                <a
                  href="#"
                  className="block text-right text-small text-red-600 mt-2"
                >
                  forgot pasword?
                </a>
              </span>
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
        <div className="text-center">
          <p className="text-sm">
            New our Platform?{" "}
            <Link href="/register" className="text-red-600">
              Create an account
            </Link>
          </p>
        </div>
        <p className="text-xs text-gray-600 text-center mt-10">
          &copy; 2023 Arkatama
        </p>
      </div>
      <Image
        src="vercel.svg"
        className="absolute -bottom-14 -left-20"
        width={147}
        height={262}
        alt="image"
        style={{ zIndex: "-9999" }}
      />
    </div>
  );
};
