import React from "react";

const Footer = () => {
  return (
    <footer className="py-[24px] pr-[24px] bg-white flex flex-row justify-end">
      <p className="font-normal text-gray-900 text-[12px]">
        Copyright ©{" "}
        <span className="text-[#FF5959] font-semibold">2023 Sampam Team.</span>{" "}
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
