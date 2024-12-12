"use client";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();
  const handleOnClick = async () => {
    const response = await fetch("/api/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: "Escribe sobre tu dia" }),
    });
    if (response.ok) {
      const data = await response.json();
      router.push(`/journal/${data.result.id}`);
    } else {
      console.error("Failed to create entry:", response);
    }
  };
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="lg:text-3xl font-semibold">Nueva entrada</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
