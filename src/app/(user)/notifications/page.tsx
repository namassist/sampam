import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BiSolidBell } from "react-icons/bi";

export default function Notifikasi() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Notifikasi</h1>
        <Breadcrumbs role="user" currentPage="Notifikasi" />
      </div>
      <div className="space-y-2">
        <Alert>
          <BiSolidBell className="h-4 w-4" />
          <AlertTitle>Yeayy!</AlertTitle>
          <AlertDescription>
            Laporan Mingguanmu pada tanggal 15-19 Januari 2024 disetujui oleh
            mentor.
          </AlertDescription>
        </Alert>
        <Alert>
          <BiSolidBell className="h-4 w-4" />
          <AlertTitle>Yeay!</AlertTitle>
          <AlertDescription>
            Laporan Mingguanmu pada tanggal 15-19 Januari 2024 disetujui oleh
            mentor.
          </AlertDescription>
        </Alert>
      </div>
    </AuthLayout>
  );
}
