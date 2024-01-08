"use client";

import React, { ReactNode, useState } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Footer from "../footer";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [collapsed, setSidebarCollapsed] = useState(true);

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div
        className={`${
          collapsed ? "md:w-[calc(100%_-_15rem)]" : "md:w-[calc(100%_-_5rem)]"
        } w-full space-y-6 min-h-screen flex flex-col justify-between`}
      >
        <main className="space-y-4">
          <Topbar
            collapsed={collapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <div className="px-4 mx-auto">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
