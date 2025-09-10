import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextStyle, Text, View, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router'
import Boton from "../../components/Boton"
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function index() {
  const router = useRouter()
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);
  return (
    <ScrollView style={styles.verticalContainer}>

      <Text style={[styles.subtitulo, { flex: 2 }]}>mi perfil</Text>

      <Text style={[styles.titulo, { flex: 3 }]}>Ian Capon</Text>

      <Text style={[styles.medio, { flex: 1 }]}>fecha de admisión: 09/09/2025</Text>

      <Text style={[styles.medio, { flex: 1 }]}>plan: básico</Text>

      <View style={{ height: 400, flex: 6, borderWidth: 2, borderColor: "#26667F", justifyContent: "center", alignItems: "center" }}>

        <Text>Algo habria que poner acá</Text>

      </View>

      <View style={[styles.horizontalContainer, { flex: 2 }]}>

        <View style={{ flex: 1 }}>

          <Boton name="volver atras" customStyle={buttonStyles(styles.medioW)} onPress={() => router.back()} />

        </View>

        <View style={[styles.verticalContainer, { flex: 2 }]}>

          <Boton name="ingresar datos" customStyle={buttonStyles(styles.medioW)} onPress={() => router.push("../(modals)/modal")} />

          <Boton name="nuevo plan" customStyle={buttonStyles(styles.medioW)} onPress={() => router.push("../modal")} />

        </View>

      </View>



      <StatusBar style="auto" />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 2,
    //justifyContent:"space-between"
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'white',
    padding: 5,
  },
  titulo: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#26667F"
  },
  subtitulo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#26667F"
  },
  grande: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#26667F"
  },
  medio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#26667F"
  },
  medioW: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDF4E7"
  },
  chico: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#26667F"
  }

});



const buttonStyles = (fuente?: TextStyle) => {

  return (
    StyleSheet.create({
      button: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "white",
        width: "96%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        maxHeight: 80,
        flex: 1,
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