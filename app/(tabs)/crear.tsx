// app/(tabs)/crear.tsx

import { Screen } from '@/components/Screen';
import { useCreateBoard } from '@/hooks/useCrearTableros';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

export default function CrearTablero() {
  const router = useRouter();
  const { submit, loading, error } = useCreateBoard();

  // --- Estados del formulario ---
  const [form, setForm] = useState({
    nombre: '',
    ubicacion: '',
    marca: '',
    capacidad_amperios: '',
    estado: 'Operativo',
    ano_fabricacion: '',
    ano_instalacion: '',
  });

  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.nombre.trim() || !form.ubicacion.trim()) {
      Alert.alert('Error', 'Nombre y ubicación son obligatorios');
      return;
    }

    try {
      const parsedData = {
        ...form,
        capacidad_amperios: parseFloat(form.capacidad_amperios),
        ano_fabricacion: parseInt(form.ano_fabricacion),
        ano_instalacion: parseInt(form.ano_instalacion),
      };

      await submit(parsedData);

      Alert.alert('Éxito', 'Tablero creado correctamente');

      // Navegar de vuelta a la lista y recargarla
      router.push('/(tabs)/tableros');

    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="text-3xl font-bold text-text-title mb-6">Crear Tablero</Text>

        {/* Campo: Nombre */}
        <Text className="font-medium">Nombre</Text>
        <TextInput
          className="border p-3 rounded-lg mb-4"
          value={form.nombre}
          onChangeText={v => update('nombre', v)}
          placeholder="Ej: Tablero Principal"
        />

        {/* Campo: Ubicación */}
        <Text className="font-medium">Ubicación</Text>
        <TextInput
          className="border p-3 rounded-lg mb-4"
          value={form.ubicacion}
          onChangeText={v => update('ubicacion', v)}
          placeholder="Ej: Lima, Perú"
        />

        {/* Campo: Marca */}
        <Text className="font-medium">Marca</Text>
        <TextInput
          className="border p-3 rounded-lg mb-4"
          value={form.marca}
          onChangeText={v => update('marca', v)}
          placeholder="Ej: ABB, Schneider, etc."
        />

        {/* Campo: Capacidad */}
        <Text className="font-medium">Capacidad (Amperios)</Text>
        <TextInput
          className="border p-3 rounded-lg mb-4"
          keyboardType="numeric"
          value={form.capacidad_amperios}
          onChangeText={v => update('capacidad_amperios', v)}
          placeholder="Ej: 150"
        />

        {/* Campo: Estado */}
        <Text className="font-medium">Estado</Text>
        <TextInput
          className="border p-3 rounded-lg mb-4"
          value={form.estado}
          onChangeText={v => update('estado', v)}
          placeholder="Operativo / En mantenimiento"
        />

        {/* Campo: Año Fabricación */}
        <Text className="font-medium">Año de fabricación</Text>
        <TextInput
          className="border p-3 rounded-lg mb-4"
          keyboardType="numeric"
          value={form.ano_fabricacion}
          onChangeText={v => update('ano_fabricacion', v)}
          placeholder="Ej: 2020"
        />

        {/* Campo: Año Instalación */}
        <Text className="font-medium">Año de instalación</Text>
        <TextInput
          className="border p-3 rounded-lg mb-4"
          keyboardType="numeric"
          value={form.ano_instalacion}
          onChangeText={v => update('ano_instalacion', v)}
          placeholder="Ej: 2021"
        />
         <TouchableOpacity
          className="bg-blue-600 py-3 rounded-lg mt-6"
          onPress={handleSave}
          disabled={loading}
        >
          <Text className="text-center text-white font-medium text-lg">
            {loading ? 'Guardando...' : 'Guardar'}
          </Text>
        </TouchableOpacity>

        {error && (
          <Text className="text-danger mt-4 text-center">{error}</Text>
        )}
      </ScrollView>
    </Screen>
  );
}
