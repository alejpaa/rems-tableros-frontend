import { ConfirmDeleteModal } from '@/components/confirm-delete-modal';
import { Screen } from '@/components/Screen';
import { BoardCard } from '@/components/tableros-card';
import { useTableros } from '@/hooks/useTableros';
import { type Tablero } from '@/types/tablero';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function Tableros() {
  const router = useRouter();
  const { boards, loading, error, refresh, removeBoard } = useTableros();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<Tablero | null>(null);

  const handleEdit = useCallback((board: Tablero) => {
    router.push(`/editar-tablero/${board.id}`);
  }, [router]);

  const handleDelete = useCallback((board: Tablero) => {
    setBoardToDelete(board);
    setDeleteModalVisible(true);
  }, []);

  const handleViewDetails = useCallback((board: Tablero) => {
    router.push(`/detalle-tablero/${board.id}`);
  },[router]);

const confirmDelete = async () => {
  if (boardToDelete) {
    try {
      await removeBoard(boardToDelete.id);
    } catch {
      Alert.alert("Error", "No se pudo eliminar el tablero");
    }
  }

  setDeleteModalVisible(false);
  setBoardToDelete(null);
};

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setBoardToDelete(null);
  };

  // --- Loading state ( ---
  if (loading && !boards.length) { // Mostramos loading solo si no hay tableros
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
          <Text className="mt-2 text-text-muted">Cargando tableros...</Text>
        </View>
      </Screen>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-danger text-center mb-4">Error: {error}</Text>

          <TouchableOpacity
            className="bg-blue-600 py-2 px-6 rounded-lg"
            onPress={async () => await refresh()}
          >
            <Text className="text-white font-medium">Reintentar</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  // --- 2. Success state ---
  return (
    <Screen>
      <ConfirmDeleteModal
        visible={deleteModalVisible}
        title="Eliminar tablero"
        message={`¿Estás seguro de que deseas eliminar "${boardToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
      
      <FlatList
        data={boards}
        keyExtractor={(item: Tablero) => item.id.toString()}
        
        renderItem={({ item }) => (
          <BoardCard
            board={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
            onPress={() => handleViewDetails(item)}
          />
        )}
        
        //título en la parte superior de la lista
        ListHeaderComponent={() => (
          <View className="mb-5">
            <Text className="text-3xl font-bold text-gray-900 mb-1">
              Tableros Eléctricos
            </Text>
            <Text className="text-sm text-gray-500">
              Gestiona tus tableros eléctricos
            </Text>
          </View>
        )}
        
        // ItemSeparatorComponent
        ItemSeparatorComponent={() => <View className="h-5" />}

        contentContainerStyle={{
          paddingHorizontal: 4,
          paddingTop: 8,
          paddingBottom: 104,
        }}
        
        showsVerticalScrollIndicator={false}

        onRefresh={refresh} // La función que se llama al deslizar
        refreshing={loading} // Muestra el indicador de carga si loading es true
        
      />
    </Screen>
  );
}