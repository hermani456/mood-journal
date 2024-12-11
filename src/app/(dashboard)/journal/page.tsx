import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
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

// {entries.length > 0 ? (
//     entries.map((entry: Entry) => <li key={entry.id}>{entry.content}</li>)
//   ) : (
//     <p>No entries found.</p>
//   )}

const page = async () => {
  const entries = await getEntries();
  console.log(entries);
  return (
    <div className="p-10 bg-gray-300/40">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.length > 0 ? (
          entries.map((entry: Entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        ) : (
          <p>No entries found.</p>
        )}
      </div>
    </div>
  );
};

export default page;
