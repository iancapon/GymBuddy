import { Text, View, StyleSheet, TextStyle, ScrollView } from 'react-native'
import Boton from '../../components/Boton';
import { useRouter } from 'expo-router'
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";


export default function Modal() {
  const router = useRouter()
  useEffect(() => { NavigationBar.setVisibilityAsync("hidden") }, []);

  return (
    <View style={styles.verticalContainer}>
      <View style={[{ flex: 0.8 }]}>

        <Text style={[styles.grande, { alignSelf: "center" }]}> Core </Text>

      </View>

      <View style={[{ flex: 4 }]}>
        <ScrollView horizontal contentContainerStyle={{ gap: 20 }} >

          <Boton viewStyle={[styles.button, { height: 300, justifyContent: "center", alignItems: "center", borderColor: "#26667F" }]}>

            <Text style={[styles.subtitulo, styles.claro, { alignSelf: "center" }]} >Abdominales</Text>
            <View style={{ padding: 10 }}></View>
            <Text style={[styles.grande, styles.claro, { alignSelf: "center" }]} >30 x 5</Text>
            <View style={{ padding: 10 }}></View>
            <Text style={[styles.grande, styles.claro, { alignSelf: "center" }]} >descanso de 1 minuto</Text>

          </Boton>

          <Boton viewStyle={[styles.button, { height: 300, justifyContent: "center", alignItems: "center", borderColor: "#26667F" }]}>

            <Text style={[styles.subtitulo, styles.claro, { alignSelf: "center" }]} >Plancha</Text>
            <View style={{ padding: 10 }}></View>
            <Text style={[styles.grande, styles.claro, { alignSelf: "center" }]} >10 x 1 minuto</Text>
            <View style={{ padding: 10 }}></View>
            <Text style={[styles.grande, styles.claro, { alignSelf: "center" }]} >descanso de 1 minuto</Text>

          </Boton>

        </ScrollView>
      </View>


      <View style={{ flex: 0.4 }}></View>

      <View style={[styles.horizontalContainer, { flex: 1 }]}>

        <View style={{ flex: 1 }}>

          <Boton name="volver atras" viewStyle={[styles.button, { maxHeight: 80 }]} textStyle={styles.medioW} onPress={() => router.back()} />

        </View>

        <View style={[styles.verticalContainer, { flex: 2 }]}>

        </View>


      </View>
    </View>
  )
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
  claro: {
    color: "#DDF4E7"
  },
  oscuro: {
    color: "#26667F"
  },
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: 'white',
    padding: 5,
    flexWrap: "wrap"
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

