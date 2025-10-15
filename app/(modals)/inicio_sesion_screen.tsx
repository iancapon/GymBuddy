import { Text, View } from "react-native";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, ImageBackground, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Boton from "../../components/Boton";
import { StatusBar } from "expo-status-bar";


// Reemplaza esta url por la IP de tu PC,
//Ejemplo IP:PUERTO ---> 192.168.1.13:4000  poner el socket
const API_URL = "http://172.29.149.60:4000/session";

export default function RegistroScreen() {
  const router = useRouter();

  // Estados para los campos

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSession = async () => {
    // Validación básica
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresa un email válido");
      return;
    }

    // Validación de contraseña
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert("Error", "Por favor ingresa una contraseña válida");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.replace("../(tabs)/index_tab");
        Alert.alert(
          "Inicio de sesion ",
          "Has iniciado sesion correctamente 👽",
          [
            {
              text: "OK",
              //onPress: () => router.replace("../(tabs)/index_tab"),
            },
          ]
        );

      } else {
        Alert.alert("Error", data.error || "No se pudo iniciar sesion");
      }
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor. Asegúrate de que el servidor esté corriendo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <Text style={styles.title}>Inicio de sesión</Text>


      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Boton
            name="Iniciar sesión"
            viewStyle={styles.boton}
            textStyle={{ color: "white", fontSize: 20, fontWeight: "700" }}
            onPress={handleSession}
          />
        )}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,

  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007eafff"
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
  },
  boton: {
    padding: 0,
    margin: 0,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00b7ffff',
    borderRadius: 10,
  },
});
