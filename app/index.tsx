import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from '../components/Boton';
import Tarjeta from '../components/Tarjeta';



const WORKOUT = [
  {
    id: '1', titulo: 'Flexiones de brazo', media: 'video o explicacion', info1: '10 x 5', info2: 'descanso de un minuto'
  },
  {
    id: '2', titulo: 'Plancha', media: 'video o explicacion', info1: '60 segundos x 5', info2: 'descanso de un minuto'
  }
]

type itemProps = {
  titulo: string
  media: string
  info1: string
  info2: string
}

function Item(props: itemProps) {
  return (
    <Tarjeta
      viewStyle={[styles.tarjeta, { width: 300, height: 500, }]}
      pressedOptions={[{ opacity: 0.9 }]}
    >
      <View style={[{ flex: 2, borderWidth: 0, margin: 10 }]}>
        <Text style={[styles.blanco, styles.subtitulo, {}]}>{props.titulo}</Text>
      </View>
      <View style={[{ flex: 4, borderWidth: 1, margin: 10, width: "90%", height: "100%" }]}>
        <Text style={[styles.blanco, {}]}>{props.media}</Text>
      </View>
      <View style={[{ flex: 1, borderWidth: 0, margin: 10 }]}>
        <Text style={[styles.blanco, styles.grande, {}]}>{props.info1}</Text>
      </View>
      <View style={[{ flex: 2, borderWidth: 0, margin: 10 }]}>
        <Text style={[styles.blanco, styles.grande, {}]}>{props.info2}</Text>
      </View>

    </Tarjeta>
  )
}

type myListProps = {
  data: Array<itemProps>
  currentIndex: number
}

function MyList(props: myListProps) {// arreglo de
  if (props.currentIndex < 0 || props.currentIndex >= props.data.length) {
    throw new Error('Workout current index outside of bounds')
  }

  const emptyCard = <Tarjeta viewStyle={[styles.tarjeta, { width: 300, height: 500, opacity: 0.5 }]} pressedOptions={[{ opacity: 0.5 }]} ></Tarjeta>
  const noCard = <Tarjeta viewStyle={[styles.tarjeta, { width: 300, height: 500, opacity: 0 }]} pressedOptions={[{ opacity: 0 }]} ></Tarjeta>

  const current = props.data[props.currentIndex]
  const previous = props.currentIndex - 1 < 0 ? noCard : emptyCard
  const next = props.currentIndex + 1 > props.data.length - 1 ? noCard : emptyCard

  return (
    <View style={[styles.container, { flex: 10, borderWidth: 1, flexDirection: 'row' }]}>

      {previous}

      <Item titulo={current.titulo} media={current.media} info1={current.info1} info2={current.info2} />

      {next}

    </View>
  )
}


export default function Index() {
  /* 
    <View style={[styles.container, { flex: 10, borderWidth: 1, width: '90%' }]}>
        <FlatList
          horizontal
          style={[{}]}
          data={WORKOUT}
          renderItem={({ item }) => <Item titulo={item.titulo} media={item.media} info1={item.info1} info2={item.info2} />}
          keyExtractor={item => item.id}
        />
      </View>
  */
  const [woIndex, setWoIndex] = useState(0)// current workout index

  return (
    <View style={styles.container}>

      <View style={[styles.container, { flex: 2, borderWidth: 1 }]}>
        <Text style={[styles.negro, styles.titulo, {}]}> Workout xyz </Text>
      </View>

      <MyList data={WORKOUT} currentIndex={woIndex} />

      <View style={[styles.container, { flex: 2, borderWidth: 1, flexDirection: 'row' }]}>

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
    backgroundColor: 'rgba(171, 164, 164, 1)',
    borderRadius: 10,
  },
  amarillo: {
    color: 'rgba(201, 245, 6, 1)'
  },
  negro: {
    color: 'rgba(0, 0, 0, 1)'
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
