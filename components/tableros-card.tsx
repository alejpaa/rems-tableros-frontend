import { Ionicons } from '@expo/vector-icons';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View, type TouchableOpacityProps } from 'react-native';

export type Tablero = {
  id: string;
  nombre: string;
  ubicacion: string;
  marca: string;
  capacidad_amperios: number;
  estado: string;
  ano_fabricacion: number;
  ano_instalacion: number;
};

type BoardCardProps = {
  board: Tablero;
  onEdit: () => void;
  onDelete: () => void;
  onPress?: () => void;
};

type ActionButtonProps = TouchableOpacityProps & { className?: string };

const ActionButton = ({ children, className = '', onPress, ...props }: PropsWithChildren<ActionButtonProps>) => (
  <TouchableOpacity 
    className={`flex-1 rounded-xl py-3 px-4 flex-row items-center justify-center ${className}`}
    onPress={(e) => {
      e?.stopPropagation?.();
      onPress?.(e);
    }}
    {...props}
  >
    {children}
  </TouchableOpacity>
);

export const BoardCard = ({ board, onEdit, onDelete, onPress }: BoardCardProps) => {
  // Función para obtener el estilo del badge de estado
  const getStatusStyle = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'activo':
      case 'operativo':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: 'checkmark-circle' as const };
      case 'inactivo':
      case 'fuera de servicio':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: 'close-circle' as const };
      case 'mantenimiento':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'construct' as const };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'information-circle' as const };
    }
  };

  const statusStyle = getStatusStyle(board.estado);

  return (
    <TouchableOpacity 
      className="rounded-2xl bg-white p-5 shadow-lg border border-gray-100"
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header del Card */}
      <View className="mb-4">
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1 mr-3">
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {board.nombre}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="location" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-600 ml-1">
                {board.ubicacion}
              </Text>
            </View>
          </View>
          
          {/* Badge de estado */}
          <View className={`px-3 py-1.5 rounded-full ${statusStyle.bg} flex-row items-center`}>
            <Ionicons name={statusStyle.icon} size={14} color={statusStyle.text.includes('green') ? '#15803D' : statusStyle.text.includes('red') ? '#DC2626' : statusStyle.text.includes('yellow') ? '#CA8A04' : '#374151'} />
            <Text className={`text-xs font-semibold ${statusStyle.text} ml-1`}>
              {board.estado}
            </Text>
          </View>
        </View>
      </View>

      {/* Información del tablero en grid */}
      <View className="bg-gray-50 rounded-xl p-4 mb-4">
        <View className="flex-row justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Ionicons name="construct-outline" size={16} color="#6B7280" />
              <Text className="text-xs text-gray-500 ml-1 font-medium">Fabricación</Text>
            </View>
            <Text className="text-sm font-semibold text-gray-900">{board.ano_fabricacion}</Text>
          </View>
          
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text className="text-xs text-gray-500 ml-1 font-medium">Instalación</Text>
            </View>
            <Text className="text-sm font-semibold text-gray-900">{board.ano_instalacion}</Text>
          </View>
        </View>
      </View>

      {/* Seccion Botones */}
      <View className="flex-row gap-3">
        <ActionButton className="bg-blue-600" onPress={onEdit}>
          <Ionicons name="create-outline" size={16} color="white" />
          <Text className="text-center text-sm font-semibold text-white ml-1">
            Editar
          </Text>
        </ActionButton>
        <ActionButton className="bg-red-600" onPress={onDelete}>
          <Ionicons name="trash-outline" size={16} color="white" />
          <Text className="text-center text-sm font-semibold text-white ml-1">
            Eliminar
          </Text>
        </ActionButton>
      </View>
    </TouchableOpacity>
  );
};