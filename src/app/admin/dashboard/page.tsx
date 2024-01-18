import Link from "next/link";
import { db } from "@/lib/db";
import * as React from "react";
import * as BIcon from "react-icons/bi";
import Hello from "@/components/cards/hello";
import BasicCard from "@/components/cards/basic";
import Breadcrumbs from "@/components/breadcrumbs";
import BadgesCircle from "@/components/badges/circles";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import axios from "axios";
import Calender from "@/components/calender/page";

async function getTotalUser() {
  const response = await db.pemagangs.count();
  return response;
}

async function getTotalDivisi() {
  const response = await db.divisions.count();
  return response;
}

async function getTotalLogbook() {
  const approve = await db.weeklyReports.count({
    where: {
      status: "Approve",
    },
  });

  const revisi = await db.weeklyReports.count({
    where: {
      status: "Revisi",
    },
  });

  return {
    diterima: approve,
    revisi: revisi,
  };
}

async function weeklyLogbook(start: any, end: any) {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/reports/recap?start=${start}&end=${end}`
    );
    if (res?.status == 200) {
      return res?.data?.data;
    }
  } catch (error) {
    throw error;
  }
}

async function presencesLogbook(start: any, end: any) {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/presences/recap?start=${start}&end=${end}`
    );
    if (res?.status == 200) {
      return res?.data?.data;
    }
  } catch (error) {
    throw error;
  }
}

export default async function Dashboard() {
  const user = await getServerSession(authOptions);
  const totalUser = await getTotalUser();
  const totalDivisi = await getTotalDivisi();
  const totalLogbook = await getTotalLogbook();

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
  const start = startOfWeek.toISOString().split("T")[0];
  const end = endOfWeek.toISOString().split("T")[0];

  const getLogbook = weeklyLogbook(start, end);
  const getPresences = presencesLogbook(start, end);
  const [logbook, presences] = await Promise.all([getLogbook, getPresences]);

  const handleType = (activity: string) => {
    if (activity !== "" && activity !== null) {
      return "success";
    } else {
      return "danger";
    }
  };

  const handletitle = (date: Date) => {
    const myDate = new Date(date);
    let options = {
      weekday: "long",
    } as const;

    return myDate.toLocaleDateString("id-ID", options).charAt(0);
  };

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
          value={totalUser}
        />
        <BasicCard
          type="danger"
          icon={BIcon.BiHive}
          title="Jumlah Divisi"
          value={totalDivisi}
        />
        <BasicCard
          type="success"
          icon={BIcon.BiBook}
          title="Logbook Diterima"
          value={totalLogbook?.diterima}
        />
        <BasicCard
          type="warning"
          icon={BIcon.BiBook}
          title="Logbook Revisi"
          value={totalLogbook?.revisi}
        />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4 mt-5 text-gray-500">
        <div className="w-full lg:w-4/12 bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-end justify-between">
            <h4 className="font-medium text-lg">Logbook Minggu Ini</h4>
            <p className="text-xs">
              {start.split("-")[2]}-{end.split("-")[2]}{" "}
              {today.toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {logbook?.map((l: any) => (
              <li
                key={l?.id}
                className="flex justify-between items-center gap-8"
              >
                <p className="overflow-hidden	text-ellipsis	whitespace-nowrap capitalize">
                  {l?.name}
                </p>
                <div className="flex gap-1">
                  {l?.reports.length !== 0 ? (
                    l?.reports[0]?.daily.map((d: any) => (
                      <BadgesCircle
                        key={d.date}
                        type={handleType(d?.activity)}
                        title={handletitle(d?.date)}
                      />
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">belum dimulai</span>
                  )}
                </div>
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
            <p className="text-xs">
              {start.split("-")[2]}-{end.split("-")[2]}{" "}
              {today.toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {presences?.map((presen: any) => (
              <li
                key={presen?.id}
                className="flex justify-between items-center gap-8"
              >
                <p className="overflow-hidden	text-ellipsis	whitespace-nowrap">
                  {presen?.name}
                </p>
                <div className="flex gap-1">
                  {presen?.presences.length !== 0 ? (
                    presen?.presences?.map((d: any) => (
                      <BadgesCircle
                        key={d.date}
                        type={handleType(d?.activity)}
                        title={handletitle(d?.createdAt)}
                      />
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">belum dimulai</span>
                  )}
                </div>
              </li>
            ))}
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
