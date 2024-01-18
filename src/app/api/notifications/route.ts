import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("pemagang_id") || "";
    let notifications;

    if (!id) {
      notifications = await db.notifications.findMany();
    } else {
      notifications = await db.notifications.findMany({
        where: {
          pemagang_id: id,
        },
      });
    }

    return NextResponse.json({ status: 200, data: notifications });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { pemagang_id, message } = await req.json();

    const createdNotification = await db.notifications.create({
      data: {
        pemagang_id,
        message,
      },
    });

    return NextResponse.json({ status: 200, data: createdNotification });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
