"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiChevronRight, BiHomeAlt } from "react-icons/bi";

type BreadcrumbsProps = {
  role: string;
  currentPage: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ role, currentPage }) => {
  const pathname = usePathname();
  return (
    <div className="pt-2 flex items-center">
      <ul className="flex items-center text-gray-600">
        <li className="inline-flex items-center">
          <Link href="#" className="hover:text-gray-900">
            <BiHomeAlt />
          </Link>
          <BiChevronRight />
        </li>
        <li className="inline-flex items-center">
          <Link href={pathname} className="capitalize hover:text-gray-900">
            {role}
          </Link>
          <BiChevronRight />
        </li>
        <li className="inline-flex items-center">
          <Link href="#" className="text-red-500">
            {currentPage}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
