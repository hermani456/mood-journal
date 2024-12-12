import pool from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { content } = body;
  const { userId } = await auth();

  try {
    const result = await pool.query(
      "INSERT INTO entries (user_id, content) VALUES ($1, $2) RETURNING id, created_at, content",
      [userId, content]
    );
    revalidatePath("/journal");
    return NextResponse.json({ result: result.rows[0] }, { status: 201 });
  } catch (e) {
    console.error("Failed to create entry:", e);
    return NextResponse.json({ message: "Failed to create entry" }, { status: 500 });
  }
};
