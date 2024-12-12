import { NextResponse } from "next/server";
import pool from "@/db/db";
import { auth } from "@clerk/nextjs/server";

export const GET = async () => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await pool.query(
      "SELECT id, created_at, content FROM entries WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    return NextResponse.json({ message: "Failed to fetch entries" }, { status: 500 });
  }
};