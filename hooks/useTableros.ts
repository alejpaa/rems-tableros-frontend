// src/hooks/useBoards.ts
import { deleteBoard, getBoards } from "@/api/tableros.service";
import { useEffect, useState } from "react";

export const useBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBoards();
      setBoards(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const removeBoard = async (id: number) => {
    await deleteBoard(id);
    fetchBoards();
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return {
    boards,
    loading,
    error,
    refresh: fetchBoards,
    removeBoard,
  };
};
