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

  await analyze(`Voy a darte una entrada de diario. Quiero que analices la entrada y me devuelvas los siguientes datos en formato JSON: 
- Estado de ánimo: el estado de ánimo predominante en la entrada.
- Resumen: un breve resumen de la entrada.
- Tema principal: el tema principal de la entrada.
- Color que represente el estado de ánimo: un color que simbolice el estado de ánimo.
- Análisis positivo: un booleano que indique si el análisis es positivo (true) o negativo (false).

El formato JSON debe ser exactamente como este:
{
  "estado_de_animo": "feliz",
  "resumen": "Hoy tuve un día increíble lleno de aventuras.",
  "tema_principal": "aventuras",
  "color": "amarillo",
  "analisis_positivo": true
}

Por favor, responde solo con el JSON y nada más. Entrada de diario: ${rows[0].content}`);
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
