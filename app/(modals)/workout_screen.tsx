import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { useMemo, useState } from 'react';
import Boton from '../../components/Boton';
import Slides from '../../components/Slides';
import { useRouter } from 'expo-router';

export default function WorkoutScreen() {
  const [woIndex, setWoIndex] = useState(0); // current workout index
  const titulo = 'Ejemplo';
  const ejercicios = DATA;
  const router = useRouter();

  const progress = useMemo(
    () => (ejercicios.length ? (woIndex + 1) / ejercicios.length : 0),
    [woIndex, ejercicios.length]
  );
  const progressPct = Math.round(progress * 100);

  return (
    <ImageBackground
      source={{
        uri:
          'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww',
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Overlay para mejorar contraste */}
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.subtitle}>
            {woIndex + 1} / {ejercicios.length}
          </Text>
        </View>

        {/* Slides */}
        <View style={styles.slidesWrap}>
          <Slides data={ejercicios} currentIndex={woIndex} style={styles.slides} />
        </View>

        {/* Progreso */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>
          <Text style={styles.progressText}>{progressPct}%</Text>
        </View>

        {/* Botón fijo abajo */}
        <View style={styles.ctaWrap}>
          <Boton
            name={woIndex < ejercicios.length - 1 ? 'SIGUIENTE' : 'TERMINASTE'}
            onPress={() => {
              if (woIndex < ejercicios.length - 1) {
                setWoIndex(woIndex + 1);
              } else {
                router.back();
                Alert.alert('¡Felicidades!', 'Terminaste con los ejercicios');
              }
            }}
            viewStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const DATA = [
  {
    id: '1',
    titulo: 'Flexiones de brazo',
    media:
      'https://static.wikia.nocookie.net/gatopedia/images/2/2e/El_gatoo.png/revision/latest?cb=20230103150310&path-prefix=es',
    info1: '10 x 5',
    info2: 'descanso de un minuto',
  },
  {
    id: '2',
    titulo: 'Plancha',
    media:
      'https://www.patasencasa.com/sites/default/files/styles/article_detail_1200/public/2024-07/meme-del-gato-riendo_0.jpg.webp?itok=2QOszuKz',
    info1: '60 segundos x 5',
    info2: 'descanso de un minuto',
  },
  {
    id: '3',
    titulo: 'Abdominales',
    media: 'https://i.pinimg.com/474x/58/9e/14/589e1409b4bc80e0b5ba99538251d66c.jpg',
    info1: '20 x 5',
    info2: 'descanso de un minuto',
  },
  {
    id: '4',
    titulo: 'Pecho',
    media:
      'https://preview.redd.it/3wlrfietzzq31.jpg?width=640&crop=smart&auto=webp&s=fac76e26c430a104b182b73389c5ca0d951d46d8',
    info1: '10 x 5',
    info2: 'descanso de un minuto',
  },
];

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
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.bgOverlay,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
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
    marginBottom: 16,
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
