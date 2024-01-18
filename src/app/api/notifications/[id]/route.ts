import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id || "";
    const { is_read } = await req.json();

    const isExist = await db.notifications.count({
      where: {
        id,
      },
    });

    if (!isExist) {
      return NextResponse.json({
        status: 404,
        message: "notifikasi tidak ditemukan",
      });
    }

    const updated = await db.notifications.update({
      where: {
        id,
      },
      data: {
        is_read,
      },
    });

    return NextResponse.json({
      status: 200,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
