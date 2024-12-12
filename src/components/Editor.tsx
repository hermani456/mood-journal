"use client";
import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

interface Entry {
  entry_id: string;
  content: string;
  summary: string;
  mood: string;
  main_topic: string;
  negative: boolean;
  color: string;
}

const Editor = ({ entry }: { entry: Entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry);

  const { summary, mood, main_topic, negative, color } = analysis;
  const analysisData = [
    { name: "Resumen", value: summary },
    { name: "Tema", value: main_topic },
    { name: "Animo", value: mood },
    { name: "Negativo", value: negative ? "Si" : "No" },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.entry_id, _value);
      setAnalysis(updated);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="text-2xl">Guardando...</div>
          </div>
        )}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
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

export default Editor;
