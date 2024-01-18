import * as React from "react";
import axios from "axios";
import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import FormReports from "@/components/forms/FormReports";

async function getLogbook(id: any) {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/reports/weekly/${id}`);
    if (res.status === 200) {
      return res?.data?.data;
    }
  } catch (error) {
    throw error;
  }
}

export default async function Page({ params }: { params: any }) {
  const id = params.id;
  const getLogbooks = getLogbook(id);
  const [logbooks] = await Promise.all([getLogbooks]);

  const allActivitiesValid = logbooks?.daily.every(
    (dailyEntry: any) =>
      typeof dailyEntry.activity === "string" &&
      dailyEntry.activity.trim() !== ""
  );

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4 shadow-sm">
        <h1 className="text-lg font-medium">Logbook Mingguan</h1>
        <Breadcrumbs role="user" currentPage="logbooks" />
      </div>
      <div className="space-y-4">
        <div className="w-full flex flex-wrap gap-5">
          {logbooks?.daily.map((data: any) => (
            <FormReports
              key={data.id}
              report={data}
              status={logbooks?.status}
            />
          ))}
          {allActivitiesValid && (
            <FormReports
              key={logbooks.id}
              report={logbooks}
              status={logbooks?.status}
            />
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
