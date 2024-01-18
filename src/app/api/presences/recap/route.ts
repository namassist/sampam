import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const start_date = url.searchParams.get("start");
    const end_date = url.searchParams.get("end");

    const start = start_date + "T00:00:00.000Z";
    const end = end_date + "T23:59:59.999Z";

    const pemagangs = await db.pemagangs.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        place_origin: true,
      },
    });

    const result = [];

    for (const pemagang of pemagangs) {
      const presences = await db.presences.findMany({
        where: {
          pemagang_id: pemagang.id,
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        orderBy: { createdAt: "asc" },
        select: {
          createdAt: true,
          status: true,
        },
      });

      result.push({
        id: pemagang.id,
        name: pemagang.name,
        place_origin: pemagang.place_origin,
        presences,
      });
    }

    return NextResponse.json({ status: 200, data: result });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
