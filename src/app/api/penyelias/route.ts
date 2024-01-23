import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { addDays, daysInMonth } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, nama, nip, bidang } = await req.json();

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
        role: "admin",
      },
    });

    const createdPemagang = await db.penyelia.create({
      data: {
        user_id: createdUser.id,
        nama,
        bidang,
        nip,
      },
    });

    return NextResponse.json({ status: 200, data: createdPemagang });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "server error, try again!",
    });
  }
}
