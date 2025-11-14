// app/(tabs)/crear.tsx

import { Screen } from '@/components/Screen';
import {
  TableroForm,
  type TableroFormSubmitPayload,
} from '@/components/tablero-form';
import { useCreateBoard } from '@/hooks/useCrearTableros';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export default function CrearTablero() {
  const router = useRouter();
  const { submit, loading, error } = useCreateBoard();

  const handleSave = async (values: TableroFormSubmitPayload) => {
    try {
      await submit(values);
      Alert.alert('Éxito', 'Tablero creado correctamente');
      router.push('/(tabs)/tableros');
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'No se pudo crear el tablero');
    }
  };

  return (
    <Screen>
      <TableroForm
        title="Crear Tablero"
        submitLabel="Guardar"
        loading={loading}
        error={error}
        onSubmit={handleSave}
      />
    </Screen>
  );
}
