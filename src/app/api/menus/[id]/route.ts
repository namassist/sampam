import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    const id = context.params.id || "";
    const menuExisting = await db.menu.count({
      where: {
        id,
      },
    });

    if (!menuExisting) {
      return NextResponse.json({
        status: 404,
        message: "menu tidak ditemukan",
      });
    }

    const menu = await db.menu.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ status: 200, data: menu });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id || "";
    const { name, url, icon, slug, role, order, is_active } = await req.json();

    const menuExisting = await db.menu.count({
      where: {
        id,
      },
    });

    if (!menuExisting) {
      return NextResponse.json({
        status: 404,
        message: "menu tidak ditemukan",
      });
    }

    const updatedMenu = await db.menu.update({
      where: {
        id,
      },
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

    return NextResponse.json({
      status: 200,
      data: updatedMenu,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id || "";

    const menuExisting = await db.menu.count({
      where: { id },
    });

    if (!menuExisting) {
      return NextResponse.json({
        status: 404,
        message: "menu tidak ditemukan",
      });
    }

    const deletedMenu = await db.menu.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "data menu berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
