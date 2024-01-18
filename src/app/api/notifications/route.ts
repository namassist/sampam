import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const receive = url.searchParams.get("receive") || null;

    const notifications = await db.notifications.findMany({
      where: {
        receive,
      },
    });

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
    const { send, receive, message } = await req.json();

    const createdNotification = await db.notifications.create({
      data: {
        send,
        receive,
        message,
        is_read: false,
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
