import { Stack } from "expo-router";
import { useEffect, useContext, createContext, useState } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export type userInfo = {
  mail: string;
  password: string;
  id?: number;
  nombre?: string;
  apellido?: string;
  telefono?: number;
  edad?: number;
  DNI?: number;
};

export const ContextoPerfil = createContext<{
  userContext: userInfo;
  setUserContext: React.Dispatch<React.SetStateAction<userInfo>>;
  API_URL: string;
} | null>(null);

export default function RootLayout() {
  const [userContext, setUserContext] = useState<userInfo>({ 
    mail: "", 
    password: "" 
  });

  // Update this with your actual machine IP
  const API_URL = "http://192.168.1.13:4000";

  return (
    <ContextoPerfil.Provider value={{ userContext, setUserContext, API_URL }}>
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
