import pool from "@/db/db";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { content } = body;
  const { userId } = await auth();

  try {
    const data = await pool.query(
      "INSERT INTO entries (user_id, content) VALUES ($1, $2)",
      [userId, content]
    );
    NextResponse.json({ data }, { status: 201 });
  } catch (e) {
    console.error("Failed to create entry:", e);
    NextResponse.json({ message: "Failed to create entry" }, { status: 500 });
  }
};
