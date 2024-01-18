import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { addDays, daysInMonth } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pemagang = await db.pemagangs.findMany();
    return NextResponse.json({ status: 200, data: pemagang });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      username,
      divisi_id,
      name,
      place_origin,
      gender,
      start_at,
      end_at,
    } = await req.json();

    const existingUsername = await db.users.count({
      where: {
        username: username,
      },
    });
    if (existingUsername) {
      return NextResponse.json({
        message: "username already exist",
      });
    }

    const pw = process.env.DEFAULT_PASSWORD || "";
    const defaultPassword = await bcrypt.hash(pw, 10);

    const createdUser = await db.users.create({
      data: {
        username: username,
        password: defaultPassword,
        role: "user",
      },
    });

    const createdPemagang = await db.pemagangs.create({
      data: {
        user_id: createdUser.id,
        divisi_id,
        name,
        place_origin,
        gender,
        start_at,
        end_at,
      },
    });

    const currentDate = new Date(createdPemagang.start_at);
    const endDate = new Date(createdPemagang.end_at);

    let weekNumber = 1;

    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        await db.dailyReports.create({
          data: {
            pemagang_id: createdPemagang.id,
            date: currentDate,
            activity: "",
          },
        });
      }

      if (currentDate.getDay() === 1) {
        const remainingDaysInMonth =
          daysInMonth(currentDate.getMonth(), currentDate.getFullYear()) -
          currentDate.getDate() +
          1;
        const daysToAdd = remainingDaysInMonth < 7 ? remainingDaysInMonth : 6;

        await db.weeklyReports.create({
          data: {
            pemagang_id: createdPemagang.id,
            status: null,
            start_date: currentDate,
            end_date: addDays(currentDate, daysToAdd),
            week: `Minggu ${weekNumber}`,
            activity: "",
          },
        });

        weekNumber++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json({ status: 200, data: createdPemagang });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
