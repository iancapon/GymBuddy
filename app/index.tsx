import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Boton from '../components/Boton';
import { useRouter } from "expo-router"


export default function IndexScreen() {
  const router = useRouter()

  const handleSession = () => {
    router.push("../(modals)/inicio_sesion_screen")
  };

  const handleRegister = () => {
    router.push("../(modals)/registro_screen")
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <Text style={styles.logoText}>GymBuddy</Text>

        <Boton viewStyle={styles.button} onPress={handleRegister} >
          <Text style={styles.buttonText}>Registrarme</Text>
        </Boton>

        <Boton viewStyle={styles.button} onPress={handleSession} >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Boton>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    bottom: '40%',
    alignSelf: 'center',
    width: '70%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logoText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 200,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 40,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },
});
