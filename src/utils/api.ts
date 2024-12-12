export const updateEntry = async (id: string, content: string) => {
  const response = await fetch(`/api/journal/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.result;
  }
};
