"use server";
import { db } from "@/lib/db";

export async function getMenus(r: any) {
  const menus = await db.menu.findMany({
    where: {
      role: r,
      is_active: 1,
    },
    orderBy: {
      order: "asc",
    },
  });

  return menus;
}
