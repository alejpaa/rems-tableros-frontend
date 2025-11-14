import type { PropsWithChildren } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View, type TouchableOpacityProps } from 'react-native';

export type Board = {
  id: string;
  name: string;
  location: string;
  description?: string;
};

type BoardCardProps = {
  board: Board;
  onEdit: () => void;
  onDelete: () => void;
};

type ActionButtonProps = TouchableOpacityProps & { className?: string };

const ActionButton = ({ children, className = '', ...props }: PropsWithChildren<ActionButtonProps>) => (
  <TouchableOpacity className={`flex-1 rounded-lg py-2 px-4 ${className}`} {...props}>
    <Text className="text-center text-sm font-medium text-white">{children}</Text>
  </TouchableOpacity>
);

export const BoardCard = ({ board, onEdit, onDelete }: BoardCardProps) => {
  return (
    <View className="rounded-xl bg-background-card p-5 shadow-md">
      <View className="gap-1">
        <Text className="text-lg font-bold text-text-title">{board.name}</Text>
        <Text className="text-sm text-text-muted">{board.location}</Text>
        {board.description ? (
          <Text className="text-sm leading-5 text-text-body">{board.description}</Text>
        ) : null}
      </View>

        {/* Seccion Botones */}
      <View className="mt-4 flex-row gap-3">
        <ActionButton className="bg-blue-600" onPress={onEdit}>
          Editar
        </ActionButton>
        <ActionButton className="bg-danger" onPress={onDelete}>
          Eliminar
        </ActionButton>
      </View>
    </View>
  );
};