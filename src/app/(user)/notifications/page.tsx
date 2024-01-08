import AuthLayout from "@/components/layouts/AuthLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BiSolidBell } from "react-icons/bi";

export default function Notifikasi() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Notifikasi</h1>
      </div>
      <div className="space-y-2">
        <Alert>
          <BiSolidBell className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
        <Alert>
          <BiSolidBell className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
    </AuthLayout>
  );
}
