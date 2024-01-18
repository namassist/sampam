import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id || "";
    const existingPemagang = await db.pemagangs.count({
      where: {
        id,
      },
    });
    if (!existingPemagang) {
      return NextResponse.json({
        message: "data pemagang tidak ditemukan",
      });
    }

    const pemagang = await db.pemagangs.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({
      status: 200,
      data: pemagang,
    });
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
    const { username, divisi_id, password, name, place_origin, gender } =
      await req.json();

    const isExist = await db.pemagangs.count({
      where: {
        id,
      },
    });

    if (!isExist) {
      return NextResponse.json({
        status: 404,
        message: "data pemagang tidak ditemukan",
      });
    }

    const defaultPassword = await bcrypt.hash(password, 10);

    const updatedPemagang = await db.pemagangs.update({
      where: {
        id,
      },
      data: {
        divisi_id: divisi_id || undefined,
        name: name || undefined,
        place_origin: place_origin || undefined,
        gender: gender || undefined,
      },
    });

    if (updatedPemagang) {
      const updatedUser = await db.users.update({
        where: {
          id: updatedPemagang?.user_id,
        },
        data: {
          username: username || undefined,
          password: defaultPassword || undefined,
        },
      });

      return NextResponse.json({
        status: 200,
        data: updatedPemagang,
      });
    } else {
      return NextResponse.json({
        status: 500,
        message: "server error, try again!",
      });
    }
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
    const existingPemagang = await db.pemagangs.count({
      where: {
        id,
      },
    });
    if (!existingPemagang) {
      return NextResponse.json({
        message: "data pemagang tidak ditemukan",
      });
    }

    const deleted = await db.pemagangs.delete({
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
      message: "data pemagang berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
