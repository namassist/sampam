import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let presences;
    const url = new URL(req.url);
    const date = url.searchParams.get("date");

    if (date) {
      const dateObj = new Date(date);
      const start = dateObj.toISOString().split("T")[0] + "T00:00:00.000Z";
      const end = dateObj.toISOString().split("T")[0] + "T23:59:59.999Z";

      presences = await db.presences.findMany({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
        },
      });
    } else {
      presences = await db.presences.findMany();
    }

    return NextResponse.json({ status: 200, data: presences });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { status, pemagang_id } = await req.json();
    const dateObj = new Date();

    const start = dateObj.toISOString().split("T")[0] + "T00:00:00.000Z";
    const end = dateObj.toISOString().split("T")[0] + "T23:59:59.999Z";

    const isExist = await db.presences.findFirst({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
    console.log(isExist);
    if (isExist) {
      return NextResponse.json({
        status: 409,
        message: "kamu sudah presensi hari ini!",
      });
    }

    const createdPemagang = await db.presences.create({
      data: {
        status,
        pemagang_id,
      },
    });

    return NextResponse.json({ status: 200, data: createdPemagang });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
