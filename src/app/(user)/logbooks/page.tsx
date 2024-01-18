import axios from "axios";
import Link from "next/link";
import * as React from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import BadgesCircle from "@/components/badges/circles";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dateMonth } from "@/lib/utils";
import {
  CheckCheck,
  Hourglass,
  ChevronRight,
  AlertTriangle,
  MegaphoneOff,
} from "lucide-react";

async function getLogbook(id: any) {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/reports/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default async function Logbooks() {
  const user = await getServerSession(authOptions);
  const getLogbooks = getLogbook(user?.user?.id);
  const [logbooks] = await Promise.all([getLogbooks]);

  const badgeStatus = (status: string) => {
    let color;
    let message;
    let icon;

    switch (status) {
      case "Submit":
        color = "text-blue-500";
        message = "Menunggu Persetujuan";
        icon = <Hourglass className="w-4 h-4" />;
        break;
      case "Revisi":
        color = "text-yellow-500";
        message = "Direvisi";
        icon = <AlertTriangle className="w-4 h-4" />;
        break;
      case "Approve":
        color = "text-green-500";
        message = "Disetujui";
        icon = <CheckCheck className="w-4 h-4" />;
        break;
      default:
        color = "text-slate-500";
        message = "belum Dibuat";
        icon = <MegaphoneOff className="w-4 h-4" />;
        break;
    }
    return (
      <p className={`flex items-center font-medium gap-1 capitalize ${color}`}>
        {icon}
        {message}
      </p>
    );
  };

  const handleType = (activity: string) => {
    if (activity !== "") {
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
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-sm">
        <h1 className="text-lg font-medium">Logbook saya</h1>
        <Breadcrumbs role="user" currentPage="logbooks" />
      </div>
      <div className="space-y-4">
        {logbooks?.data?.reports?.map((logbook: any) => (
          <Link
            key={logbook?.id}
            className="p-[18px] bg-white rounded-lg shadow-sm flex justify-between items-center"
            href={`/logbooks/${logbook?.id}`}
          >
            <div className="box-left text-xs space-y-2">
              {badgeStatus(logbook?.status)}
              <p className="text-lg flex items-center font-semibold">
                {dateMonth(logbook?.start_date)} -{" "}
                {dateMonth(logbook?.end_date)}{" "}
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </p>
              <p className="text-xs text-gray-500">{logbook.week}</p>
            </div>
            <div className="box-right flex items-center gap-2">
              {logbook?.daily.map((d: any) => (
                <BadgesCircle
                  key={d.id}
                  type={handleType(d?.activity)}
                  title={handletitle(d?.date)}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </AuthLayout>
  );
}
