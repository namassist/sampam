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
    const isExist = await db.pemagangs.count({
      where: {
        id,
      },
    });

    if (!isExist) {
      return NextResponse.json({
        status: 404,
        message: "pemagang tidak ditemukan",
      });
    }

    const pemagang = await db.pemagangs.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        place_origin: true,
      },
    });

    const weeklyReport = await db.weeklyReports.findMany({
      where: {
        pemagang_id: pemagang?.id,
      },
      orderBy: { start_date: "asc" },
    });

    const dailyReport = await db.dailyReports.findMany({
      where: {
        pemagang_id: pemagang?.id,
      },
      orderBy: { date: "asc" },
    });

    const response = {
      id: pemagang?.id,
      name: pemagang?.name,
      place_origin: pemagang?.place_origin,
      reports: weeklyReport.map((report) => ({
        id: report.id,
        status: report.status,
        start_date: report.start_date,
        end_date: report.end_date,
        week: report.week,
        activity: report.activity,
        daily: dailyReport
          .filter(
            (daily) =>
              daily.date >= report?.start_date && daily.date <= report?.end_date
          )
          .map((daily) => ({
            id: daily.id,
            pemagang_id: daily.pemagang_id,
            date: daily.date,
            activity: daily.activity,
            createdAt: daily.createdAt,
            updatedAt: daily.updatedAt,
          })),
      })),
    };

    return NextResponse.json({
      status: 200,
      data: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
