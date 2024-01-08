import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, Menu } from "./columns";

async function getData(): Promise<Menu[]> {
  return [
    {
      id: "728ed52f",
      status: "Hadir",
      created_at: "2024-01-01T08:50:34.187Z",
    },
    {
      id: "728ed52w",
      status: "Sakit",
      created_at: "2024-01-02T08:50:34.187Z",
    },
    {
      id: "728ed52a",
      status: "Izin",
      created_at: "2024-01-03T08:50:34.187Z",
    },
    {
      id: "728ed52a",
      status: "Hadir",
      created_at: "2024-01-04T08:50:34.187Z",
    },
  ];
}

export default async function Logbook() {
  const data = await getData();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Presensi</h1>
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
}
