import React from "react";
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { getServerSession } from "next-auth";
import { columns, Presences } from "./columns";
import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import { authOptions } from "@/lib/auth";

async function getData(id: any): Promise<Presences[]> {
  const response = await db.presences.findMany({
    where: {
      pemagang_id: id,
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
}

export default async function Logbook() {
  const user = await getServerSession(authOptions);
  const data = await getData(user?.user?.id);

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Presensi</h1>
        <Breadcrumbs role="user" currentPage="Presensi" />
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} id={user?.user?.id} />
      </div>
    </AuthLayout>
  );
}
