import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    const id = context.params.id;
    const body = await req.json();

    const isExist = await db.dailyReports.count({
      where: {
        id,
      },
    });

    if (!isExist) {
      return NextResponse.json({
        status: 404,
        message: "data logbook tidak ditemukan",
      });
    }

    const updatedLogbook = await db.dailyReports.update({
      where: {
        id,
      },
      data: {
        activity: body.activity,
      },
    });

    return NextResponse.json({
      status: 200,
      data: updatedLogbook,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
