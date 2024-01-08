"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Menu = {
  id: string;
  name: string;
  role: "admin" | "user";
  url: string;
  icon: string;
  slug: string;
  is_active: number;
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
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "icon",
    header: "Icon",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "is_active",
    header: "Keterangan",
    cell: ({ row }) => {
      const val = row.getValue("is_active");
      if (val === 1) {
        return <Badge className="bg-green-400">active</Badge>;
      } else {
        return <Badge className="bg-red-400">inactive</Badge>;
      }
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
