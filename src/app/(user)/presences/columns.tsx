"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";

export type Menu = {
  id: string;
  status: "Hadir" | "Izin" | "Sakit";
  created_at: string;
};

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "number",
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      let options = { day: "2-digit", month: "long", year: "numeric" } as const;

      const formatted = date.toLocaleDateString("id-ID", options);

      return formatted;
    },
  },
  {
    accessorKey: "waktu",
    header: "Waktu Presensi",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      return formatted;
    },
  },
  {
    accessorKey: "status",
    header: "Status Presensi",
    cell: ({ row }) => {
      const status = row.getValue("status") as React.ReactNode;
      let formatted;

      if (status === "Hadir") {
        formatted = <Badge className="bg-green-400">{status}</Badge>;
      } else {
        formatted = <Badge className="bg-yellow-400">{status}</Badge>;
      }

      return formatted;
    },
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
    cell: ({ row }) => {
      const status = row.getValue("status") as React.ReactNode;
      let formatted;

      if (status === "Hadir") {
        formatted = <Badge className="bg-green-400">Tepat Waktu</Badge>;
      } else {
        formatted = <Badge className="bg-red-400">Terlambat</Badge>;
      }

      return formatted;
    },
  },
];
