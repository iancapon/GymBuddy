import { Text, View, ScrollView, StyleSheet, TextInput, ImageBackground, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Boton from "../components/Boton";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "./_layout";

import { API_URL } from "../constants/API_URL";

export default function LoginScreen() {
  const router = useRouter();
  const { user, login } = useAuth()

  // Estados para los campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSession = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completá todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresá un email válido");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres con letras y números");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status == 401) {
          Alert.alert("Usuario no encontrado")
        } else {
          let errorMsg = `Error ${response.status}`;
          try {
            const errData = data;
            errorMsg = errData.message || errorMsg;
          } catch { }
          Alert.alert("Error", errorMsg);
        }
        return;
      }

      if (data?.token) {
        await login(data.token); // setea user/token en el contexto
      } else {
        Alert.alert("Error", data.error || "No se pudo iniciar sesión");
      }
    } catch (error: any) {
      console.error("❌ login error:", error?.message);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // limpiar campos
      setEmail("");
      setPassword("");
      setLoading(false);
      // navegar a la Home (ruta real sin el grupo)
      router.replace("/main_screen");
    }
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
        }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      {/* Degradado para contraste del texto */}
      <View style={styles.gradientOverlay} />
      {/* --- titulo --- */}
      <View style={{ flex: 1 }}>
        <Text style={styles.bigtitle}>Gym Buddy</Text>
      </View>
      {/* Tarjeta de login */}
      <View style={[styles.card, { flex: 0.5 }]}>
        <Text style={styles.title}>Bienvenido 👋</Text>
        <Text style={styles.subtitle}>Iniciá sesión para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#FF7A00" />
          ) : (
            <Boton
              name="Iniciar sesión"
              onPress={handleSession}
              viewStyle={styles.boton}
              textStyle={styles.botonText}
            />
          )}
        </View>
      </View>
      {/* espacio entre --- */}
      <View style={[styles.buttonContainer, { flex: 1 }]}>
        <Boton
          name="Registrarme"
          onPress={() => router.push("/registro_screen")}
          viewStyle={styles.boton}
          textStyle={styles.botonText}
        />
      </View>
    </ScrollView>
  );
}

// 🎨 Colores modernos y vivos
const COLORS = {
  overlayGradient: "rgba(0,0,0,0.4)",
  overlayBottom: "rgba(0,0,0,0.8)",
  card: "rgba(255,255,255,0.15)",
  border: "rgba(255,255,255,0.25)",
  text: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.8)",
  accent: "#FF7A00",
  shadow: "rgba(0,0,0,0.45)",
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 60,
  },

  // 🌄 Degradado transparente para resaltar la imagen
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlayGradient
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.6,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  bigtitle: {
    fontSize: 50,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textMuted,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  },
  boton: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  botonText: {
    color: "#111",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
