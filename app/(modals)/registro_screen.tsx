import { Text, View } from "react-native"
import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, TextInput, ImageBackground } from "react-native";
import { useRouter } from "expo-router"
import Boton from "../../components/Boton";
import { StatusBar } from "expo-status-bar";

export default function RegistroScreen() {
  const router = useRouter()
  // Estados para los campos
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");

  const handleRegister = () => {
    Alert.alert("Registro", "Te has registrado correctamente ✅");
    router.back()
    /*Alert.alert(
      "Registro exitoso ✅",
      `Nombre: ${nombre}\nApellido: ${apellido}\nDNI: ${dni}\nEmail: ${email}\nTeléfono: ${telefono}\nEdad: ${edad}`
    );*/
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
        <Boton
          name="Registrarme"
          viewStyle={styles.boton}
          textStyle={{ color: "white", fontSize: 20, fontWeight: "700" }}
          onPress={handleRegister}>
        </Boton>
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
