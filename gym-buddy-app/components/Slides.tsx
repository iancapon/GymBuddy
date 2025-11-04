import React, { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, StyleProp, ViewStyle, Text, View, Animated } from 'react-native';
import * as Speech from 'expo-speech';
import Boton from './Boton';
import { useRouter } from 'expo-router';
import { time } from 'console';
import { Ionicons } from '@expo/vector-icons';

type itemProps = {
  id: number;
  titulo: string;
  media: string;
  info1: string;
  info2: string;
  series: number
  repesXserie: number
  tiempoXserie: number
  descansoXserie: number
  orden: number;
};

type myListProps = {
  data: Array<itemProps> | undefined;
  style?: StyleProp<ViewStyle>;
  theme: any
  uploadToHistory: () => void/////////////////////////////////////////////////////////////////7
};


type slideProps = {
  datos: itemProps
  theme: any
  haySiguiente: boolean
  siguienteSlide: () => void
};


function Slide(ejercicio: slideProps) {
  const hasImage = !!ejercicio.datos.media && /^https?:\/\//i.test(ejercicio.datos.media);
  const noImage = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.smaroadsafety.com%2Fes%2Fp%2Fsoluciones-inteligentes%2Fandromeda-smart-system%2F&psig=AOvVaw0i5yhH538-i_kLcOOvo4AK&ust=1761325806012000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLijq5HoupADFQAAAAAdAAAAABAE"

  const titulo = ejercicio.datos.titulo
  const series = ejercicio.datos.series
  const tiempoXserie = ejercicio.datos.tiempoXserie
  const descansoXserie = ejercicio.datos.descansoXserie
  const repesXserie = ejercicio.datos.repesXserie

  const tiempoEnVezDeRepes = tiempoXserie != 0
  const tiempo = `${tiempoXserie} segundo${tiempoXserie > 1 ? 's' : ''}`
  const repes = `${repesXserie} repe${repesXserie > 1 ? 's' : ''}`
  const info1 = `${series} serie${series > 1 ? 's' : ''} x ${tiempoEnVezDeRepes ? tiempo : repes}`
  const info2 = `${descansoXserie} segundo${descansoXserie > 1 ? 's' : ''} de descanso`

  const [serieNum, setSerieNum] = useState(0)
  const [descansoNum, setDescansoNum] = useState(0)
  const [momento, setMomento] = useState<'EMPEZAR' | 'SERIE' | 'DESCANSO' | 'SALIR'>('EMPEZAR')

  const timeLeft = useRef(new Animated.Value(0)).current;

  const timeBarWidth = timeLeft.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  });

  const handleEmpezar = () => {
    setSerieNum(serieNum + 1)
    setMomento('SERIE')
    // iniciar contador de tiempo para serie
  }

  const handleSerie = () => {
    setDescansoNum(descansoNum + 1)
    setMomento('DESCANSO')
    // iniciar contador de tiempo para descanso
  }

  const handleDescanso = () => {
    setSerieNum(serieNum + 1)
    setMomento('SERIE')
    // iniciar contador de tiempo para serie
  }

  const handleSalir = () => {
    setSerieNum(0)
    setDescansoNum(0)
    setMomento('EMPEZAR')
    ejercicio.siguienteSlide()
  }

  useEffect(() => {
    if (descansoNum >= series) {
      setMomento('SALIR')
    }
  }, [descansoNum])

  return (
    <View style={[styles.wrapper,]}>
      <ImageBackground
        source={{ uri: hasImage ? ejercicio.datos.media : noImage }}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={[styles.overlay, { borderRadius: 16 }]} />
        <View style={styles.card}>
          {momento === 'EMPEZAR' && (
            <>
              <Text style={styles.title} numberOfLines={2}>{titulo}</Text>
              <Text style={styles.info}>{info1}</Text>
              <Text style={[styles.info, styles.info2]}>{info2}</Text>
              <Boton
                name={'EMPEZAR EJERCICIO'}
                onPress={handleEmpezar}
                viewStyle={[styles.primaryButton, { backgroundColor: !true ? ejercicio.theme.accentMuted : ejercicio.theme.accent }]}
                textStyle={[styles.primaryButtonText, { color: ejercicio.theme.text }]}
              />
            </>
          )}

          {momento === 'SERIE' && (
            <>
              <Text style={styles.title} numberOfLines={2}>{titulo}</Text>
              <Text style={styles.info} numberOfLines={2}>{`Serie número ${serieNum}`}</Text>
              <Text style={styles.info} numberOfLines={2}>{`${tiempoEnVezDeRepes ? tiempo : repes}`}</Text>
              <Boton
                name={'SIGUIENTE'}
                onPress={handleSerie}
                viewStyle={[styles.primaryButton, { backgroundColor: !true ? ejercicio.theme.accentMuted : ejercicio.theme.accent }]}
                textStyle={[styles.primaryButtonText, { color: ejercicio.theme.text }]}
              />
            </>
          )}

          {momento === 'DESCANSO' && (
            <>
              <Text style={styles.title} numberOfLines={2}>{titulo}</Text>
              <Text style={[styles.info, styles.info2]}>{info2}</Text>
              <Boton
                name={'SIGUIENTE'}
                onPress={handleDescanso}
                viewStyle={[styles.primaryButton, { backgroundColor: !true ? ejercicio.theme.accentMuted : ejercicio.theme.accent }]}
                textStyle={[styles.primaryButtonText, { color: ejercicio.theme.text }]}
              />
            </>
          )}

          {momento === 'SALIR' && (
            <>
              <Text style={styles.info} numberOfLines={2}>{'Fin del ejercicio'}</Text>
              <Boton
                name={ejercicio.haySiguiente ? 'SIGUIENTE EJERCICIO' : 'SALIR'}
                onPress={handleSalir}
                viewStyle={[styles.primaryButton, { backgroundColor: !true ? ejercicio.theme.accentMuted : ejercicio.theme.accent }]}
                textStyle={[styles.primaryButtonText, { color: ejercicio.theme.text }]}
              />
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

export default function Slides(props: myListProps) {
  const router = useRouter()
  const { data, style } = props;
  const [currentIndex, setCurrentIndex] = useState(0)

  const ejercicioActual = () => {
    if (data && currentIndex < data.length) {
      const ejercicio = data[currentIndex]
      if (ejercicio) {
        return ejercicio
      }
    }
    return {
      id: 0,
      titulo: 'No hay data',
      media: '',   // URL de imagen
      info1: '',   // por ej: "10 x 5"
      info2: '',   // por ej: "descanso 1 min"
      series: 0,
      repesXserie: 0,
      tiempoXserie: 0,
      descansoXserie: 0,
      orden: 0
    }
  }

  const progress = () => data ? (currentIndex) / data.length : 0

  const slideNo = () => data ? `${currentIndex + 1
    }/${data.length}` : "#/#"


  if (!data || data.length === 0) {
    return (
      <View style={[styles.fallback, style]}>
        <Text style={styles.fallbackText}>Sin ejercicios para mostrar</Text>
      </View>
    );
  }

  return (

    <View >
      {/* Slide nro */}
      <Text style={[styles.subtitle, { color: props.theme.text }]}>
        {slideNo()}
      </Text>
      <View style={{ padding: 5 }}></View>
      {/* Slide */}
      <Slide
        datos={ejercicioActual()}
        haySiguiente={currentIndex < data.length}
        siguienteSlide={() => {
          if (currentIndex < data.length) {
            setCurrentIndex(currentIndex + 1)
          }
          else {
            props.uploadToHistory()
            router.back()
            Alert.alert("Felicidades!", "Terminaste con el ejercicio")
          }

        }}
        theme={props.theme}
      />

      <View style={{padding:40}}></View>

      {/* Progreso */}
      <View style={styles.progressWrap}>
        <View style={[styles.progressTrack, { backgroundColor: props.theme.progressTrack }]}>
          <View style={[styles.progressFill, { width: `${Math.round(progress() * 100)}%`, backgroundColor: props.theme.progressFill }]} />
        </View>
        <Text style={[styles.progressText, { color: props.theme.textMuted }]}>{Math.round(progress() * 100)}%</Text>
      </View>
    </View>
  );
}


const COLORS = {
  bgCard: '#141414',
  overlay: 'rgba(0,0,0,0.35)',
  bgOverlay: 'rgba(0,0,0,0.45)',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.7)',
  card: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.12)',
  brand: '#FF7A00', // naranja suave
  brandDark: '#E46C00',
  brandDarkest: '#964600ff',
  progressTrack: 'rgba(255,255,255,0.18)',
  progressFill: '#FFB46B',
  shadow: 'rgba(0,0,0,0.45)',
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "normal",
  },
  progressWrap: {
    marginBottom: 14,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.progressTrack,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.progressFill,
    borderRadius: 999,
  },
  progressText: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  primaryButton: {
    width: '100%',
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  primaryButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.6,
    overflow: "visible"
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 12,
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
    //backgroundColor: COLORS.bgCard,
    borderWidth: 0,
    borderColor: COLORS.border,
    //height:"70%"
  },
  image: {
    width: '100%',
    height: 380,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  content: {
    padding: 16,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  info: {
    color: COLORS.textMuted,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  info2: {
    marginTop: 6,
    fontStyle: 'italic',
  },
  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallback: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgCard,
  },
  fallbackText: {
    color: COLORS.textMuted,
  },
});
