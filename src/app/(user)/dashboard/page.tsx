import Link from "next/link";
import * as React from "react";
import * as BIcon from "react-icons/bi";
import Hello from "@/components/cards/hello";
import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Badge } from "@/components/ui/badge";
import Calender from "@/components/calender/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { dateString, dateTime } from "@/lib/utils";

async function getLogbook(id: any) {
  const response = await db.weeklyReports.findMany({
    take: 5,
    where: {
      pemagang_id: id,
    },
    orderBy: {
      start_date: "asc",
    },
  });

  return response;
}

async function getPresences(id: any, start: any, end: any) {
  const response = await db.presences.findMany({
    where: {
      pemagang_id: id,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });

  return response;
}

export default async function Dashboard() {
  const user = await getServerSession(authOptions);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayOfWeek + 2
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (8 - dayOfWeek)
  );

  const logbook = await getLogbook(user?.user?.id);
  const presences = await getPresences(user?.user?.id, startOfWeek, endOfWeek);
  console.log(presences);

  const handleDate = (start: any, end: any) => {
    const today = new Date();
    const start_d = start.getUTCDate();
    const end_d = end.getUTCDate();
    const year = today.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });

    return `${start_d}-${end_d} ${year}`;
  };

  const handleBadge = (status: any) => {
    let styles;
    let message;

    switch (status) {
      case "Submit":
        styles = "bg-blue-400";
        message = "Menunggu Persetujuan";
        break;
      case "Revisi":
        styles = "bg-yellow-400";
        message = "Review";
        break;
      case "Approve":
        styles = "bg-green-400";
        message = "Disetujui";
        break;
      default:
        styles = "bg-slate-400";
        message = "Belum dibuat";
        break;
    }

    return <Badge className={styles}>{message}</Badge>;
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Dashboard</h1>
        <Breadcrumbs role="user" currentPage="Dashboard" />
      </div>
      <Hello
        username={user?.user?.username || ""}
        message="Jangan Lupa melakukan presensi"
      />
      <div className="w-full flex flex-col lg:flex-row gap-4 mt-5 text-gray-500">
        <div className="w-full lg:w-4/12 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-end justify-between">
            <h4 className="font-medium text-lg">Logbook Saya</h4>
          </div>
          <ul className="mt-8 space-y-4">
            {logbook?.map((l) => (
              <li
                key={l?.id}
                className="flex justify-between items-center gap-8"
              >
                <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                  {l?.week}
                  <span className="block text-xs">
                    {handleDate(l?.start_date, l?.end_date)}
                  </span>
                </p>
                {handleBadge(l?.status)}
              </li>
            ))}
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
          <Calender />
        </div>
        <div className="w-full lg:w-4/12 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-end justify-between">
            <h4 className="font-medium text-lg">Presensi Minggu Ini</h4>
            <p className="text-xs">{handleDate(startOfWeek, endOfWeek)}</p>
          </div>
          <ul className="mt-8 space-y-3">
            {presences.length !== 0 ? (
              presences?.map((p) => (
                <li
                  key={p?.id}
                  className="flex justify-between items-center gap-8"
                >
                  <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                    {dateString(p?.createdAt)}
                    <span className="block text-xs text-gray-400">
                      Presensi pada {dateTime(p?.createdAt)}
                    </span>
                  </p>
                  <Badge className="bg-green-400">tepat waktu</Badge>
                </li>
              ))
            ) : (
              <span className="text-sm">
                tidak ada data presensi minggu ini
              </span>
            )}
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
