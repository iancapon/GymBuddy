import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router'
import Boton from "../../components/Boton"

export default function index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text>Perfil propio del usuario</Text>
      <Boton name="volver atras" onPress={()=> router.back()}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link:{
    color:"blue",
    fontStyle:"italic"
  }
});
