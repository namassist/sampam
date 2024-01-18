import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, Menu } from "./columns";
import Breadcrumbs from "@/components/breadcrumbs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getData(): Promise<Menu[]> {
  const response = await db.menu.findMany();
  revalidatePath("/admin/menus");
  return response;
}

export default async function Logbook() {
  const data = await getData();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Menu</h1>
        <Breadcrumbs role="Admin" currentPage="Menu" />
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
}
