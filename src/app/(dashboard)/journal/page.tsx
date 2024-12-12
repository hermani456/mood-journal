"use client";

import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Entry {
  id: number;
  content: string;
  created_at: Date;
}

const Page = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const getEntries = async () => {
    try {
      const response = await fetch("/api/entries");
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        console.error("Failed to fetch entries");
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div className="p-10 bg-gray-300/40">
      <h2 className="text-3xl mb-8">Mi Diario</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.length > 0 ? (
          entries.map((entry: Entry) => (
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          ))
        ) : (
          <p>No se encontraron entradas.</p>
        )}
      </div>
    </div>
  );
};

export default Page;