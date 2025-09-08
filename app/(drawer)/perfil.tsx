import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router'

export default function index() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text>Perfil propio del usuario</Text>
      <Link href="../modal" style={styles.link}>
        abrir modal
      </Link> 
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
