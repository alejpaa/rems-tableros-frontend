import { Screen } from '@/components/Screen';
import { BoardCard, type Board } from '@/components/tableros-card';
import { useBoards } from '@/hooks/useTableros';
import {
  ActivityIndicator,
  Alert,
  FlatList, // 1. Importamos FlatList
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function Tableros() {
  const { boards, loading, error, refresh } = useBoards();

  const handleEdit = (board: Board) => {
    Alert.alert('Editar tablero', `Abrir flujo de edición para "${board.nombre}".`);
  };

  const handleDelete = (board: Board) => {
    Alert.alert('Eliminar tablero', `Confirmar eliminación de "${board.nombre}".`);
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
            onPress={refresh}
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
      <FlatList
        data={boards}
        // keyExtractor es crucial para el rendimiento
        keyExtractor={(item: Board) => item.id.toString()}
        
        // renderItem reemplaza la lógica de .map()
        renderItem={({ item }) => (
          <BoardCard
            board={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
        
        // ListHeaderComponent pone el título en la parte superior de la lista
        ListHeaderComponent={() => (
          <View>
            <Text className="text-3xl font-bold text-text-title">
              Tableros Eléctricos
            </Text>
          </View>
        )}
        
        // ItemSeparatorComponent es la forma correcta de añadir un "gap"
        ItemSeparatorComponent={() => <View className="h-4" />}
        
        // Añadimos padding al contenedor de la lista
        contentContainerStyle={{
          paddingHorizontal: 4, // Ajusta tu padding horizontal aquí
          paddingBottom: 104, // Padding en el fondo
        }}
        
        showsVerticalScrollIndicator={false}

        // 3. Bonus: Habilitamos "Pull to Refresh"
        onRefresh={refresh} // La función que se llama al deslizar
        refreshing={loading} // Muestra el indicador de carga si loading es true
        
      />
    </Screen>
  );
}