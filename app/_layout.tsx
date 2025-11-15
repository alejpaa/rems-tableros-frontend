import { appColors } from '@/theme/colors';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

// React Query client
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={navTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="editar-tablero/[id]" options={{headerTitle: ''}} />
          <Stack.Screen name="detalle-tablero/[id]" options={ {headerShown: false}}/>
        </Stack>
        <StatusBar style={statusBarStyle} />
      </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
