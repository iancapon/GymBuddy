import React, { useEffect, useRef } from 'react';
import { ImageBackground, StyleSheet, StyleProp, ViewStyle, Text, View, Animated } from 'react-native';
import * as Speech from 'expo-speech';

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
  currentIndex: number;
  style?: StyleProp<ViewStyle>;
};

const COLORS = {
  bgCard: '#141414',
  text: '#FFFFFF',
  textMuted: '#B8B8B8',
  border: '#2A2A2A',
  overlay: 'rgba(0,0,0,0.35)',
};

export default function Slides(props: myListProps) {
  const { data, currentIndex, style } = props;

  
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!data || data.length === 0) return;
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, data, animation]);

 
  useEffect(() => {
    if (!data || data.length === 0) return;
    const ejercicio = data[currentIndex];
    if (!ejercicio) return;

    const descripcionTTS = `${ejercicio.titulo}. ${ejercicio.info1}. ${ejercicio.info2}`;
    Speech.stop();
    Speech.speak(descripcionTTS, {
      language: 'es-ES',
      pitch: 1.0,
      rate: 1.05,
    });
  }, [currentIndex, data]);

  
  if (!data || data.length === 0) {
    return (
      <View style={[styles.fallback, style]}>
        <Text style={styles.fallbackText}>Sin ejercicios para mostrar</Text>
      </View>
    );
  }

  const ejercicio = data[currentIndex];
  if (!ejercicio) {
    return (
      <View style={[styles.fallback, style]}>
        <Text style={styles.fallbackText}>Índice fuera de rango ({currentIndex})</Text>
      </View>
    );
  }

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  const hasImage = !!ejercicio.media && /^https?:\/\//i.test(ejercicio.media);

  return (
    <View style={[styles.wrapper, style]}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {hasImage ? (
          <ImageBackground
            source={{ uri: ejercicio.media }}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.imageRadius}
          >
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={2}>{ejercicio.titulo}</Text>
              <Text style={styles.info}>{ejercicio.info1}</Text>
              <Text style={[styles.info, styles.info2]}>{ejercicio.info2}</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={[styles.image, styles.noImage]}>
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={2}>{ejercicio.titulo}</Text>
              <Text style={styles.info}>{ejercicio.info1}</Text>
              <Text style={[styles.info, styles.info2]}>{ejercicio.info2}</Text>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 12,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: 260,
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
