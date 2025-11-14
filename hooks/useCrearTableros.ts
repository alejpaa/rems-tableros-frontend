// src/hooks/useCreateBoard.ts
import { createBoard } from '@/api/tableros.service';
import { useState } from 'react';

export const useCreateBoard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const result = await createBoard(data);
      return result;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};
