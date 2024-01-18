import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";
import { db } from "@/lib/db";
import Breadcrumbs from "@/components/breadcrumbs";

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
  }));

  return pemagangs;
}

async function getDivisi() {
  const response = await db.divisions.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return response;
}

export default async function User() {
  const data = await getData();
  const divisi = await getDivisi();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-md">
        <h1 className="text-lg font-medium">Data Users</h1>
        <Breadcrumbs role="Admin" currentPage="Users" />
      </div>
      <div className="bg-white p-[18px] rounded-lg shadow-md">
        <DataTable columns={columns} data={data} divisi={divisi} />
      </div>
    </AuthLayout>
  );
}
