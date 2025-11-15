import type { Tablero } from '@/types/tablero';
import { Ionicons } from '@expo/vector-icons';
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

const ESTADO_OPTIONS = [
  { label: 'Operativo', value: 'Operativo', icon: 'checkmark-circle' as const, color: '#16A34A' },
  { label: 'Mantenimiento', value: 'Mantenimiento', icon: 'construct' as const, color: '#CA8A04' },
  { label: 'Fuera de Servicio', value: 'Fuera de Servicio', icon: 'close-circle' as const, color: '#DC2626' },
];

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
      base[key] = ESTADO_OPTIONS.some(opt => opt.value === String(value))
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

const REQUIRED_MESSAGE = 'Todos los campos son obligatorios excepto la marca';
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
    // Validar campos requeridos (todos excepto marca)
    if (!form.nombre.trim() || !form.ubicacion.trim() || !form.capacidad_amperios.trim() || 
        !form.estado.trim() || !form.ano_fabricacion.trim() || !form.ano_instalacion.trim()) {
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
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">{title}</Text>
          <Text className="text-sm text-gray-500">Completa la información del tablero eléctrico</Text>
        </View>
      ) : null}

      {/* Sección: Información Básica */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Ionicons name="information-circle" size={20} color="#2563EB" />
          <Text className="text-lg font-bold text-gray-900 ml-2">Información Básica</Text>
        </View>

        {/* Campo Nombre */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Nombre *</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
            <Ionicons name="document-text-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900"
              value={form.nombre}
              onChangeText={value => update('nombre', value)}
              placeholder="Ej: Tablero Principal"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Campo Ubicación */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Ubicación *</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900"
              value={form.ubicacion}
              onChangeText={value => update('ubicacion', value)}
              placeholder="Ej: Lima, Perú"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Campo Marca */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Marca</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
            <Ionicons name="business-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900"
              value={form.marca}
              onChangeText={value => update('marca', value)}
              placeholder="Ej: ABB, Schneider, etc."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </View>

      {/* Sección: Especificaciones Técnicas */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Ionicons name="flash" size={20} color="#2563EB" />
          <Text className="text-lg font-bold text-gray-900 ml-2">Especificaciones Técnicas</Text>
        </View>

        {/* Campo Capacidad */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Capacidad (Amperios) *</Text>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
            <Ionicons name="flash-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900"
              keyboardType="numeric"
              value={form.capacidad_amperios}
              onChangeText={value => update('capacidad_amperios', value)}
              placeholder="Ej: 150"
              placeholderTextColor="#9CA3AF"
            />
            <Text className="text-gray-500 text-sm">A</Text>
          </View>
        </View>

        {/* Campo Estado */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Estado *</Text>
          <View className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm flex-row items-center px-4">
            <Ionicons name="pulse-outline" size={20} color="#6B7280" style={{ marginRight: 12 }} />
            <View className="flex-1">
              <Picker
                style={{ height: 50 }}
                selectedValue={form.estado}
                onValueChange={itemValue => update('estado', itemValue)}
              >
                {ESTADO_OPTIONS.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </View>

      {/* Sección: Fechas */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
          <Ionicons name="calendar" size={20} color="#2563EB" />
          <Text className="text-lg font-bold text-gray-900 ml-2">Fechas</Text>
        </View>

        {/* Campo Año de Fabricación */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Año de Fabricación *</Text>
          <View className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm flex-row items-center px-4">
            <Ionicons name="construct-outline" size={20} color="#6B7280" style={{ marginRight: 12 }} />
            <View className="flex-1">
              <Picker
                style={{ height: 50 }}
                selectedValue={form.ano_fabricacion}
                onValueChange={itemValue => update('ano_fabricacion', itemValue)}
              >
                {YEARS.map(year => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Campo Año de Instalación */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Año de Instalación *</Text>
          <View className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm flex-row items-center px-4">
            <Ionicons name="calendar-outline" size={20} color="#6B7280" style={{ marginRight: 12 }} />
            <View className="flex-1">
              <Picker
                style={{ height: 50 }}
                selectedValue={form.ano_instalacion}
                onValueChange={itemValue => update('ano_instalacion', itemValue)}
              >
                {YEARS.map(year => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Nota informativa */}
        <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex-row">
          <Ionicons name="information-circle-outline" size={20} color="#2563EB" style={{ marginTop: 2 }} />
          <Text className="flex-1 ml-3 text-sm text-blue-700">
            El año de instalación debe ser igual o posterior al año de fabricación.
          </Text>
        </View>
      </View>

      {/* Botón de Submit */}
      <TouchableOpacity
        className={`rounded-xl py-4 flex-row items-center justify-center shadow-lg ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <>
            <Ionicons name="hourglass-outline" size={20} color="white" />
            <Text className="text-center text-white font-bold text-lg ml-2">
              Guardando...
            </Text>
          </>
        ) : (
          <>
            <Ionicons name="checkmark-circle-outline" size={20} color="white" />
            <Text className="text-center text-white font-bold text-lg ml-2">
              {submitLabel}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {error ? (
        <View className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4 flex-row">
          <Ionicons name="alert-circle-outline" size={20} color="#DC2626" style={{ marginTop: 2 }} />
          <Text className="flex-1 ml-3 text-sm text-red-700">{error}</Text>
        </View>
      ) : null}

      {/* Nota de campos requeridos */}
      <Text className="text-center text-gray-500 text-xs mt-6">
        * Campos requeridos
      </Text>
    </ScrollView>
  </KeyboardAvoidingView>
    
  );
};

export default TableroForm;
