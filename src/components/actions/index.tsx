import React from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface ActionsProps {
  id: string;
  endpoint: string;
}

const Actions: React.FC<ActionsProps> = ({ id, endpoint }) => {
  const router = useRouter();
  const { toast } = useToast();

  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    } finally {
      toast({
        className: "text-green-600 bg-gray-100",
        title: "Sukses",
        description: "Berhasil menghapus data!",
      });
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleDelete(id)}
        className="cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Actions;
