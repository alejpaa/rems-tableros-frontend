import React from 'react';
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    type TouchableOpacityProps,
} from 'react-native';

type ConfirmDeleteModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

type ButtonProps = TouchableOpacityProps & {
  variant?: 'cancel' | 'danger';
  children: React.ReactNode;
};

const Button = ({ variant = 'cancel', children, ...props }: ButtonProps) => {
  const variantStyles = {
    cancel: 'bg-gray-200',
    danger: 'bg-danger',
  };

  const textVariantStyles = {
    cancel: 'text-text-title',
    danger: 'text-white',
  };

  return (
    <TouchableOpacity
      className={`flex-1 rounded-lg py-3 px-4 ${variantStyles[variant]}`}
      {...props}
    >
      <Text className={`text-center font-semibold ${textVariantStyles[variant]}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const ConfirmDeleteModal = ({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <TouchableOpacity 
        className="flex-1 bg-black/50 items-center justify-center p-6"
        activeOpacity={1}
        onPress={onCancel}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="bg-white rounded-2xl p-6 shadow-lg" style={{ maxWidth: 400 }}>
            {/* Título */}
            <Text className="text-xl font-bold text-gray-900 mb-2">
              {title}
            </Text>

            {/* Mensaje */}
            <Text className="text-base text-gray-600 mb-6">
              {message}
            </Text>

            {/* Botones de acción */}
            <View className="flex-row gap-3">
              <Button variant="cancel" onPress={onCancel}>
                Cancelar
              </Button>
              <Button variant="danger" onPress={onConfirm}>
                Eliminar
              </Button>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
