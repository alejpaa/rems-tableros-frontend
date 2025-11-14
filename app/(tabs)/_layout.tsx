import { HapticTab } from '@/components/haptic-tab';
import { AddIcon, BoardIcon, HomeIcon } from '@/components/icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { appColors } from '@/theme/colors';

export default function TabLayout() {
  const palette = appColors;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.primary.DEFAULT,
        tabBarInactiveTintColor: palette.text.muted,
        tabBarStyle: {
          backgroundColor: palette.background.card,
          borderTopColor: palette.border.light,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
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
