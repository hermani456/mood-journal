import pool from "@/db/db";
import { analyze } from "@/utils/ai";
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

    const analysis = await analyze(content);
    await pool.query(
      "INSERT INTO analysis (entry_id, mood, summary, main_topic, color, negative) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        result.rows[0].id,
        analysis.estado_de_animo,
        analysis.resumen,
        analysis.tema_principal,
        analysis.color,
        analysis.analisis_negativo,
      ]
    );

    revalidatePath("/journal");
    return NextResponse.json({ result: result.rows[0] }, { status: 201 });
  } catch (e) {
    console.error("Failed to create entry:", e);
    return NextResponse.json({ message: "Failed to create entry" }, { status: 500 });
  }
};
