import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Boton from '../../components/Boton'
import { Link, useRouter } from 'expo-router'

export default function index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text>Esta sería la página principal</Text>
      <Boton name="Abrir modal"
        textStyle={[styles.titulo, { color: "#DDF4E7" }]}
        buttonStyle={styles.tarjeta}
        unpressedButton={{ backgroundColor: "#67C090" }}
        pressedButton={{ backgroundColor: "#26667F" }}
        onPress={() => router.push("../modal")}
      />
      <Boton name="Perfil"
        textStyle={[styles.titulo, { color: "#DDF4E7" }]}
        buttonStyle={styles.tarjeta}
        unpressedButton={{ backgroundColor: "#67C090" }}
        pressedButton={{ backgroundColor: "#26667F" }}
        onPress={() => router.push("./perfil")}
      />
      <Boton name="About"
        textStyle={[styles.titulo, { color: "#DDF4E7" }]}
        buttonStyle={styles.tarjeta}
        unpressedButton={{ backgroundColor: "#67C090" }}
        pressedButton={{ backgroundColor: "#26667F" }}
        onPress={() => router.push("./about")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#DDF4E7',
    alignItems: 'center',
    justifyContent: 'center',

  },
  tarjeta: {
    borderRadius: 10,
    padding: 50,
    borderWidth: 3,
    borderColor: "#DDF4E7"
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
