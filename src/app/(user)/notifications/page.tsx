import Alerts from "@/components/alerts";
import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

import { getServerSession } from "next-auth";

async function getNotifications(id: any) {
  const response = await db.notifications.findMany({
    where: {
      receive: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
}

export default async function Notifikasi() {
  const user = await getServerSession(authOptions);
  const notifications = await getNotifications(user?.user?.id);

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Notifikasi</h1>
        <Breadcrumbs role="user" currentPage="Notifikasi" />
      </div>
      <div className="space-y-2">
        {notifications?.map((notif) => (
          <Alerts key={notif?.id} data={notif} />
        ))}
      </div>
    </AuthLayout>
  );
}
