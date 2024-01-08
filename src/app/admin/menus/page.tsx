import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, Menu } from "./columns";

async function getData(): Promise<Menu[]> {
  return [
    {
      id: "728ed52f",
      name: "dashboard",
      role: "admin",
      slug: "dashboard-admin",
      icon: "BiSolidDashboard",
      url: "/admin/dashboard",
      is_active: 1,
    },
    {
      id: "728ed52f",
      name: "logbook",
      role: "admin",
      slug: "dashboard-logbook",
      icon: "BiSolidBook",
      url: "/admin/logbooks",
      is_active: 0,
    },
  ];
}

export default async function Logbook() {
  const data = await getData();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Menu</h1>
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
}
