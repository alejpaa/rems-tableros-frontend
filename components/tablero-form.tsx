import { useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

import type { Tablero } from '@/types/tablero';

export type TableroFormSubmitPayload = Omit<Tablero, 'id'>;

const INITIAL_FORM_STATE: Record<keyof TableroFormSubmitPayload, string> = {
  nombre: '',
  ubicacion: '',
  marca: '',
  capacidad_amperios: '',
  estado: 'Operativo',
  ano_fabricacion: '',
  ano_instalacion: '',
};

export type TableroFormProps = {
  title?: string;
  submitLabel?: string;
  loading?: boolean;
  error?: string | null;
  initialValues?: Partial<TableroFormSubmitPayload>;
  onSubmit: (data: TableroFormSubmitPayload) => Promise<void> | void;
};

type InternalFormState = typeof INITIAL_FORM_STATE;

const sanitizeInitialValues = (
  initialValues?: Partial<TableroFormSubmitPayload>
): InternalFormState => {
  const base = { ...INITIAL_FORM_STATE };

  if (!initialValues) {
    return base;
  }

  const entries = Object.entries(initialValues) as [
    keyof TableroFormSubmitPayload,
    string | number,
  ][];

  entries.forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    base[key] = String(value);
  });

  return base;
};

const parseNumberField = (value: string) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const REQUIRED_MESSAGE = 'Nombre y ubicación son obligatorios';
const NUMBER_MESSAGE = 'Verifica que capacidad y años sean números válidos';

export const TableroForm = ({
  title,
  submitLabel = 'Guardar',
  loading,
  error,
  initialValues,
  onSubmit,
}: TableroFormProps) => {
  const resolvedInitialValues = useMemo(
    () => sanitizeInitialValues(initialValues),
    [initialValues]
  );
  const [form, setForm] = useState<InternalFormState>(resolvedInitialValues);

  useEffect(() => {
    setForm(resolvedInitialValues);
  }, [resolvedInitialValues]);

  const update = (key: keyof InternalFormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.nombre.trim() || !form.ubicacion.trim()) {
      Alert.alert('Error', REQUIRED_MESSAGE);
      return;
    }

    const capacidad = parseNumberField(form.capacidad_amperios);
    const fabricacion = parseNumberField(form.ano_fabricacion);
    const instalacion = parseNumberField(form.ano_instalacion);

    if (capacidad === null || fabricacion === null || instalacion === null) {
      Alert.alert('Error', NUMBER_MESSAGE);
      return;
    }

    await onSubmit({
      nombre: form.nombre.trim(),
      ubicacion: form.ubicacion.trim(),
      marca: form.marca.trim(),
      estado: form.estado.trim(),
      capacidad_amperios: capacidad,
      ano_fabricacion: fabricacion,
      ano_instalacion: instalacion,
    });
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
      {title ? (
        <Text className="text-3xl font-bold text-text-title mb-6">{title}</Text>
      ) : null}

      <Text className="font-medium">Nombre</Text>
      <TextInput
        className="border border-border p-3 rounded-lg mb-4"
        value={form.nombre}
        onChangeText={value => update('nombre', value)}
        placeholder="Ej: Tablero Principal"
      />

      <Text className="font-medium">Ubicación</Text>
      <TextInput
        className="border border-border p-3 rounded-lg mb-4"
        value={form.ubicacion}
        onChangeText={value => update('ubicacion', value)}
        placeholder="Ej: Lima, Perú"
      />

      <Text className="font-medium">Marca</Text>
      <TextInput
        className="border border-border p-3 rounded-lg mb-4"
        value={form.marca}
        onChangeText={value => update('marca', value)}
        placeholder="Ej: ABB, Schneider, etc."
      />

      <Text className="font-medium">Capacidad (Amperios)</Text>
      <TextInput
        className="border border-border p-3 rounded-lg mb-4"
        keyboardType="numeric"
        value={form.capacidad_amperios}
        onChangeText={value => update('capacidad_amperios', value)}
        placeholder="Ej: 150"
      />

      <Text className="font-medium">Estado</Text>
      <TextInput
        className="border border-border p-3 rounded-lg mb-4"
        value={form.estado}
        onChangeText={value => update('estado', value)}
        placeholder="Operativo / En mantenimiento"
      />

      <Text className="font-medium">Año de fabricación</Text>
      <TextInput
        className="border border-border p-3 rounded-lg mb-4"
        keyboardType="numeric"
        value={form.ano_fabricacion}
        onChangeText={value => update('ano_fabricacion', value)}
        placeholder="Ej: 2020"
      />

      <Text className="font-medium">Año de instalación</Text>
      <TextInput
        className="border border-border p-3 rounded-lg mb-4"
        keyboardType="numeric"
        value={form.ano_instalacion}
        onChangeText={value => update('ano_instalacion', value)}
        placeholder="Ej: 2021"
      />

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-lg mt-6"
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text className="text-center text-white font-medium text-lg">
          {loading ? 'Guardando...' : submitLabel}
        </Text>
      </TouchableOpacity>

      {error ? (
        <Text className="text-danger mt-4 text-center">{error}</Text>
      ) : null}
    </ScrollView>
  );
};

export default TableroForm;
