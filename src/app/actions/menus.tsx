"use server";
import { db } from "@/lib/db";

export async function getMenus() {
  const menus = await db.menu.findMany({
    where: {
      role: "user",
      is_active: 1,
    },
    orderBy: {
      order: "asc",
    },
  });

  return menus;
}
