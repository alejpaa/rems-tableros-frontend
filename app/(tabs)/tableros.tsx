import { Alert, ScrollView, Text, View } from 'react-native';

import { Screen } from '@/components/Screen';
import { BoardCard, type Board } from '@/components/tableros-card';

const mockBoards: Board[] = [
  {
    id: 'board-1',
    name: 'Tablero Norte',
    location: 'Ciudad de México',
    description: 'Infraestructura estratégica con campaña de alto impacto para candidatos presidenciales.',
  },
  {
    id: 'board-2',
    name: 'Avenida Central',
    location: 'Bogotá',
    description: 'Ubicación premium sobre eje financiero, ideal para reforzar posicionamiento de marca personal.',
  },
  {
    id: 'board-3',
    name: 'Costanera 45',
    location: 'Santiago de Chile',
    description: 'Tráfico vehicular constante y visibilidad 24/7 con iluminación LED de bajo consumo.',
  },
];

export default function Tableros() {
  const handleEdit = (board: Board) => {
    Alert.alert('Editar tablero', `Abrir flujo de edición para "${board.name}".`);
  };

  const handleDelete = (board: Board) => {
    Alert.alert('Eliminar tablero', `Confirmar eliminación de "${board.name}".`);
  };

  return (
    <Screen>
      <View className="flex-1 gap-6">
        <View className="gap-2">
          <Text className="text-3xl font-bold text-text-title">Tableros Electricos</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="gap-4">
            {mockBoards.map(board => (
              <BoardCard
                key={board.id}
                board={board}
                onEdit={() => handleEdit(board)}
                onDelete={() => handleDelete(board)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
