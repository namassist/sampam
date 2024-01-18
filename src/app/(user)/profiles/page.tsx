import Breadcrumbs from "@/components/breadcrumbs";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BiSolidBell } from "react-icons/bi";

export default function Profile() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Profile</h1>
        <Breadcrumbs role="user" currentPage="Profile" />
      </div>
      <div className="space-y-2"></div>
    </AuthLayout>
  );
}
