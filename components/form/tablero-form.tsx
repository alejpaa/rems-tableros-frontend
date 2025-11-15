import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { INITIAL_VALUES, TableroFormSubmitPayload } from "./types";
import { TableroSchema } from "./validation";

// Re-export para que otros archivos puedan importarlo
export type { TableroFormSubmitPayload } from "./types";

const ESTADO_OPTIONS = [
    { label: "Operativo", value: "Operativo" },
    { label: "Mantenimiento", value: "Mantenimiento" },
    { label: "Fuera de Servicio", value: "Fuera de Servicio" },
];

const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 1980;
const YEARS = Array.from(
    { length: CURRENT_YEAR - START_YEAR + 1 },
    (_, i) => String(CURRENT_YEAR - i)
);

interface TableroFormProps {
    onSubmit: (values: TableroFormSubmitPayload) => void | Promise<void>;
    initialValues?: Partial<TableroFormSubmitPayload>;
    title?: string;
    submitLabel?: string;
    loading?: boolean;
    error?: string | null;
}

export const TableroForm = ({ 
    onSubmit, 
    initialValues = {},
    title,
    submitLabel = "Guardar",
    loading = false,
    error
}: TableroFormProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <Formik
                initialValues={{ ...INITIAL_VALUES, ...initialValues }}
                validationSchema={TableroSchema}
                onSubmit={(values) => {
                    const parsed: TableroFormSubmitPayload = {
                        ...values,
                        capacidad_amperios: Number(values.capacidad_amperios),
                        ano_fabricacion: Number(values.ano_fabricacion),
                        ano_instalacion: Number(values.ano_instalacion),
                    };
                    onSubmit(parsed);
                }}
            >
                {({
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                      values,
                      errors,
                      touched,
                  }) => (
                    <ScrollView 
                        className="flex-1" 
                        contentContainerStyle={{ paddingBottom: 100 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Título */}
                        {title && (
                            <View className="mb-6">
                                <Text className="text-3xl font-bold text-gray-900 mb-2">{title}</Text>
                                <Text className="text-sm text-gray-500">Completa la información del tablero eléctrico</Text>
                            </View>
                        )}

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
                                        value={values.nombre}
                                        onChangeText={handleChange("nombre")}
                                        placeholder="Ej: Tablero Principal"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                                {touched.nombre && errors.nombre && (
                                    <Text className="text-red-500 text-xs mt-1">{errors.nombre}</Text>
                                )}
                            </View>

                            {/* Campo Ubicación */}
                            <View className="mb-4">
                                <Text className="text-sm font-semibold text-gray-700 mb-2">Ubicación *</Text>
                                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
                                    <Ionicons name="location-outline" size={20} color="#6B7280" />
                                    <TextInput
                                        className="flex-1 ml-3 text-gray-900"
                                        value={values.ubicacion}
                                        onChangeText={handleChange("ubicacion")}
                                        placeholder="Ej: Lima, Perú"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                                {touched.ubicacion && errors.ubicacion && (
                                    <Text className="text-red-500 text-xs mt-1">{errors.ubicacion}</Text>
                                )}
                            </View>

                            {/* Campo Marca */}
                            <View className="mb-4">
                                <Text className="text-sm font-semibold text-gray-700 mb-2">Marca</Text>
                                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
                                    <Ionicons name="business-outline" size={20} color="#6B7280" />
                                    <TextInput
                                        className="flex-1 ml-3 text-gray-900"
                                        value={values.marca}
                                        onChangeText={handleChange("marca")}
                                        placeholder="Ej: ABB, Schneider, etc."
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                                {touched.marca && errors.marca && (
                                    <Text className="text-red-500 text-xs mt-1">{errors.marca}</Text>
                                )}
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
                                        value={String(values.capacidad_amperios)}
                                        keyboardType="numeric"
                                        onChangeText={handleChange("capacidad_amperios")}
                                        placeholder="Ej: 150"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                    <Text className="text-gray-500 text-sm">A</Text>
                                </View>
                                {touched.capacidad_amperios && errors.capacidad_amperios && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.capacidad_amperios}
                                    </Text>
                                )}
                            </View>

                            {/* Campo Estado */}
                            <View className="mb-4">
                                <Text className="text-sm font-semibold text-gray-700 mb-2">Estado *</Text>
                                <View className="bg-white border border-gray-300 rounded-xl shadow-sm flex-row items-center px-4">
                                    <Ionicons name="pulse-outline" size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                    <View className="flex-1">
                                        <Picker
                                            style={{ height: 50 }}
                                            selectedValue={values.estado}
                                            onValueChange={(v) => setFieldValue("estado", v)}
                                        >
                                            {ESTADO_OPTIONS.map((o) => (
                                                <Picker.Item key={o.value} label={o.label} value={o.value} />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>
                                {touched.estado && errors.estado && (
                                    <Text className="text-red-500 text-xs mt-1">{errors.estado}</Text>
                                )}
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
                                <View className="bg-white border border-gray-300 rounded-xl shadow-sm flex-row items-center px-4">
                                    <Ionicons name="construct-outline" size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                    <View className="flex-1">
                                        <Picker
                                            style={{ height: 50 }}
                                            selectedValue={values.ano_fabricacion}
                                            onValueChange={(v) => setFieldValue("ano_fabricacion", v)}
                                        >
                                            {YEARS.map((y) => (
                                                <Picker.Item key={y} label={y} value={y} />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>
                                {touched.ano_fabricacion && errors.ano_fabricacion && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.ano_fabricacion}
                                    </Text>
                                )}
                            </View>

                            {/* Campo Año de Instalación */}
                            <View className="mb-4">
                                <Text className="text-sm font-semibold text-gray-700 mb-2">Año de Instalación *</Text>
                                <View className="bg-white border border-gray-300 rounded-xl shadow-sm flex-row items-center px-4">
                                    <Ionicons name="calendar-outline" size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                    <View className="flex-1">
                                        <Picker
                                            style={{ height: 50 }}
                                            selectedValue={values.ano_instalacion}
                                            onValueChange={(v) => setFieldValue("ano_instalacion", v)}
                                        >
                                            {YEARS.map((y) => (
                                                <Picker.Item key={y} label={y} value={y} />
                                            ))}
                                        </Picker>
                                    </View>
                                </View>
                                {touched.ano_instalacion && errors.ano_instalacion && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.ano_instalacion}
                                    </Text>
                                )}
                            </View>

                        </View>

                        {/* Botón de Submit */}
                        <TouchableOpacity
                            className={`rounded-xl py-4 flex-row items-center justify-center shadow-lg ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
                            onPress={() => handleSubmit()}
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

                        {/* Error */}
                        {error && (
                            <View className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4 flex-row">
                                <Ionicons name="alert-circle-outline" size={20} color="#DC2626" style={{ marginTop: 2 }} />
                                <Text className="flex-1 ml-3 text-sm text-red-700">{error}</Text>
                            </View>
                        )}

                        {/* Nota de campos requeridos */}
                        <Text className="text-center text-gray-500 text-xs mt-6">
                            * Campos requeridos
                        </Text>
                    </ScrollView>
                )}
            </Formik>
        </KeyboardAvoidingView>
    );
};

export default TableroForm;
