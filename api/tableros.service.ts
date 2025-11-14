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

export const createBoard = async (boardData: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boardData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Error al crear tablero');
  }

  return await response.json();
};
