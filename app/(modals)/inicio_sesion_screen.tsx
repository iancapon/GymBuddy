import { Text, View, ScrollView, StyleSheet, TextInput, ImageBackground, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Boton from "../../components/Boton";
import { StatusBar } from "expo-status-bar";

// ⚙️ Conexión al backend (NO TOCAR)
const API_URL = "http://172.29.128.171:4000/session";

export default function LoginScreen() {
  const router = useRouter();

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

      if (response.ok) {
        Alert.alert("✅ Inicio de sesión", "Has iniciado sesión correctamente 👽", [
          { text: "OK", onPress: () => router.replace("../(tabs)/index_tab") },
        ]);
      } else {
        Alert.alert("Error", data.error || "No se pudo iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor. Verificá que esté activo.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Tarjeta de login */}
      <View style={styles.card}>
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

      <StatusBar style="light" />
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
