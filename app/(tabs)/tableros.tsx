import { Screen } from '@/components/Screen';
import { BoardCard } from '@/components/tableros-card';
import { useTableros } from '@/hooks/useTableros';
import { type Tablero } from '@/types/tablero';
import { useRouter } from 'expo-router';
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

  const handleEdit = (board: Tablero) => {
    router.push(`/editar-tablero/${board.id}`);
  };

  const handleDelete = (board: Tablero) => {
    Alert.alert('Eliminar tablero', `Confirmar eliminación de "${board.nombre}".`);
    removeBoard(board.id)
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
      <FlatList
        data={boards}
        // keyExtractor es crucial para el rendimiento
        keyExtractor={(item: Tablero) => item.id.toString()}
        
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