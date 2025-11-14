import React from 'react';
import { Text, View } from 'react-native';


// 1. Definición de la interfaz (Typescript) para las props del componente
interface ProfileCardProps {
  name: string;
  email: string;
  description: string;
}

// Placeholder para el ícono del avatar.
const ProfileIconPlaceholder: React.FC = () => (
  // Clase para el ícono: bg-blue-100, círculo, centrado.
  <View className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white">
    {/* Este es un placeholder simple (puedes usar un SVG, Image o Icon real aquí) */}
    <Text className="text-blue-500 text-6xl">👤</Text> 
  </View>
);

// 2. Definición del componente ProfileCard usando la interfaz
export const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, description }) => {
  return (
    // Contenedor principal de la tarjeta: fondo blanco, esquinas redondeadas, sombra.
    <View className="bg-white rounded-3xl p-6 w-80 max-w-full shadow-lg items-center m-4">
      
      {/* Contenedor para posicionar el avatar en la parte superior central */}
      <View className="absolute top-[-48px] items-center">
        <ProfileIconPlaceholder />
      </View>

      {/* Margen superior para compensar el espacio del avatar flotante */}
      <View className="mt-[72px] items-center"> 
        
        {/* Nombre del Candidato */}
        <Text className="text-xl font-bold text-gray-800 mt-2 mb-1">
          {name}
        </Text>
        
        {/* Email */}
        <Text className="text-sm text-blue-600 mb-4">
          {email}
        </Text>
        
        {/* Descripción Profesional */}
        <Text className="text-center text-gray-600 leading-snug">
          {description}
        </Text>
      </View>
    </View>
  );
};