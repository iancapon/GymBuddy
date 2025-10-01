import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from '../../components/Boton';
import Tarjeta from '../../components/Tarjeta';
import Slides from '../../components/Slides';


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

export default function WorkoutScreen() {
  const [woIndex, setWoIndex] = useState(0)// current workout index

  return (
    <View style={styles.container}>

      <View style={[styles.container, { flex: 2, borderWidth: 0 }]}>
        <Text style={[styles.celeste, styles.titulo, {}]}> Workout "xyz" </Text>
      </View>

      <View style={{ flex: 10 }}>
        <Slides
          data={WORKOUT}
          currentIndex={woIndex}
        />
      </View>

      <Text style={[styles.grande]}>~ {woIndex + 1} ~</Text>

      <View style={[styles.container, { flex: 2, borderWidth: 0, flexDirection: 'row' }]}>

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

      <StatusBar style="auto" />
    </View >
  );
}



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
