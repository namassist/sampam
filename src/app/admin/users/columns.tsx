"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type User = {
  id: string;
  name: string;
  asal: string;
  divisi: string;
  gender: "lakilaki" | "perempuan";
  start_at: string;
  end_at: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "number",
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "divisi",
    header: "Divisi",
  },
  {
    accessorKey: "asal",
    header: "Asal",
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "start_at",
    header: "Waktu Mulai Magang",
    cell: ({ row }) => {
      const date = new Date(row.getValue("start_at"));
      let options = { day: "2-digit", month: "long", year: "numeric" } as const;

      const formatted = date.toLocaleDateString("id-ID", options);

      return formatted;
    },
  },
  {
    accessorKey: "end_at",
    header: "Waktu Berakhir Magang",
    cell: ({ row }) => {
      const date = new Date(row.getValue("end_at"));
      let options = { day: "2-digit", month: "long", year: "numeric" } as const;

      const formatted = date.toLocaleDateString("id-ID", options);

      return formatted;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-col lg:flex-row gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log(user.id)}
            className="cursor-pointer"
          >
            <PencilLine className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => console.log(user.id)}
            className="cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
