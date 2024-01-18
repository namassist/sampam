"use client";

import axios from "axios";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { dateString } from "@/lib/utils";
import { Check } from "lucide-react";
import { BiSolidBell } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const Alerts = ({ data }: { data: any }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleIsRead = async (id: any) => {
    try {
      const response = await axios.put(`/api/notifications/${id}`, {
        is_read: true,
      });

      if (response?.data?.status === 200) {
        toast({
          title: "Sukses",
        });

        return response.data;
      }
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-between  border rounded-lg pl-2 pr-5 ${
        data?.is_read ? "bg-white" : "bg-red-100"
      }`}
    >
      <Alert>
        <BiSolidBell className="h-4 w-4" />
        <AlertTitle>{dateString(data?.createdAt)}</AlertTitle>
        <AlertDescription>{data?.message}</AlertDescription>
      </Alert>
      {data?.is_read ? null : isLoading ? (
        <Button className="w-full" disabled>
          <ReloadIcon className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button size="sm" onClick={() => handleIsRead(data?.id)}>
          <Check className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default Alerts;
