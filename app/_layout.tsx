import { Stack } from "expo-router";
import { useEffect } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(modals)" options={{ headerShown: false }} />

      </Stack>
    </ThemeProvider>
  );
}
