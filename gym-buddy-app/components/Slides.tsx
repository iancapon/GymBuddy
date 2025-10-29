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
  media: string;   // URL de imagen
  info1: string;   // por ej: "10 x 5"
  info2: string;   // por ej: "descanso 1 min"
  orden: number;
};

type myListProps = {
  data: Array<itemProps> | undefined;
  style?: StyleProp<ViewStyle>;
  theme: any
  uploadToHistory: () => void/////////////////////////////////////////////////////////////////7
};


type slideProps = {
  titulo: string;
  media: string;   // URL de imagen
  info1: string;   // por ej: "10 x 5"
  info2: string;   // por ej: "descanso 1 min"
  theme: any
};


function Slide(ejercicio: slideProps) {
  const hasImage = !!ejercicio.media && /^https?:\/\//i.test(ejercicio.media);
  const noImage = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.smaroadsafety.com%2Fes%2Fp%2Fsoluciones-inteligentes%2Fandromeda-smart-system%2F&psig=AOvVaw0i5yhH538-i_kLcOOvo4AK&ust=1761325806012000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLijq5HoupADFQAAAAAdAAAAABAE"



  return (
    <View style={[styles.wrapper,]}>
      <ImageBackground
        source={{ uri: hasImage ? ejercicio.media : noImage }}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <View style={[styles.overlay, { borderRadius: 16 }]} />
        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={2}>{ejercicio.titulo}</Text>
          <Text style={styles.info}>{ejercicio.info1}</Text>
          <Text style={[styles.info, styles.info2]}>{ejercicio.info2}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default function Slides(props: myListProps) {
  const router = useRouter()
  const { data, style } = props;
  const [currentIndex, setCurrentIndex] = useState(0)


  const duration = 5 //////////////////duracion de cada ejercicio
  const timeLeft = useRef(new Animated.Value(0)).current;
  const [siguiente, setSiguiente] = useState(false)

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
      orden: 0
    }
  }

  const progress = () => data ? (currentIndex + 1) / data.length : 0

  const slideNo = () => data ? `${currentIndex + 1}/${data.length}` : "#/#"

  const restartAnimation = () => {
    setSiguiente(false)

    timeLeft.stopAnimation(() => {
      timeLeft.setValue(0);
      Animated.timing(timeLeft, {
        toValue: 1,
        duration: duration * 1000,
        useNativeDriver: false,
      }).start(() => {
        setSiguiente(true)
      });
    });

    /*const descripcionTTS = `${ejercicioActual().titulo}. ${ejercicioActual().info1}. ${ejercicioActual().info2}`;
    Speech.stop();
    Speech.speak(descripcionTTS, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 1.05,
    });*/
  };

  useEffect(() => {
    restartAnimation()
  }, []);


  const timeBarWidth = timeLeft.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  });

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
        titulo={ejercicioActual().titulo}
        media={ejercicioActual().media}
        info1={ejercicioActual().info1}
        info2={ejercicioActual().info2}
        theme={props.theme}
      />
      {/* Timer */}
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Animated.View style={[styles.progressFill, { width: timeBarWidth, height: 10, marginBottom: 0, backgroundColor: props.theme.warning }]} />
        <Ionicons name="stopwatch-outline" size={40} color={!siguiente ? props.theme.warning : props.theme.success} />
      </View>
      {/* Boton */}
      <Boton
        name={currentIndex + 1 < data.length ? 'SIGUIENTE' : 'SALIR'}
        onPress={() => {
          if (siguiente) {
            if (currentIndex + 1 < data.length) {
              setCurrentIndex(currentIndex + 1)
              restartAnimation()
            }
            else {
              props.uploadToHistory()
              router.back()
              Alert.alert("Felicidades!", "Terminaste con el ejercicio")
            }
          }
        }}
        viewStyle={[styles.primaryButton, { backgroundColor: !siguiente ? props.theme.accentMuted : props.theme.accent }]}
        textStyle={[styles.primaryButtonText, { color: props.theme.text }]}
      />

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
