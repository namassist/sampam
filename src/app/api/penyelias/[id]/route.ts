import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id || "";
    const existingPemagang = await db.penyelia.count({
      where: {
        id,
      },
    });
    if (!existingPemagang) {
      return NextResponse.json({
        message: "data penyelia tidak ditemukan",
      });
    }

    const deleted = await db.penyelia.delete({
      where: {
        id,
      },
    });

    const deletedUser = await db.users.delete({
      where: {
        id: deleted?.user_id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "data penyelia berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
