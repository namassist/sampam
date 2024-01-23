"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { LuEye } from "react-icons/lu";
import { dateString } from "@/lib/utils";

export type User = {
  id: string;
  name: string;
  place_origin: string;
  divisi: string;
  gender: "lakilaki" | "perempuan";
  start_at: Date;
  end_at: Date;
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
    accessorKey: "place_origin",
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
      const date = dateString(row.getValue("start_at"));
      return date;
    },
  },
  {
    accessorKey: "end_at",
    header: "Waktu Berakhir Magang",
    cell: ({ row }) => {
      const date = dateString(row.getValue("end_at"));
      return date;
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link
          href={`/admin/logbooks/user/${user.id}`}
          className="cursor-pointer"
        >
          <LuEye size={15} />
        </Link>
      );
    },
  },
];
