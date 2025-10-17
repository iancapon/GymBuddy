import { Stack } from "expo-router";
import { useEffect, useContext, createContext, useState } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

type userInfo = {
  mail: string
  password: string
}

export const ContextoPerfil = createContext<{
  userContext: userInfo;
  setUserContext: React.Dispatch<React.SetStateAction<userInfo>>;
} | null>(null);

export default function RootLayout() {
  const [userContext, setUserContext] = useState<userInfo>({ mail: "", password: "" });
  return (
    <ContextoPerfil.Provider value={{ userContext, setUserContext }}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>

          <Stack.Screen name="index" options={{ headerShown: false, navigationBarHidden: true }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="(modals)" options={{ headerShown: false }} />

        </Stack>
      </ThemeProvider>
    </ContextoPerfil.Provider>

  );
}
