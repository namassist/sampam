import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

enum EnumRoleFilter {
  Admin = "admin",
  User = "user",
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const role = url.searchParams.get("role");
    let menus;

    if (!role) {
      menus = await db.menu.findMany();
    } else {
      menus = await db.menu.findMany({
        where: {
          role: role as EnumRoleFilter | undefined,
        },
      });
    }

    return NextResponse.json({ status: 200, data: menus });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, url, icon, slug, role, order, is_active } = await req.json();

    const createdMenu = await db.menu.create({
      data: {
        name,
        url,
        icon,
        slug,
        role,
        order,
        is_active,
      },
    });

    return NextResponse.json({ status: 200, data: createdMenu });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
