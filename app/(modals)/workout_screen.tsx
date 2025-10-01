import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, ImageBackground } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from '../../components/Boton';
import Tarjeta from '../../components/Tarjeta';
import Slides from '../../components/Slides';



export default function WorkoutScreen() {
  const [woIndex, setWoIndex] = useState(0)// current workout index

  return (

    <ImageBackground
      source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >

      <View style={[styles.container, { ...StyleSheet.absoluteFillObject, backgroundColor: "#72727273", flex: 1 }]}>
        <Text style={[styles.blanco, styles.titulo, { flex: 2, textAlignVertical: "center" }]}> Workout "xyz" </Text>

        <View style={{ flex: 10, backgroundColor: "transparent" }}>
          <Slides
            data={WORKOUT}
            currentIndex={woIndex}
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        <Text style={[styles.subtitulo, styles.blanco]}>~ {woIndex + 1} ~</Text>

        <View style={[styles.container, { flex: 2, borderWidth: 0, flexDirection: 'row', backgroundColor: "transparent" }]}>

          <Boton name='anterior'
            onPress={() => {
              if (woIndex > 0) {
                setWoIndex(woIndex - 1)
              }
            }}
            viewStyle={[styles.tarjeta, { width: '30%', height: '60%' }]}
            textStyle={[styles.grande, styles.blanco]}>
          </Boton>

          <Boton name='siguiente'
            onPress={() => {
              if (woIndex < WORKOUT.length - 1) {
                setWoIndex(woIndex + 1)
              }
            }}
            viewStyle={[styles.tarjeta, { width: '30%', height: '60%' }]}
            textStyle={[styles.grande, styles.blanco]}>
          </Boton>


        </View>

        <View style={[{ flex: 1 }]}></View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}


const WORKOUT = [
  {
    id: '1',
    titulo: 'Flexiones de brazo',
    media: 'video o explicacion',
    info1: '10 x 5', info2: 'descanso de un minuto'
  },
  {
    id: '2',
    titulo: 'Plancha',
    media: 'video o explicacion',
    info1: '60 segundos x 5', info2: 'descanso de un minuto'
  },
  {
    id: '3',
    titulo: 'Abdominales',
    media: 'video o explicacion',
    info1: '20 x 5', info2: 'descanso de un minuto'
  },
  {
    id: '4',
    titulo: 'Pecho',
    media: 'video o explicacion',
    info1: '10 x 5', info2: 'descanso de un minuto'
  }
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tarjeta: {
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00b7ffff',
    borderRadius: 10,
  },
  amarillo: {
    color: 'rgba(201, 245, 6, 1)'
  },
  negro: {
    color: 'rgba(0, 0, 0, 1)'
  },
  celeste: {
    color: '#00b7ffff'
  },
  blanco: {
    color: 'rgba(255, 255, 255, 1)'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  subtitulo: {
    fontWeight: 'bold',
    fontSize: 30
  },
  grande: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
