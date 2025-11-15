import { Screen } from '@/components/Screen';
import { Ionicons } from '@expo/vector-icons';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import './../global.css';

export default function HomeScreen() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:alejandro.padillaa00@gmail.com');
  };

  return (
    <Screen>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header - Perfil */}
        <View className="bg-blue-600 rounded-2xl p-6 mb-4 shadow-lg">
          <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-white items-center justify-center mb-3">
              <Ionicons name="person" size={40} color="#2563EB" />
            </View>
            <Text className="text-2xl font-bold text-white mb-1 text-center">
              Alejandro Padilla Arellano
            </Text>
            <Text className="text-blue-100 text-sm mb-3">
              Desarrollador Full Stack Móvil
            </Text>
            <TouchableOpacity 
              onPress={handleEmailPress}
              className="bg-white/20 px-3 py-1.5 rounded-full flex-row items-center"
            >
              <Ionicons name="mail" size={14} color="white" />
              <Text className="text-white ml-1.5 text-xs">
                alejandro.padillaa00@gmail.com
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sobre Mí */}
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <View className="flex-row items-center mb-3">
            <Ionicons name="person-circle" size={20} color="#2563EB" />
            <Text className="text-lg font-bold text-gray-900 ml-2">Sobre Mí</Text>
          </View>
          <Text className="text-gray-700 text-sm leading-relaxed">
            Estudiante de Ingeniería de Software, apasionado por la tecnología y el aprendizaje continuo. 
            Me gusta explorar nuevas herramientas, mejorar mis habilidades y crear soluciones que aporten valor. 
            Siempre busco crecer, aprender y dar lo mejor en cada proyecto.
          </Text>
        </View>

        {/* ¿Por qué contratarme? */}
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-md">
          <View className="flex-row items-center mb-3">
            <Ionicons name="star" size={20} color="#16A34A" />
            <Text className="text-lg font-bold text-gray-900 ml-2">¿Por qué contratarme?</Text>
          </View>
          
          <View className="gap-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="flash" size={16} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">Aprendizaje Rápido</Text>
                <Text className="text-xs text-gray-600">Me adapto rápidamente a nuevas tecnologías</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="bulb" size={16} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">Proactivo</Text>
                <Text className="text-xs text-gray-600">Tomo iniciativa y busco mejorar constantemente</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="people" size={16} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">Trabajo en Equipo</Text>
                <Text className="text-xs text-gray-600">Colaboro y comparto conocimientos efectivamente</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="shield-checkmark" size={16} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">Compromiso</Text>
                <Text className="text-xs text-gray-600">Entrego resultados de calidad y doy lo mejor en cada proyecto</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
