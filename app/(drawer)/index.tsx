import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ViewStyle, StyleProp, Text, View, ScrollView, TextStyle } from 'react-native';
import Boton from '../../components/Boton'
import { Link, useRouter } from 'expo-router'
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";


export default function index() {
  const router = useRouter()
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    //NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }} style={[styles.verticalContainer, {}]}>
      <Boton name="gym workout para hoy"
        viewStyle={[styles.button]}
        textStyle={[styles.titulo]}
        onPress={() => router.push("/workout")}
      />
      <View style={styles.horizontalContainer}>
        <Boton name="ayer"
          textStyle={[styles.subtitulo]}
          viewStyle={[styles.button]}
          onPress={() => router.push("/workout")}
        />
        <Boton name="anteayer"
          textStyle={[styles.subtitulo]}
          viewStyle={[styles.button]}
          onPress={() => router.push("/workout")}
        />
      </View>
      <View style={styles.horizontalContainer}>
        <Boton name="nuevo workout"
          textStyle={[styles.grande]}
          viewStyle={[styles.button]}
          onPress={() => router.push("/nuevo_workout")}
        />
        <Boton name="programar calendario"
          textStyle={[styles.grande]}
          viewStyle={[styles.button]}
          onPress={() => router.push("/calendario")}
        />
      </View>
      <Boton name="core"
        textStyle={[styles.titulo]}
        viewStyle={[styles.button]}
        onPress={() => router.push("/workout")}
      />
      <Boton name="espalda"
        textStyle={[styles.titulo]}
        viewStyle={[styles.button]}
        onPress={() => router.push("/workout")}
      />
      <Boton name="brazos"
        textStyle={[styles.subtitulo]}
        viewStyle={[styles.button]}
        onPress={() => router.push("/workout")}
      />
      <Boton name="piernas"
        textStyle={[styles.subtitulo]}
        viewStyle={[styles.button]}
        onPress={() => router.push("/workout")}
      />
      <Boton name="custom 1"
        textStyle={[styles.titulo]}
        viewStyle={[styles.button]}
        onPress={() => router.push("/workout")}
      />
      <Boton name="custom 2"
        textStyle={[styles.titulo]}
        viewStyle={[styles.button]}
        onPress={() => router.push("/workout")}
      />
      <View style={{ padding: 50 }}></View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#ffffffff",
    width: "96%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "center",
    flex: 1,
    backgroundColor: "#67C090"
  },
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
  },
  grande: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DDF4E7"
  },
  medio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDF4E7"
  },
  chico: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#DDF4E7"
  }
});
