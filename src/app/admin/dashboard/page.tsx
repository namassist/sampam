"use client";

import Link from "next/link";
import * as React from "react";
import * as BIcon from "react-icons/bi";
import Hello from "@/components/cards/hello";
import BasicCard from "@/components/cards/basic";
import Breadcrumbs from "@/components/breadcrumbs";
import BadgesCircle from "@/components/badges/circles";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Calendar } from "@/components/ui/calendar";

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Dashboard</h1>
        <Breadcrumbs role="Admin" currentPage="Dashboard" />
      </div>
      <Hello
        username="Admin"
        message="Selamat Datang kembali, senang bisa bertemu lagi"
      />
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <BasicCard
          type="primary"
          icon={BIcon.BiSolidUser}
          title="Jumlah User"
          value={20}
        />
        <BasicCard
          type="danger"
          icon={BIcon.BiHive}
          title="Jumlah Divisi"
          value={5}
        />
        <BasicCard
          type="success"
          icon={BIcon.BiBook}
          title="Logbook Diterima"
          value={10}
        />
        <BasicCard
          type="warning"
          icon={BIcon.BiBook}
          title="Logbook Revisi"
          value={4}
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4 mt-5 text-gray-500">
        <div className="w-full lg:w-4/12 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-end justify-between">
            <h4 className="font-medium text-lg">Logbook Minggu Ini</h4>
            <p className="text-xs">18-20 Jan 2024</p>
          </div>
          <ul className="mt-8 space-y-3">
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Chairul Anaam Maulidin Putra bimasakti
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="danger" />
                <BadgesCircle title="R" type="danger" />
                <BadgesCircle title="K" type="danger" />
                <BadgesCircle title="J" type="danger" />
                <BadgesCircle title="M" type="danger" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Chairul Putra bimasakti
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="R" type="success" />
                <BadgesCircle title="K" type="success" />
                <BadgesCircle title="J" type="success" />
                <BadgesCircle title="M" type="danger" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Akmaludin
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="R" type="success" />
                <BadgesCircle title="K" type="success" />
                <BadgesCircle title="J" type="success" />
                <BadgesCircle title="M" type="success" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Mustofeng
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="R" type="success" />
                <BadgesCircle title="K" type="success" />
                <BadgesCircle title="J" type="success" />
                <BadgesCircle title="M" type="warning" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Zamrud Nasution
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="danger" />
                <BadgesCircle title="S" type="danger" />
                <BadgesCircle title="R" type="danger" />
                <BadgesCircle title="K" type="danger" />
                <BadgesCircle title="J" type="danger" />
                <BadgesCircle title="M" type="danger" />
              </div>
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
                Chairul Anaam Maulidin Putra bimasakti
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="danger" />
                <BadgesCircle title="R" type="danger" />
                <BadgesCircle title="K" type="danger" />
                <BadgesCircle title="J" type="danger" />
                <BadgesCircle title="M" type="danger" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Chairul Putra bimasakti
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="R" type="success" />
                <BadgesCircle title="K" type="success" />
                <BadgesCircle title="J" type="success" />
                <BadgesCircle title="M" type="danger" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Akmaludin
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="R" type="success" />
                <BadgesCircle title="K" type="success" />
                <BadgesCircle title="J" type="success" />
                <BadgesCircle title="M" type="success" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Mustofeng
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="S" type="success" />
                <BadgesCircle title="R" type="success" />
                <BadgesCircle title="K" type="success" />
                <BadgesCircle title="J" type="success" />
                <BadgesCircle title="M" type="warning" />
              </div>
            </li>
            <li className="flex justify-between items-center gap-8">
              <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                Zamrud Nasution
              </p>
              <div className="flex gap-1">
                <BadgesCircle title="S" type="danger" />
                <BadgesCircle title="S" type="danger" />
                <BadgesCircle title="R" type="danger" />
                <BadgesCircle title="K" type="danger" />
                <BadgesCircle title="J" type="danger" />
                <BadgesCircle title="M" type="danger" />
              </div>
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
