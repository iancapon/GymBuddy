import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle, StyleProp , Text, View, ScrollView, TextStyle } from 'react-native';
import Boton from '../../components/Boton'
import { Link, useRouter } from 'expo-router'

export default function index() {
  const router = useRouter()
  return (
    <ScrollView contentContainerStyle={{alignItems: "center"}} style={styles.verticalContainer}>
      <Boton name="modal"
        style={buttonStyles(styles.titulo)}
        onPress={() => router.push("../modal")}
      />
      <View style={styles.horizontalContainer}>
        <Boton name="perfil"
          style={buttonStyles(styles.subtitulo)}
          onPress={() => router.push("./perfil")}
        />
        <Boton name="perfil"
          style={buttonStyles(styles.subtitulo)}
          onPress={() => router.push("./perfil")}
        />
      </View>
      <Boton name="about"
        style={buttonStyles(styles.titulo)}
        onPress={() => router.push("./about")}
      />
      <Boton name="about"
        style={buttonStyles(styles.titulo)}
        onPress={() => router.push("./about")}
      />
      <Boton name="lyer lawyer mirror for ya"
        style={buttonStyles(styles.titulo)}
      />
      <Boton name="whats the difference"
        style={buttonStyles(styles.subtitulo)}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const buttonStyles = (fuente?: TextStyle) => {

  return (
    StyleSheet.create({
      button: {
        padding:5,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#DDF4E7",
        width: "96%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 1,
       // height:300
      },
      font: fuente == undefined ? {
        color: "#DDF4E7",
        fontSize: 20,
        fontWeight: "bold"
      } : fuente,
      pressedButton: {
        backgroundColor: "#26667F",
      },
      unpressedButton: {
        backgroundColor: "#67C090",
      }
    })
  )
}



const styles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#DDF4E7',
    padding: 5,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#DDF4E7',
    padding: 5,
  },
  titulo: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#DDF4E7"
  },
  subtitulo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#DDF4E7"
  }
});
