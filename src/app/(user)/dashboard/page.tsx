"use client";

import Link from "next/link";
import * as React from "react";
import * as BIcon from "react-icons/bi";
import Hello from "@/components/cards/hello";
import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Dashboard</h1>
        <Breadcrumbs role="user" currentPage="Dashboard" />
      </div>
      <Hello username="user" message="Jangan Lupa melakukan presensi" />
      <div className="w-full flex flex-col lg:flex-row gap-4 mt-5 text-gray-500">
        <div className="w-full lg:w-4/12 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-end justify-between">
            <h4 className="font-medium text-lg">Logbook Saya</h4>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Minggu 1
                <span className="block text-xs">20 - 24 Januari 2024</span>
              </p>
              <Badge className="bg-yellow-400">Revisi</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Minggu 2
                <span className="block text-xs">20 - 24 Januari 2024</span>
              </p>
              <Badge className="bg-green-400">Diterima</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Minggu 3
                <span className="block text-xs">20 - 24 Januari 2024</span>
              </p>
              <Badge className="bg-blue-400">Review</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Minggu 4
                <span className="block text-xs">20 - 24 Januari 2024</span>
              </p>
              <Badge className="bg-slate-400">Belum dimulai</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Minggu 5
                <span className="block text-xs">20 - 24 Januari 2024</span>
              </p>
              <Badge className="bg-slate-400">Belum dimulai</Badge>
            </li>
          </ul>
          <div className="mt-5 flex">
            <Link
              href="/admin/logbooks"
              className="flex items-center gap-2 text-slate-500 text-sm hover:text-slate-800 duration-150"
            >
              Lihat Semua Logbook
              <BIcon.BiChevronsRight size={15} />
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-4/12 bg-white h-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="w-full lg:w-4/12 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-end justify-between">
            <h4 className="font-medium text-lg">Presensi Minggu Ini</h4>
            <p className="text-xs">18-20 Jan 2024</p>
          </div>
          <ul className="mt-8 space-y-3">
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Senin, 20 Januari 2024
                <span className="block text-xs text-gray-400">
                  Presensi pada 07:30:16
                </span>
              </p>
              <Badge className="bg-green-400">tepat waktu</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Selasa, 21 Januari 2024
                <span className="block text-xs text-gray-400">
                  Presensi pada 07:30:16
                </span>
              </p>
              <Badge className="bg-green-400">tepat waktu</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Rabu, 22 Januari 2024
                <span className="block text-xs text-gray-400">
                  Presensi pada 07:35:16
                </span>
              </p>
              <Badge className="bg-red-400">terlambat</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Kamis, 23 Januari 2024
                <span className="block text-xs text-gray-400">
                  tidak tersedia
                </span>
              </p>
              <Badge className="bg-slate-400">belum</Badge>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Jumat, 24 Januari 2024
                <span className="block text-xs text-gray-400">
                  tidak tersedia
                </span>
              </p>
              <Badge className="bg-slate-400">belum</Badge>
            </li>
          </ul>
          <div className="mt-5 flex">
            <Link
              href="/admin/presences"
              className="flex items-center gap-2 text-slate-500 text-sm hover:text-slate-800 duration-150"
            >
              Lihat Semua Presensi
              <BIcon.BiChevronsRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
