import pool from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }) => {
  const { id } = await params;
  const body = await request.json();
  const { content } = body;
  const { userId } = await auth();

  try {
    const result = await pool.query(
      "UPDATE entries SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING id, created_at, content",
      [content, id, userId]
    );
    return NextResponse.json({ result: result.rows[0] });
  } catch (e) {
    console.error("Failed to update entry:", e);
    return NextResponse.json(
      { message: "Failed to update entry" },
      { status: 500 }
    );
  }
};
