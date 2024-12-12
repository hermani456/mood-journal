import Editor from "@/components/Editor";
import { auth } from "@clerk/nextjs/server";
import pool from "@/db/db";

interface Entry {
  entry_id: string;
  user_id: string;
  entry_created_at: string;
  content: string;
  analysis_id: string;
  analysis_created_at: string;
  mood: string;
  summary: string;
  main_topic: string;
  color: string;
  negative: boolean;
}

const getEntry = async (id: string): Promise<Entry> => {
  const { userId } = await auth();
  const { rows } = await pool.query(
    `SELECT 
    e.id AS entry_id,
    e.user_id,
    e.created_at AS entry_created_at,
    e.content,
    a.id AS analysis_id,
    a.entry_id,
    a.created_at AS analysis_created_at,
    a.mood,
    a.summary,
    a.main_topic,
    a.color,
    a.negative
FROM 
    entries e
JOIN 
    analysis a ON e.id = a.entry_id
WHERE 
    e.id = $1 AND e.user_id = $2;`,
    [id, userId]
  );
  return rows[0];
};

const EntryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const entry = await getEntry(id);
  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
