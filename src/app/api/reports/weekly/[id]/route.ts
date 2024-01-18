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
    const isExist = await db.weeklyReports.count({
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

    const weeklyReport = await db.weeklyReports.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        start_date: true,
        end_date: true,
        week: true,
        activity: true,
        pemagang_id: true,
        pemagang: {
          select: {
            name: true,
          },
        },
      },
    });

    const dailyReport = await db.dailyReports.findMany({
      where: {
        pemagang_id: weeklyReport?.pemagang_id,
      },
      orderBy: { date: "asc" },
    });

    if (weeklyReport) {
    }

    const response = {
      id: weeklyReport?.id,
      name: weeklyReport?.pemagang?.name,
      status: weeklyReport?.status,
      start_date: weeklyReport?.start_date,
      end_date: weeklyReport?.end_date,
      week: weeklyReport?.week,
      activity: weeklyReport?.activity,
      daily: dailyReport
        .filter(
          (daily) =>
            daily.date >= weeklyReport!.start_date &&
            daily.date <= weeklyReport!.end_date
        )
        .map((daily) => ({
          id: daily.id,
          pemagang_id: daily.pemagang_id,
          date: daily.date,
          activity: daily.activity,
          createdAt: daily.createdAt,
          updatedAt: daily.updatedAt,
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

    const isExist = await db.weeklyReports.count({
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

    const updatedLogbook = await db.weeklyReports.update({
      where: {
        id,
      },
      data: {
        status: body.status || undefined,
        activity: body.activity || undefined,
        information: body.information || undefined,
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
