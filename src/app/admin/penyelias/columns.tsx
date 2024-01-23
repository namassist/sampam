"use client";

import { ColumnDef } from "@tanstack/react-table";
import Actions from "@/components/actions";

export type User = {
  id: string;
  nama: string;
  nip: string;
  bidang: string;
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
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "bidang",
    header: "Bidang",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const user = row.original;
      return <Actions id={user.id} endpoint="/api/penyelias" />;
    },
  },
];
