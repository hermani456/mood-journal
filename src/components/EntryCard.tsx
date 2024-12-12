interface Entry {
  id: number;
  content: string;
  created_at: Date;
}

const EntryCard = ({ entry }: { entry: Entry }) => {
  const date = new Date(entry.created_at).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow h-[10rem]">
      <div className="p-2 text-xs lg:text-lg">{date}</div>
      {/* <div className="px-4 py-5 sm:p-6">{entry.id}</div> */}
      <div className="p-2 text-xs lg:text-lg py-2">{entry.content}</div>
    </div>
  );
};

export default EntryCard;
