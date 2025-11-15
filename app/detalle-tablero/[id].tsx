import { Screen } from '@/components/Screen';
import { useTableros } from '@/hooks/useTableros';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type DetailRowProps = {
  label: string;
  value: string | number;
  icon?: keyof typeof Ionicons.glyphMap;
};

const DetailRow = ({ label, value, icon }: DetailRowProps) => (
  <View className="bg-white rounded-xl p-4 shadow-sm">
    <View className="flex-row items-center mb-2">
      {icon && (
        <Ionicons name={icon} size={20} color="#6B7280" style={{ marginRight: 8 }} />
      )}
      <Text className="text-sm text-gray-500 font-medium">{label}</Text>
    </View>
    <Text className="text-lg text-gray-900 font-semibold">{value}</Text>
  </View>
);

const StatusBadge = ({ estado }: { estado: string }) => {
  const getStatusStyle = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'activo':
      case 'operativo':
        return 'bg-green-100 text-green-700';
      case 'inactivo':
      case 'fuera de servicio':
        return 'bg-red-100 text-red-700';
      case 'mantenimiento':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <View className={`self-start px-4 py-2 rounded-full ${getStatusStyle(estado)}`}>
      <Text className={`text-sm font-semibold ${getStatusStyle(estado).split(' ')[1]}`}>
        {estado}
      </Text>
    </View>
  );
};

export default function DetalleTablero() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { boards, loading } = useTableros();

  const tablero = boards.find((board) => board.id === id);

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
          <Text className="mt-2 text-text-muted">Cargando...</Text>
        </View>
      </Screen>
    );
  }

  if (!tablero) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="alert-circle-outline" size={64} color="#DC2626" />
          <Text className="text-xl font-bold text-gray-900 mt-4 text-center">
            Tablero no encontrado
          </Text>
          <TouchableOpacity
            className="bg-blue-600 py-3 px-6 rounded-lg mt-6"
            onPress={() => router.back()}
          >
            <Text className="text-white font-semibold">Volver</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header con botón de volver */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3 p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900 flex-1">
            Detalles del Tablero
          </Text>
        </View>

        {/* Tarjeta principal con nombre y estado */}
        <View className="bg-blue-600 rounded-2xl p-6 mb-6 shadow-md">
          <Text className="text-3xl font-bold text-white mb-3">
            {tablero.nombre}
          </Text>
          <View className="flex-row items-center mb-4">
            <Ionicons name="location" size={18} color="#DBEAFE" />
            <Text className="text-blue-100 text-base ml-2">
              {tablero.ubicacion}
            </Text>
          </View>
          <StatusBadge estado={tablero.estado} />
        </View>

        {/* Grid de información */}
        <View className="gap-4">
          <DetailRow
            label="Marca"
            value={tablero.marca}
            icon="business-outline"
          />
          
          <DetailRow
            label="Capacidad"
            value={`${tablero.capacidad_amperios} Amperios`}
            icon="flash-outline"
          />
          
          <DetailRow
            label="Año de Fabricación"
            value={tablero.ano_fabricacion}
            icon="construct-outline"
          />
          
          <DetailRow
            label="Año de Instalación"
            value={tablero.ano_instalacion}
            icon="calendar-outline"
          />

          {/* Información adicional */}
          <View className="bg-gray-50 rounded-xl p-4 mt-2">
            <Text className="text-sm text-gray-600 mb-2">
              <Text className="font-semibold">Antigüedad: </Text>
              {new Date().getFullYear() - tablero.ano_instalacion} años desde instalación
            </Text>
            <Text className="text-sm text-gray-600">
              <Text className="font-semibold">ID: </Text>
              {tablero.id}
            </Text>
          </View>
        </View>

        {/* Botones de acción */}
        <View className="flex-row gap-3 mt-6">
          <TouchableOpacity
            className="flex-1 bg-blue-600 py-4 rounded-xl flex-row items-center justify-center"
            onPress={() => router.push(`/editar-tablero/${tablero.id}`)}
          >
            <Ionicons name="create-outline" size={20} color="white" />
            <Text className="text-white font-semibold text-base ml-2">
              Editar
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-gray-200 py-4 px-6 rounded-xl"
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}
