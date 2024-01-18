"use client";

import Link from "next/link";
import Image from "next/image";
import * as BIcon from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { getMenus } from "@/app/actions/menus";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Sidebar {
  collapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
}

export type Menu = {
  id: string;
  name: string;
  role: "admin" | "user";
  url: string;
  icon: string;
  slug: string;
  is_active: number;
};

const Sidebar: React.FC<Sidebar> = ({ collapsed, setSidebarCollapsed }) => {
  const params = usePathname();
  const { data: session } = useSession();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        if (session?.user?.role) {
          const menusData = await getMenus(session.user.role);
          setMenus(menusData);
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
    if (session) {
      fetchData();
    }
  }, [session]);

  return (
    <aside
      id="sidebar"
      className={`${
        collapsed
          ? "w-60 translate-x-0"
          : "w-20 -translate-x-20 md:translate-x-0"
      } fixed shadow-lg lg:shadow-none z-40 md:sticky top-0 left-0 h-screen transition-all duration-200 ease-in-out`}
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-10 flex justify-between items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          {collapsed ? (
            <button onClick={() => setSidebarCollapsed(!collapsed)}>
              <Image
                src="/vercel.svg"
                alt="logo menu"
                width={162}
                height={32}
              />
            </button>
          ) : (
            <button onClick={() => setSidebarCollapsed(!collapsed)}>
              <Image
                src="/vercel.svg"
                width={162}
                height={32}
                alt="menu logo"
              />
            </button>
          )}
        </div>
        {!isLoading ? (
          <ul className="space-y-4 text-sm font-medium">
            {menus?.map((menu) => {
              const IconComponent = BIcon[menu.icon as keyof typeof BIcon];
              return (
                <li key={menu?.id}>
                  <Link
                    href={menu?.url}
                    className={`${
                      params.startsWith(menu.url) ? "bg-slate-200" : ""
                    } flex justify-center items-center rounded-lg p-3 text-slate-900 hover:bg-slate-100`}
                  >
                    {IconComponent && <IconComponent size={20} />}
                    {collapsed && (
                      <span className="ml-3 flex-1 whitespace-nowrap capitalize transition-all duration-300 ease-in-out">
                        {menu?.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
