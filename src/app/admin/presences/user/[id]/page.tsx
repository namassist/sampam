import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";

export default function Page() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-start p-[18px] bg-white rounded-lg relative my-4">
        <h1 className="text-lg font-medium">Logbook User tertentu</h1>
      </div>
    </AuthLayout>
  );
}
