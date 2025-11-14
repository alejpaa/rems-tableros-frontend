import { getTablero } from '@/api/tableros.service';
import { Screen } from '@/components/Screen';
import {
    TableroForm,
    type TableroFormSubmitPayload,
} from '@/components/tablero-form';
import { useTableros } from '@/hooks/useTableros';
import type { Tablero } from '@/types/tablero';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';

export default function EditarTableroScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const tableroId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { updateBoard, updating } = useTableros();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const tableroQuery = useQuery<Tablero, Error>({
    queryKey: ['tableros', tableroId],
    queryFn: () => getTablero(tableroId!),
    enabled: Boolean(tableroId),
  });

  const handleSubmit = async (values: TableroFormSubmitPayload) => {
    if (!tableroId) {
      Alert.alert('Error', 'No se encontró el identificador del tablero');
      return;
    }

    try {
      setSubmitError(null);
      await updateBoard(tableroId, values);
      Alert.alert('Éxito', 'Tablero actualizado correctamente');
      router.back();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudo actualizar el tablero';

      setSubmitError(message);
      Alert.alert('Error', message);
    }
  };

  const renderContent = () => {
    if (!tableroId) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-title">Identificador de tablero inválido.</Text>
        </View>
      );
    }

    if (tableroQuery.isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      );
    }

    if (tableroQuery.isError || !tableroQuery.data) {
      return (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-text-title text-center">
            Ocurrió un error al cargar la información del tablero.
          </Text>
        </View>
      );
    }

    const { id: _id, ...initialValues } = tableroQuery.data;

    return (
      <TableroForm
        title="Editar Tablero"
        submitLabel="Actualizar"
        initialValues={initialValues}
        loading={updating}
        error={submitError}
        onSubmit={handleSubmit}
      />
    );
  };

  return <Screen>{renderContent()}</Screen>;
}
