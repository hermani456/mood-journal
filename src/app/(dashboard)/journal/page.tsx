import pool from "@/db/db";
import { auth } from "@clerk/nextjs/server";

interface Entry {
  id: number;
  content: string;
  created_at: Date;
}

const getEntries = async (): Promise<Entry[]> => {
  const { userId } = await auth();

  const { rows } = await pool.query(
    "SELECT id, created_at, content FROM entries WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

const page = async () => {
    const entries = await getEntries();
  console.log(entries);
  return (
    <div>
      <h1>Journal</h1>
      <ul>
        {entries.length > 0 ? (
          entries.map((entry: Entry) => <li key={entry.id}>{entry.content}</li>)
        ) : (
          <p>No entries found.</p>
        )}
      </ul>
    </div>
  );
};

export default page;
