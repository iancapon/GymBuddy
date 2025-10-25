import { Stack } from "expo-router";
import { useEffect, useContext, createContext, useState } from "react";
import { ThemeProvider } from '@react-navigation/native';

type userInfo = {
  id: Number
}

export const ContextoPerfil = createContext<{
  userContext: userInfo;
  setUserContext: React.Dispatch<React.SetStateAction<userInfo>>;
} | null>(null);

type customTheme = {
  theme: 'light' | 'dark'
  // theme: 'image' | 'dark' | 'light'
}

export const ContextoTema = createContext<{
  themeContext: customTheme
  setThemeContext: React.Dispatch<React.SetStateAction<customTheme>>;
} | null>(null)

export default function RootLayout() {
  const [userContext, setUserContext] = useState<userInfo>({ id: 0 });
  const [themeContext, setThemeContext] = useState<customTheme>({ theme: "light" })

  return (
    <ContextoTema.Provider value={{ themeContext, setThemeContext }}>
      <ContextoPerfil.Provider value={{ userContext, setUserContext }}>

        <Stack>

          <Stack.Screen name="index" options={{ headerShown: false, navigationBarHidden: true, }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="(modals)" options={{ headerShown: false }} />

        </Stack>

      </ContextoPerfil.Provider>
    </ContextoTema.Provider>

  );
}
