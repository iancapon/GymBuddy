import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle, StyleProp , Text, View, ScrollView, TextStyle } from 'react-native';
import Boton from '../../components/Boton'
import { Link, useRouter } from 'expo-router'
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";


export default function index() {
  const router = useRouter()
  useEffect(() => {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("overlay-swipe");
    }, []);
  return (
    <ScrollView contentContainerStyle={{alignItems: "center"}} style={styles.verticalContainer}>
      <Boton name="gym workout para hoy"
        customStyle={buttonStyles(styles.titulo)}
        onPress={() => router.push("../modal")}
      />
      <View style={styles.horizontalContainer}>
        <Boton name="ayer"
          customStyle={buttonStyles(styles.subtitulo)}
          onPress={() => router.push("./perfil")}
        />
        <Boton name="anteayer"
          customStyle={buttonStyles(styles.subtitulo)}
          onPress={() => router.push("./perfil")}
        />
      </View>
      <Boton name="core"
        customStyle={buttonStyles(styles.titulo)}
        onPress={() => router.push("./about")}
      />
      <Boton name="espalda"
        customStyle={buttonStyles(styles.titulo)}
        onPress={() => router.push("./about")}
      />
      <Boton name="brazos"
        customStyle={buttonStyles(styles.titulo)}
      />
      <Boton name="piernas"
        customStyle={buttonStyles(styles.subtitulo)}
      />
      <Boton name="custom 1"
        customStyle={buttonStyles(styles.titulo)}
      />
      <Boton name="custom 2"
        customStyle={buttonStyles(styles.subtitulo)}
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
        borderColor: "#ffffffff",
        width: "96%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        alignSelf:"center",
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



const styles = StyleSheet.create({
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ffffffff',
    padding: 5,
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#ffffffff',
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
