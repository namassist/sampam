import { revalidatePath } from "next/cache";
import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";
import { db } from "@/lib/db";
import Breadcrumbs from "@/components/breadcrumbs";

async function getData(): Promise<User[]> {
  const response = await db.penyelia.findMany({
    select: {
      id: true,
      nip: true,
      nama: true,
      bidang: true,
    },
  });

  revalidatePath("/admin/penyelias");
  return response;
}

export default async function User() {
  const data = await getData();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Penyelia</h1>
        <Breadcrumbs role="Admin" currentPage="Penyelia" />
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
}
