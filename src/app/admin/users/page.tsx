import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";

async function getData(): Promise<User[]> {
  return [
    {
      id: "728ed52f",
      name: "Anam",
      asal: "Udinus",
      divisi: "Programmer",
      gender: "lakilaki",
      start_at: "2024-01-05T08:50:34.187Z",
      end_at: "2024-01-05T08:50:34.187Z",
    },
    {
      id: "728ed52f",
      name: "Maulidin",
      asal: "Udinus",
      divisi: "IT",
      gender: "perempuan",
      start_at: "2024-01-05T08:50:34.187Z",
      end_at: "2024-01-05T08:50:34.187Z",
    },
  ];
}

export default async function Logbook() {
  const data = await getData();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Users</h1>
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
}
