import { Text, View, ScrollView, StyleSheet, TextInput, ImageBackground, ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Boton from "../../components/Boton";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import workoutsBase from "../workoutsBase";
import { useAuth } from "../_layout";

import api_url from "../API_URL"
const API_URL = api_url()


export default function RegistroScreen() {
  const { user, token, setUser, setToken, login, logout } = useAuth()
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !apellido || !dni || !email || !password || !telefono || !edad) {
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
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres, con letras y números");
      return;
    }

    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
      Alert.alert("Error", "Por favor ingresá una edad válida");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, dni, email, password, telefono, edad: edadNum }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token)
        handleGuardarRutinas(data.token)
        Alert.alert("✅ Registro exitoso", "Tu cuenta fue creada correctamente", [
          { text: "OK", onPress: () => router.back() },
        ]);
        setNombre("");
        setApellido("");
        setDni("");
        setEmail("");
        setPassword("");
        setTelefono("");
        setEdad("");
      } else {
        Alert.alert("Error", data.error || "No se pudo completar el registro");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardarRutinas = (token: string | null) => {
    const nuevaRutina = async (rutina: any) => {
      try {
        // 1. Create routine
        const routineResponse = await fetch(`${API_URL}/workout/routine`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: rutina.nombre,
          }),
        });

        const routineData = await routineResponse.json();

        if (!routineData.success) {
          Alert.alert('Error', routineData.error || 'No se pudo crear la rutina');
          return;
        }

        const routineId = routineData.routine.id;

        // 2. Create all exercises for this routine
        for (const ejercicio of rutina.exercises) {
          await fetch(`${API_URL}/workout/exercise`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              routineId,
              titulo: ejercicio.titulo,
              media: ejercicio.media,
              info1: ejercicio.info1,
              info2: ejercicio.info2,
            }),
          });
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        Alert.alert('Error de conexión', errorMsg);
        console.error('Error al guardar rutina:', error);
      }
    }

    workoutsBase().forEach(wk => {
      nuevaRutina(wk)
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?auto=format&fit=crop&w=1600&q=80",
        }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      {/* Overlay con degradado para mejor contraste */}
      <View style={styles.gradientOverlay} />

      <View style={styles.formCard}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Comienza tu entrenamiento hoy 💪</Text>

        {/* Campos con íconos */}
        <InputField icon="person" placeholder="Nombre" value={nombre} onChangeText={setNombre} editable={!loading} />
        <InputField icon="person-outline" placeholder="Apellido" value={apellido} onChangeText={setApellido} editable={!loading} />
        <InputField icon="id-card-outline" placeholder="DNI" keyboardType="numeric" value={dni} onChangeText={setDni} editable={!loading} />
        <InputField icon="mail-outline" placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} editable={!loading} />
        <InputField icon="lock-closed-outline" placeholder="Contraseña" secureTextEntry value={password} autoCapitalize="none" onChangeText={setPassword} editable={!loading} />
        <InputField icon="call-outline" placeholder="Teléfono" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} editable={!loading} />
        <InputField icon="calendar-outline" placeholder="Edad" keyboardType="numeric" value={edad} onChangeText={setEdad} editable={!loading} />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Boton
              name="Registrarme"
              viewStyle={styles.boton}
              textStyle={styles.botonText}
              onPress={handleRegister}
            />
          )}
        </View>
      </View>

      <StatusBar style="light" />
    </ScrollView>
  );
}

function InputField({
  icon,
  ...props
}: any) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={22} color="#FF7A00" style={styles.icon} />
      <TextInput
        {...props}
        placeholderTextColor="#999"
        style={styles.input}
      />
    </View>
  );
}

const COLORS = {
  orange: "#FF7A00",
  orangeDark: "#E46C00",
  white: "#fff",
  lightGlass: "rgba(255,255,255,0.15)",
  gradientTop: "rgba(0,0,0,0.6)",
  gradientBottom: "rgba(0,0,0,0.1)",
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  formCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.lightGlass,
    padding: 28,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#ddd",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#222",
  },
  buttonContainer: {
    marginTop: 18,
    width: "100%",
  },
  boton: {
    height: 54,
    backgroundColor: COLORS.orange,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  botonText: {
    color: "#111",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
