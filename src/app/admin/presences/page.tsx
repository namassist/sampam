import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, Presences } from "./columns";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getData(): Promise<Presences[]> {
  const response = await db.presences.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
      pemagang: {
        select: { name: true },
      },
    },
  });

  const data = response.map((p) => ({
    id: p?.id,
    name: p?.pemagang?.name,
    status: p?.status,
    created_at: p?.createdAt,
  }));

  revalidatePath("/admin/presences");
  return data;
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
