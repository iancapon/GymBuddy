import { Text, View } from "react-native"
import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, TextInput, StatusBar } from "react-native";

export default function RegistroScreen() {
  // Estados para los campos
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");

  const handleRegister = () => {
    Alert.alert(
      "Registro exitoso ✅",
      `Nombre: ${nombre}\nApellido: ${apellido}\nDNI: ${dni}\nEmail: ${email}\nTeléfono: ${telefono}\nEdad: ${edad}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI"
        keyboardType="numeric"
        value={dni}
        onChangeText={setDni}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />

      <View style={styles.buttonContainer}>
        <Button title="Registrarme" onPress={handleRegister} />
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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
});
