import type { Tablero } from '@/types/tablero';

// src/api/boards.service.ts

const API_URL = 'https://rems-tableros-backend.onrender.com/api/v1/tableros';

export type CreateTableroDto = Omit<Tablero, 'id'>;
export type UpdateTableroDto = Partial<CreateTableroDto>;

export const getBoards = async (): Promise<Tablero[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error fetching boards");
  }

  return (await response.json()) as Tablero[];
};

export const getTablero = async (id: string | number): Promise<Tablero> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error al obtener tablero');

  return (await res.json()) as Tablero;
};

export const deleteBoard = async (id: string | number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error("Error deleting board");
  }

  return true;
};

export const createBoard = async (boardData: CreateTableroDto): Promise<Tablero> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boardData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Error al crear tablero');
  }

  return (await response.json()) as Tablero;
};

export const updateBoard = async (
  id: string | number,
  boardData: UpdateTableroDto
): Promise<Tablero> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boardData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Error al actualizar tablero');
  }

  return (await response.json()) as Tablero;
};


