import { Text, View, StyleSheet, TextStyle } from 'react-native'
import Boton from '../../components/Boton';
import { useRouter } from 'expo-router'
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";


export default function Modal() {
  const router = useRouter()
  useEffect(() => {
      NavigationBar.setVisibilityAsync("hidden");
      //NavigationBar.setBehaviorAsync("overlay-swipe");
    }, []);
  return (
    <View style={styles.verticalContainer}>
      <View style={[{flex: 9}]}>
        <Text style={[styles.medio, {}]}>
          Este seria el CALENDARIO de workouts
        </Text>
        
      </View>
      <View style={[styles.horizontalContainer, {flex: 2}]}>

        <View style={{ flex: 1 }}>

          <Boton name="volver atras" viewStyle={[styles.button, { maxHeight: 80 }]} textStyle={styles.medioW} onPress={() => router.back()} />

        </View>

        <View style={[styles.verticalContainer, { flex: 2 }]}>
          <Text style={[styles.medio, {}]}>
          el volver atras desde el modal funciona cuando quiere
          (arreglado)
        </Text>
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
  },
  verticalContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    padding:10
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


