import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";
import Breadcrumbs from "@/components/breadcrumbs";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function getData(): Promise<User[]> {
  const response = await db.pemagangs.findMany({
    select: {
      id: true,
      name: true,
      place_origin: true,
      gender: true,
      start_at: true,
      end_at: true,
      divisi: {
        select: {
          name: true,
        },
      },
      weeklyReports: true,
    },
  });

  const pemagangs = response.map((p) => ({
    id: p.id,
    name: p.name,
    place_origin: p.place_origin,
    divisi: p.divisi?.name,
    gender: p.gender,
    start_at: p.start_at,
    end_at: p.end_at,
    weekly_report: p.weeklyReports,
  }));

  revalidatePath("/admin/logbooks");
  return pemagangs;
}

export default async function Logbook() {
  const data = await getData();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Logbook</h1>
        <Breadcrumbs role="Admin" currentPage="Logbook" />
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
}
