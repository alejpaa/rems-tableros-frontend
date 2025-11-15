import { HapticTab } from '@/components/haptic-tab';
import { AddIcon, BoardIcon, HomeIcon } from '@/components/icons';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
// 1. IMPORTA EL HOOK
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appColors } from '@/theme/colors';

export default function TabLayout() {
  const palette = appColors;
  // 2. OBTÉN EL INSET INFERIOR
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      tabBar={(props) => (
        <View style={{
            position: 'absolute',
            // 3. APLICA EL INSET + TU MARGEN
            // Si no hay barra de navegación (ej. iOS con gestos), bottom será 0.
            // Si hay barra (ej. Android), bottom será su altura.
            bottom: bottom === 0 ? 24 : bottom, 
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              maxWidth: 300,
              borderRadius: 32,
              backgroundColor: palette.background.card,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={{ borderRadius: 32, overflow: 'hidden' }}>
              <BottomTabBar
                {...props}
                style={{
                  backgroundColor: 'transparent',
                  height: 64,
                  borderTopWidth: 0,
                  elevation: 0,
                  //paddingBottom: 8,
                  //paddingTop: 8,
                }}
              />
            </View>
          </View>
        </View>
      )}
      screenOptions={{
        tabBarActiveTintColor: palette.primary.DEFAULT,
        tabBarInactiveTintColor: palette.text.muted,
        tabBarItemStyle: {
          justifyContent: 'center', // Centra verticalmente
          alignItems: 'center',    // Centra horizontalmente
          height: 64, // Asegúrate de que use toda la altura
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -2 //cambie
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tableros"
        options={{
          title: 'Tableros',
          tabBarIcon: ({ color, size }) => <BoardIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="crear"
        options={{
          title: 'Crear',
          tabBarIcon: ({ color, size }) => <AddIcon color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}