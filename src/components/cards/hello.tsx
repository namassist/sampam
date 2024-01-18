import React from "react";
import Image from "next/image";

type HelloProps = {
  username: string;
  message: string;
};

const Hello: React.FC<HelloProps> = ({ username, message }) => {
  return (
    <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 bg-white shadow-sm rounded-xl p-5 my-4 items-center">
      <Image
        src="/hello.svg"
        width={40}
        height={40}
        alt="Picture of the author"
      />
      <div className="ml-6">
        <h3 className="text-lg font-semibold capitalize">Hello, {username}</h3>
        <p className="mt-2 text-sm font-normal capitalize text-red-500">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Hello;
