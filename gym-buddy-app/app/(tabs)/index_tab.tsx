import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Boton from '../../components/Boton';
import { useMemo, useState } from 'react';
import { ContextoPerfil } from '../_layout';
import { useContext } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import api_url from "../API_URL"
const API_URL = api_url()

type Routine = {
  id: number;
  nombre: string;
  userId: number;
  exercises: Array<any>;
};

type userInfo = {
  mail: string
  password: string
}


// 🔤 Helper seguro para RN (sin Intl): 16 de Octubre del 2025
function formatFechaES(fecha = new Date()) {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  return `${dia} de ${mes} del ${año}`;
}

export default function SelectWorkout() {
  const router = useRouter();
  const contextoPerfil = useContext(ContextoPerfil);
  const [userId, setUserId] = useState()
  const [nombre, setNombre] = useState("...")
  const [apellido, setApellido] = useState("...")
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loadingRoutines, setLoadingRoutines] = useState(false);

  const [mode, setMode] = useState<'image' | 'dark' | 'light'>('image');

  // 📅 Fecha con formato “16 de Octubre del 2025” (sin Intl)
  const fechaDeHoy = useMemo(() => formatFechaES(new Date()), []);

  //fetch user profile data
  const handleSession = async () => {
    const response = await fetch(`${API_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: contextoPerfil?.userContext.mail,
        password: contextoPerfil?.userContext.password
      })
    });

    const userdata = await response.json();

    if (response.ok) {
      setNombre(userdata.data.nombre)
      setApellido(userdata.data.apellido)
      setUserId(userdata.data.id)
    }
  }


  // Fetch user routines
  const fetchUserRoutines = async () => {
    if (!userId || !API_URL) return;

    try {
      setLoadingRoutines(true);
      const response = await fetch(`${API_URL}/workout/routines/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success && data.routines) {
        setRoutines(data.routines);
      }
    } catch (error) {
      console.error('Error fetching routines:', error);
      Alert.alert('Error', 'No se pudieron cargar las rutinas');
    } finally {
      setLoadingRoutines(false);
    }
  };

  // Load data when screen is focused
  useFocusEffect(
    useCallback(() => {
      handleSession();
      fetchUserRoutines();
    }, [userId, API_URL])
  );

  const noImplementado = () => Alert.alert('No implementado', 'Esto aún no ha sido implementado');

  // 🎨 Paletas de color mejoradas
  const THEMES = {
    image: {
      bg: 'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000',
      overlay: 'rgba(0,0,0,0.55)',
      text: '#fff',
      textMuted: 'rgba(255,255,255,0.7)',
      accent: '#4DB6FF',
      success: '#43e97b',
      warning: '#ffb74d',
      cardBg: 'rgba(255,255,255,0.12)',
      border: 'rgba(255,255,255,0.2)',
    },
    dark: {
      bg: undefined,
      overlay: '#0f1115',
      text: '#e8f0ff',
      textMuted: '#94a3b8',
      accent: '#3BAFDA',
      success: '#26A69A',
      warning: '#FFB84D',
      cardBg: '#1b1d23',
      border: '#2b2e36',
    },
    light: {
      bg: undefined,
      overlay: '#f6f7fb',
      text: '#212529',
      textMuted: '#606770',
      accent: '#FF7A00',
      success: '#00C896',
      warning: '#FFC107',
      cardBg: '#ffffff',
      border: '#e3e3e3',
    },
  };

  const theme = THEMES[mode];

  return (
    <View style={[styles.container, { backgroundColor: theme.overlay, width: "100%" }]}>
      {mode === 'image' && (
        <ImageBackground
          source={{ uri: theme.bg }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
      )}
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]} />

      {/* 🔝 Header con saludo y selector */}
      <View style={styles.topBar}>
        <Text style={[styles.greeting, { color: theme.text }]}>Hola {nombre} 👋</Text>
        <View style={styles.modeButtons}>
          <TouchableOpacity onPress={() => setMode('image')}>
            <Ionicons
              name="image"
              size={26}
              color={mode === 'image' ? theme.accent : theme.textMuted}
              style={styles.modeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode('dark')}>
            <Ionicons
              name="moon"
              size={26}
              color={mode === 'dark' ? theme.accent : theme.textMuted}
              style={styles.modeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode('light')}>
            <Ionicons
              name="sunny"
              size={26}
              color={mode === 'light' ? theme.accent : theme.textMuted}
              style={styles.modeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={[{ width: "100%", paddingHorizontal: 10 }]}

      >


        <Boton
          onPress={() => router.push('../(modals)/workout_screen')}
          viewStyle={[
            styles.mainCard,
            { backgroundColor: theme.accent, shadowColor: theme.text },
          ]}
        >
          <Ionicons name="barbell" size={60} color="#fff" />
          <Text style={[styles.mainTitle, { color: theme.text }]}>Entrenamiento de Hoy</Text>
          <Text style={[styles.mainSubtitle, { color: theme.textMuted }]}>{fechaDeHoy}</Text>
        </Boton>

        <View style={styles.row}>
          <Boton
            onPress={() => router.push('../(modals)/crear_screen')}
            viewStyle={[
              styles.smallCard,
              { backgroundColor: theme.success, shadowColor: theme.text },
            ]}
          >
            <Ionicons name="create-outline" size={40} color="#fff" />
            <Text style={[styles.smallTitle, { color: theme.text }]}>Crear</Text>
          </Boton>

          <Boton
            onPress={() => router.push('../(modals)/programar_screen')}
            viewStyle={[
              styles.smallCard,
              { backgroundColor: theme.success, shadowColor: theme.text },
            ]}
          >
            <Ionicons name="create-outline" size={40} color="#fff" />
            <Text style={[styles.smallTitle, { color: theme.text }]}>Programar un entrenamiento</Text>
          </Boton>

          <Boton
            onPress={() => router.push('../(modals)/historial_screen')}
            viewStyle={[
              styles.smallCard,
              { backgroundColor: theme.warning, shadowColor: theme.text },
            ]}
          >
            <Ionicons name="book-outline" size={40} color="#fff" />
            <Text style={[styles.smallTitle, { color: theme.text }]}>Historial</Text>
          </Boton>
        </View>

        {/* --- Tus rutinas --- */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Tus Rutinas</Text>
        <FlatList
          style={{ width: "100%" }}
          horizontal
          showsHorizontalScrollIndicator={true}
          data={routines}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ListEmptyComponent={
            <Text style={{ color: theme.textMuted, marginLeft: 10 }}>
              {loadingRoutines ? 'Cargando...' : 'No tienes rutinas creadas'}
            </Text>
          }
          renderItem={({ item }) => (

            <Boton
              onPress={() => router.push({
                pathname: '../(modals)/workout_screen',
                params: { routineId: item.id, nombre: item.nombre }
              })}
              viewStyle={[
                styles.workoutCard,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
            >
              <Ionicons name="barbell-outline" size={42} color={theme.text} />
              <Text style={[styles.workoutTitle, { color: theme.text }]} numberOfLines={2}>
                {item.nombre}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                {item.exercises.length} ejercicio{item.exercises.length > 1 ? "s" : ""}
              </Text>
            </Boton>
          )}
        />

        <View style={{paddingVertical:5}}></View>

        <Boton
          onPress={() => router.push('../(modals)/workout_screen')}
          viewStyle={[
            styles.mainCard,
            { backgroundColor: theme.accent, shadowColor: theme.text },
          ]}
        >
          <Ionicons name="newspaper" size={60} color="#fff" />
          <Text style={[styles.mainTitle, { color: theme.text }]}>Noticias de la semana</Text>
          <Text style={[styles.mainSubtitle, { color: theme.textMuted }]}>{fechaDeHoy}</Text>
        </Boton>

      </ScrollView>

      <StatusBar style={mode === 'light' ? 'dark' : 'light'} />
    </View>
  );
}

const WORKOUTS = [
  { id: '2', titulo: 'Core' },
  { id: '3', titulo: 'Tren superior' },
  { id: '4', titulo: 'Pecho' },
  { id: '5', titulo: 'Piernas' },
  { id: '6', titulo: 'Custom 1' },
  { id: '7', titulo: 'Custom 2' },
];

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject },
  topBar: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
  },
  modeButtons: { flexDirection: 'row' },
  modeIcon: { marginHorizontal: 6 },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  mainCard: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 5,
  },
  mainTitle: { fontSize: 26, fontWeight: '800', marginTop: 10 },
  mainSubtitle: { fontSize: 16, marginTop: 4 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 4,
  },
  smallTitle: { fontSize: 18, fontWeight: '600', marginTop: 6 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  workoutCard: {
    width: 160,
    height: 120,
    borderRadius: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 3,
  },
  workoutTitle: { fontSize: 16, fontWeight: '600', marginTop: 8 },
});
