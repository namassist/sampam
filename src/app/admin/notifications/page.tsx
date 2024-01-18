import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { db } from "@/lib/db";
import { BiSolidBell } from "react-icons/bi";

async function getNotifications() {
  const response = await db.notifications.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
}

export default async function Notifikasi() {
  const notifications = await getNotifications();

  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Notifikasi</h1>
        <Breadcrumbs role="Admin" currentPage="Notifikasi" />
      </div>
      <div className="space-y-2">
        {notifications?.map((item) => (
          <Alert key={item.id}>
            <BiSolidBell className="h-4 w-4" />
            <AlertTitle>Pemberitahuan!</AlertTitle>
            <AlertDescription>{item.message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </AuthLayout>
  );
}
