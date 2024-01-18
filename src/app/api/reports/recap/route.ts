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
      const weeklyReports = await db.weeklyReports.findMany({
        where: {
          pemagang_id: pemagang.id,
          start_date: {
            gte: start,
          },
          end_date: {
            lte: end,
          },
        },
        select: {
          activity: true,
          status: true,
          start_date: true,
          end_date: true,
        },
        orderBy: { start_date: "asc" },
      });

      const dailyReports = await db.dailyReports.findMany({
        where: {
          pemagang_id: pemagang.id,
          date: {
            gte: start,
            lte: end,
          },
        },
        select: {
          activity: true,
          date: true,
        },
        orderBy: { date: "asc" },
      });

      const reports = weeklyReports.map((weekly) => {
        return {
          ...weekly,
          daily: dailyReports.filter(
            (daily) =>
              daily.date >= weekly.start_date && daily.date <= weekly.end_date
          ),
        };
      });

      result.push({
        id: pemagang.id,
        name: pemagang.name,
        place_origin: pemagang.place_origin,
        reports,
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
