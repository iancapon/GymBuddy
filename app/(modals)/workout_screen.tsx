import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, ImageBackground } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from '../../components/Boton';
import Tarjeta from '../../components/Tarjeta';
import Slides from '../../components/Slides';
import { useRouter } from 'expo-router';


export default function WorkoutScreen() {
  const [woIndex, setWoIndex] = useState(0)// current workout index
  const titulo = "Ejemplo"
  const ejercicios = DATA
  const router = useRouter()

  return (

    <ImageBackground
      source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >

      <View style={[styles.container, { ...StyleSheet.absoluteFillObject, backgroundColor: "#72727273", flex: 1 }]}>
        <Text style={[styles.blanco, styles.titulo, { flex: 2, textAlignVertical: "center" }]}> {titulo} </Text>

        <View style={{ flex: 10, backgroundColor: "transparent" }}>
          <Slides
            data={ejercicios}
            currentIndex={woIndex}
            style={{ backgroundColor: "transparent" }}
          />
        </View>

        <Text style={[styles.subtitulo, styles.blanco, { marginTop: 20 }]}> {100 * (woIndex + 1) / ejercicios.length}% </Text>

        <View style={[styles.container, { flex: 2, borderWidth: 0, flexDirection: 'row', backgroundColor: "transparent" }]}>

          <Boton name={woIndex < ejercicios.length - 1 ? 'SIGUIENTE' : 'TERMINASTE'}
            onPress={() => {
              if (woIndex < ejercicios.length - 1) {
                setWoIndex(woIndex + 1)
              }
              else {
                router.back()
                Alert.alert("Felicidades!!!", "Terminaste con los ejercicios")
              }
            }}
            viewStyle={[styles.tarjeta, { width: '60%', height: '70%', backgroundColor: "orange" }]}
            textStyle={[styles.grande, styles.negro]} />

        </View>

        <View style={[{ flex: 1 }]}></View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}


const DATA = [
  {
    id: '1',
    titulo: 'Flexiones de brazo',
    media: 'https://static.wikia.nocookie.net/gatopedia/images/2/2e/El_gatoo.png/revision/latest?cb=20230103150310&path-prefix=es',
    info1: '10 x 5', info2: 'descanso de un minuto'
  },
  {
    id: '2',
    titulo: 'Plancha',
    media: 'https://www.patasencasa.com/sites/default/files/styles/article_detail_1200/public/2024-07/meme-del-gato-riendo_0.jpg.webp?itok=2QOszuKz',
    info1: '60s x 5', info2: 'descanso de un minuto'
  },
  {
    id: '3',
    titulo: 'Abdominales',
    media: 'https://i.pinimg.com/474x/58/9e/14/589e1409b4bc80e0b5ba99538251d66c.jpg',
    info1: '20 x 5', info2: 'descanso de un minuto'
  },
  {
    id: '4',
    titulo: 'Pecho',
    media: 'https://preview.redd.it/3wlrfietzzq31.jpg?width=640&crop=smart&auto=webp&s=fac76e26c430a104b182b73389c5ca0d951d46d8',
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
    backgroundColor: "powderblue",//'#00b7ffff',
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
