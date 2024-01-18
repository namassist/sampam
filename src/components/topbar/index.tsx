"use client";

import { LuAlignJustify, LuSearch } from "react-icons/lu";
import { BiSolidUserCircle } from "react-icons/bi";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface Topbar {
  collapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
}

const Topbar: React.FC<Topbar> = ({ collapsed, setSidebarCollapsed }) => {
  const { data: session } = useSession();

  return (
    <header className="bg-white w-full h-16 px-8 flex justify-between items-center">
      <div className="flex items-center gap-5">
        <button onClick={() => setSidebarCollapsed(!collapsed)}>
          <LuAlignJustify size="20" />
        </button>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center space-x-2">
          <BiSolidUserCircle size={25} />
          <div className="lg:flex flex-col hidden">
            <h6 className="text-gray-900 text-sm font-medium capitalize">
              {session?.user?.username}
            </h6>
            <p className="text-gray-500 text-xs font-light leading-5">
              {session?.user?.role}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/`,
            })
          }
        >
          <LogOut />
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
