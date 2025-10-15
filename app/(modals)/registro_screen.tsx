import { Text, View } from "react-native";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, ImageBackground, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Boton from "../../components/Boton";
import { StatusBar } from "expo-status-bar";


// Reemplaza esta url por la IP de tu PC,
//Ejemplo IP:PUERTO ---> 192.168.1.13:4000  poner el socket
const API_URL = "http://192.168.1.13:4000/api";

export default function RegistroScreen() {
  const router = useRouter();
  
  // Estados para los campos
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validación básica
    if (!nombre || !apellido || !dni || !email || !telefono || !edad) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresa un email válido");
      return;
    }

    // Validación de edad
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
      Alert.alert("Error", "Por favor ingresa una edad válida");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          dni,
          email,
          telefono,
          edad: edadNum,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Registro exitoso ",
          "Te has registrado correctamente",
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
        
        // Limpiar formulario
        setNombre("");
        setApellido("");
        setDni("");
        setEmail("");
        setTelefono("");
        setEdad("");
      } else {
        Alert.alert("Error", data.error || "No se pudo completar el registro");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
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
      <Text style={styles.title}>Formulario de Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        keyboardType="numeric"
        value={dni}
        onChangeText={setDni}
        editable={!loading}
      />
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
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
        editable={!loading}
      />

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Boton
            name="Registrarme"
            viewStyle={styles.boton}
            textStyle={{ color: "white", fontSize: 20, fontWeight: "700" }}
            onPress={handleRegister}
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
    color:"#007eafff"
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
