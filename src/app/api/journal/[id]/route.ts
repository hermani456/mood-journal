import pool from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";

export const PATCH = async (request: Request, { params }) => {
  const { id } = await params;
  console.log("id", id);
  const body = await request.json();
  const { content } = body;
  const { userId } = await auth();

  try {
    const result = await pool.query(
      "UPDATE entries SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING id, created_at, content",
      [content, id, userId]
    );

    const analysis = await analyze(result.rows[0].content);
    const analysisResult = await pool.query(
      "UPDATE analysis SET mood = $1, summary = $2, main_topic = $3, color = $4, negative = $5 WHERE entry_id = $6 RETURNING *",
      [
        analysis.estado_de_animo,
        analysis.resumen,
        analysis.tema_principal,
        analysis.color,
        analysis.analisis_negativo,
        result.rows[0].id,
      ]
    );
    return NextResponse.json({ result: analysisResult.rows[0] });
  } catch (e) {
    console.error("Failed to update entry:", e);
    return NextResponse.json(
      { message: "Failed to update entry" },
      { status: 500 }
    );
  }
};
