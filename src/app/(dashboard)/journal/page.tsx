import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import pool from "@/db/db";
import { analyze } from "@/utils/ai";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

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
  return (
    <div className="p-10 bg-gray-300/40">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.length > 0 ? (
          entries.map((entry: Entry) => (
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          ))
        ) : (
          <p>No entries found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
