import { Stack } from "expo-router";
import { useEffect, useContext, createContext, useState, ReactNode } from "react";
import { ThemeProvider } from '@react-navigation/native';
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode"
import * as SystemUI from 'expo-system-ui';
import useTheme from "../hooks/useTheme";
import { StatusBar } from "expo-status-bar";

type userInfo = {
  id: Number
} | null

type AuthContextType = {
  user: userInfo;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<userInfo>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (newToken: string | null) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider() { /////////////////////////////////// el nuevo Root Layout
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userInfo>(null);
  const { theme, themeValue } = useTheme()

  useEffect(() => {
    const cargarToken = async () => {
      const storedToken = await SecureStore.getItemAsync("jwt");
      if (storedToken) {
        try {
          const decoded: any = jwtDecode(storedToken);
          if (decoded.exp * 1000 > Date.now()) { // si no expiró
            setToken(storedToken);
            setUser({ id: decoded.id });
          } else {
            await SecureStore.deleteItemAsync("jwt");
          }
        } catch (e) {
          await SecureStore.deleteItemAsync("jwt");
        }
      }
    };
    cargarToken();
    SystemUI.setBackgroundColorAsync(theme.header)

  }, []);

  const login = async (newToken: string | null) => {
    if (!newToken) return
    const decoded: any = jwtDecode(newToken);
    setToken(newToken);
    setUser({ id: decoded.id });
    await SecureStore.setItemAsync("jwt", newToken);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("jwt");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
      <Stack>

        <Stack.Screen name="index" options={{ headerShown: false, }} />

        <Stack.Screen name="registro_screen" options={{ headerShown: false }} />
        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(modals)" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="light" />
    </AuthContext.Provider>
  );
}


