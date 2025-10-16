import { ImageBackground, StyleSheet, StyleProp, ViewStyle, Text, View, Animated } from 'react-native';
import Tarjeta from './Tarjeta';
import * as Speech from 'expo-speech';
import { useEffect, useRef } from 'react';

type itemProps = {
  titulo: string;
  media: string;
  info1: string;
  info2: string;
  onPress?: () => void;
};

type myListProps = {
  data: Array<itemProps>;
  currentIndex: number;
  style?: StyleProp<ViewStyle>;
};

export default function Slides(props: myListProps) {
  const { data, currentIndex, style } = props;
  if (currentIndex < 0 || currentIndex >= data.length) {
    throw new Error('Workout current index outside of bounds');
  }

  const animation = useRef(new Animated.Value(0)).current;

  // 🔹 Animación de entrada con leve deslizamiento y fade
  useEffect(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const slideAnimStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 0], // entra de abajo hacia arriba
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        }),
      },
    ],
    opacity: animation,
  };

  const ejercicio = data[currentIndex];

  // 🔊 Texto a voz
  useEffect(() => {
    const descripcionTTS = `${ejercicio.titulo}. ${ejercicio.info1}. ${ejercicio.info2}`;
    Speech.stop();
    Speech.speak(descripcionTTS, {
      language: 'es-SP',
      pitch: 1.0,
      rate: 1.05,
    });
  }, [currentIndex]);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.cardShadow, slideAnimStyle, style]}>
        <ImageBackground
          source={{ uri: ejercicio.media }}
          resizeMode="cover"
          style={styles.imageBg}
          imageStyle={styles.image}
        >
          {/* Overlay oscuro sobre la imagen */}
          <View style={styles.overlay} />

          <View style={styles.cardContent}>
            <Text style={styles.title}>{ejercicio.titulo}</Text>

            <View style={styles.separator} />

            <Text style={styles.info}>{ejercicio.info1}</Text>
            <Text style={[styles.info, styles.info2]}>{ejercicio.info2}</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const COLORS = {
  white: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.8)',
  orange: '#FF7A00',
  gradientDark: 'rgba(0,0,0,0.6)',
  gradientLight: 'rgba(0,0,0,0.25)',
  shadow: 'rgba(0,0,0,0.5)',
  border: 'rgba(255,255,255,0.2)',
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardShadow: {
    width: 320,
    height: 500,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#222',
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.6,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.gradientDark,
  },

  cardContent: {
    padding: 22,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    marginBottom: 14,
  },

  separator: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.orange,
    alignSelf: 'center',
    borderRadius: 3,
    marginBottom: 16,
  },

  info: {
    color: COLORS.textMuted,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },

  info2: {
    marginTop: 6,
    fontStyle: 'italic',
  },
});
