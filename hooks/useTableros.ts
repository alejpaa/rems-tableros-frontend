import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
  type CreateTableroDto,
  type UpdateTableroDto,
} from '@/api/tableros.service';
import type { Tablero } from '@/types/tablero';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const TABLEROS_QUERY_KEY = ['tableros'];

export const useTableros = () => {
  const queryClient = useQueryClient();

  const boardsQuery = useQuery<Tablero[], Error>({
    queryKey: TABLEROS_QUERY_KEY,
    queryFn: getBoards,
    staleTime: 1000 * 60, // 1 minuto
  });

  const invalidateBoards = () =>
    queryClient.invalidateQueries({ queryKey: TABLEROS_QUERY_KEY });

  const createMutation = useMutation<Tablero, Error, CreateTableroDto>({
    mutationFn: payload => createBoard(payload),
    onSuccess: invalidateBoards,
  });

  const updateMutation = useMutation<Tablero, Error, { id: string | number; data: UpdateTableroDto }>({
    mutationFn: ({ id, data }) => updateBoard(id, data),
    onSuccess: invalidateBoards,
  });

  const deleteMutation = useMutation<boolean, Error, string | number>({
    mutationFn: id => deleteBoard(id),
    onSuccess: invalidateBoards,
  });

  return {
    boards: boardsQuery.data ?? [],
    loading: boardsQuery.isFetching,
    error: boardsQuery.error?.message ?? null,
    refresh: boardsQuery.refetch,
    createBoard: (payload: CreateTableroDto) => createMutation.mutateAsync(payload),
    creating: createMutation.isPending,
    updateBoard: (id: string | number, data: UpdateTableroDto) =>
      updateMutation.mutateAsync({ id, data }),
    updating: updateMutation.isPending,
    removeBoard: (id: string | number) => deleteMutation.mutateAsync(id),
    removing: deleteMutation.isPending,
  };
};
