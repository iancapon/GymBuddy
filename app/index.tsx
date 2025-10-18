import { Text, View, ScrollView, StyleSheet, TextInput, ImageBackground, ActivityIndicator, Alert } from "react-native";
import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import Boton from "../components/Boton";
import { StatusBar } from "expo-status-bar";
import { ContextoPerfil, userInfo } from "./_layout";

const API_URL = "http://192.168.1.13:4000";

export default function LoginScreen() {
  const router = useRouter();
  const contexto = useContext(ContextoPerfil);

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
      console.log('Attempting login with:', { email, url: API_URL });
      
      const response = await fetch(`${API_URL}/session/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', { status: response.status, data });

      if (data.ok && data.data) {
        // Your backend returns: { ok: true, data: existingUser }
        const userData: userInfo = {
          mail: data.data.email,
          password: password,
          id: data.data.id,
          nombre: data.data.nombre,
          apellido: data.data.apellido,
          telefono: data.data.telefono,
          edad: data.data.edad,
          DNI: data.data.DNI,
        };

        contexto?.setUserContext(userData);

        router.push("./(tabs)/index_tab");
        Alert.alert(
          "Inicio de sesión",
          "Has iniciado sesión correctamente 👽",
          [
            {
              text: "OK",
            },
          ]
        );
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

      <View style={styles.gradientOverlay} />

      <View style={{ flex: 1 }}>
        <Text style={styles.bigtitle}>Gym Buddy</Text>
      </View>

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

      <View style={[styles.buttonContainer, { flex: 1 }]}>
        <Boton
          name="Registrarme"
          onPress={() => router.push("./(modals)/registro_screen")}
          viewStyle={styles.boton}
          textStyle={styles.botonText}
        />
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bigtitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    margin: 16,
    padding: 24,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: "#fff",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonContainer: {
    marginVertical: 8,
  },
  boton: {
    backgroundColor: "#FF7A00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});