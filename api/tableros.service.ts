// src/api/boards.service.ts
const API_URL = "https://rems-tableros-backend.onrender.com/api/v1/tableros";

export const getBoards = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error fetching boards");
  }

  return await response.json();
};

export const deleteBoard = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting board");
  }

  return true;
};
