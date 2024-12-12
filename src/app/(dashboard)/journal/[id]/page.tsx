import Editor from "@/components/Editor";
import { auth } from "@clerk/nextjs/server";
import pool from "@/db/db";

const getEntry = async (id) => {
  const { userId } = await auth();
  const { rows } = await pool.query(
    "SELECT * FROM entries WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return rows[0];
};

const EntryPage = async ({ params }) => {
  const { id } = await params;
  const entry = await getEntry(id);
  const analysisData = [
    { name: "Summary", value: "ASas" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: 'False' },
  ];
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-500 px-6 py-10">
          <h2 className="text-xl text-white">Analisys</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="px-6 py-4 border-b border-black/10 flex justify-between items-center"
              >
                <h3 className="font-semibold">{data.name}</h3>
                <p>{data.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
