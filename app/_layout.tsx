import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appColors } from '@/theme/colors';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: appColors.primary.DEFAULT,
      background: appColors.background.DEFAULT,
      card: appColors.background.card,
      text: appColors.text.DEFAULT,
      border: appColors.border.DEFAULT,
      notification: appColors.danger,
    },
  };
  const statusBarStyle: 'light' | 'dark' = 'dark';

  return (
    <SafeAreaProvider>
      <ThemeProvider value={navTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={statusBarStyle} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
