import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { useMemo, useState, useContext, useEffect } from 'react';
import Boton from '../../components/Boton';
import Slides from '../../components/Slides';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { ContextoPerfil, ContextoTema } from '../_layout';
import THEMES from '../THEMES';

import api_url from "../API_URL"
const API_URL = api_url()

type Exercise = {
  id: number;
  titulo: string;
  media: string;
  info1: string;
  info2: string;
  orden: number;
};

type Routine = {
  id: number;
  nombre: string;
  userId: number;
  exercises: Exercise[];
};

export default function WorkoutScreen() {
  const contextoTema = useContext(ContextoTema)
  const mode = contextoTema?.themeContext.theme
  const theme = THEMES()[mode != undefined ? mode : 'image'];

  const router = useRouter();
  const params = useLocalSearchParams();
  const contexto = useContext(ContextoPerfil);

  const routineId = params.routineId as string;

  const [routine, setRoutine] = useState<Routine>();
  const [loading, setLoading] = useState(true);

  const fetchRoutineDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/workout/routine/${routineId}/exercises`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.success && data.exercises) {
        // Create routine object with exercises
        setRoutine({
          id: Number(routineId),
          nombre: params.nombre as string || 'Rutina',
          userId: 0,
          exercises: data.exercises,
        });
      } else {
        Alert.alert('Error', 'No se pudo cargar la rutina');
      }
    } catch (error) {
      console.error('Error fetching routine:', error);
      Alert.alert('Error de conexión', 'No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!routineId || !API_URL) {
      Alert.alert('Error', 'Rutina no encontrada');
      router.back();
      return;
    }

    fetchRoutineDetails();
  }, [routineId, API_URL]);


  return (
    <ImageBackground
      source={{
        uri:
          'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww',
      }}
      style={[styles.bg, { backgroundColor: theme.bg }]}
      resizeMode="cover"
    >
      {/* Overlay para mejorar contraste */}
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]} />

      <SafeAreaView style={styles.safe}>

        <StatusBar style="auto" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title,{color:theme.text}]}>{routine?.nombre}</Text>
        </View>

        {/* Slides */}
        <View style={[styles.slidesWrap, {backgroundColor:theme.cardBg}]}>
          <Slides data={routine?.exercises} style={styles.slides} theme={theme} />
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}


const COLORS = {
  bgOverlay: 'rgba(0,0,0,0.45)',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.7)',
  card: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.12)',
  brand: '#FF7A00', // naranja suave
  brandDark: '#E46C00',
  progressTrack: 'rgba(255,255,255,0.18)',
  progressFill: '#FFB46B',
  shadow: 'rgba(0,0,0,0.45)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.bgOverlay,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 0,
    justifyContent: 'flex-start',

  },

  header: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 4,
  },

  slidesWrap: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    // Sombra (Android e iOS)
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  slides: {
    backgroundColor: 'transparent',
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

  ctaWrap: {
    paddingTop: 4,
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
  },
});
