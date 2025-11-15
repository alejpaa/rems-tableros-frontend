import type { Tablero } from '@/types/tablero';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

const ESTADO_OPTIONS = ['Operativo', 'Mantenimiento', 'Fuera de Servicio'];
// Genera una lista de años (ej: 2025, 2024, ..., 1980)
const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 1980;
const YEARS = Array.from(
  { length: CURRENT_YEAR - START_YEAR + 1 },
  (_, i) => String(CURRENT_YEAR - i)
);


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
    if (key === 'estado') {
      base[key] = ESTADO_OPTIONS.includes(String(value))
        ? String(value)
        : 'Operativo';
    } else {
      base[key] = String(value);
    }
  });

  return base;
};

const parseNumberField = (value: string) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const REQUIRED_MESSAGE = 'Nombre y ubicación son obligatorios';
const NUMBER_MESSAGE = 'Verifica que capacidad y años sean números válidos';
// NUEVO: Mensaje de validación para los años
const YEAR_VALIDATION_MESSAGE = 'El año de instalación no puede ser anterior al de fabricación.';

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

    // Comprueba que el año de instalación no sea anterior al de fabricación
    if (instalacion < fabricacion) {
      Alert.alert('Error', YEAR_VALIDATION_MESSAGE);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <ScrollView 
    className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}
    keyboardShouldPersistTaps="handled"
    >
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
      <View className="border border-border rounded-lg mb-4 overflow-hidden">
          <Picker
          className={Platform.OS === 'ios' ? 'h-12' : 'm-[-110]'}
            selectedValue={form.estado}
            onValueChange={itemValue => update('estado', itemValue)}>
            {ESTADO_OPTIONS.map(opt => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
      </View>

      <Text className="font-medium">Año de fabricación</Text>
      <View className="border border-border rounded-lg mb-4 overflow-hidden">
          <Picker
            selectedValue={form.ano_fabricacion}
            onValueChange={itemValue => update('ano_fabricacion', itemValue)}>
            {YEARS.map(year => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
      </View>

      <Text className="font-medium">Año de instalación</Text>
      <View className="border border-border rounded-lg mb-4 overflow-hidden">
          <Picker
            selectedValue={form.ano_instalacion}
            onValueChange={itemValue => update('ano_instalacion', itemValue)}>
            {YEARS.map(year => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
      </View>

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
  </KeyboardAvoidingView>
    
  );
};

export default TableroForm;
