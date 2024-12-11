const EntryCard = ({ entry }) => {
  const date = new Date(entry.created_at).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{entry.id}</div>
      <div className="px-4 py-4 sm:px-6">{entry.content}</div>
    </div>
  );
};

export default EntryCard;
