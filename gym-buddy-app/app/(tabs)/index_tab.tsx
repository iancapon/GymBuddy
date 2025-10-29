import { Alert, StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useMemo, useState, useCallback, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { ContextoPerfil, ContextoTema } from '../_layout';
import Header from '../../components/Header';
import THEMES from '../THEMES'
import Boton from '../../components/Boton';
import ModalAlerta from '../../components/ModalAlerta';
import api_url from "../API_URL"

const API_URL = api_url()

type Routine = {
  userId: number;
  id: number;
  nombre: string;
  exercises: Array<any>;
};

type DayAssignment = {
  dayName: string
  dayIndex: number;
  routineId: number | null;
  routineName: string | null;
};

const DAYS_OF_WEEK = [
  { name: 'Lunes', index: 1 },
  { name: 'Martes', index: 2 },
  { name: 'Miércoles', index: 3 },
  { name: 'Jueves', index: 4 },
  { name: 'Viernes', index: 5 },
  { name: 'Sábado', index: 6 },
  { name: 'Domingo', index: 0 },
];


export default function IndexTab() {
  const router = useRouter();
  const contextoPerfil = useContext(ContextoPerfil);
  const userId = contextoPerfil?.userContext.id ? contextoPerfil?.userContext.id : 0
  const [nombre, setNombre] = useState("...")

  const [loadingRoutines, setLoadingRoutines] = useState(false);
  const [loadingTodaysRoutine, setLTR] = useState(false)
  const [loadingProgram, setLoadingProgram] = useState(false)
  const [todaysRoutine, setTodaysRoutine] = useState<Routine>()
  const [routines, setRoutines] = useState<Array<Routine>>([])
  const [dayAssignments, setDayAssignments] = useState<DayAssignment[]>(
    DAYS_OF_WEEK.map(day => ({
      dayName: day.name,
      dayIndex: day.index,
      routineId: null,
      routineName: null,
    }))
  );
  const [editar_eliminar_visible, set_ee_visible] = useState(false)

  const contextoTema = useContext(ContextoTema)
  const mode = contextoTema?.themeContext.theme
  const theme = THEMES()[mode != undefined ? mode : 'light'];

  // 📅 Fecha con formato “16 de Octubre del 2025” (sin Intl)
  const fechaDeHoy = useMemo(() => formatFechaES(new Date()), []);

  //fetch user profile data
  const handleSession = async () => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId
        })
      });

      const userdata = await response.json();

      if (!response.ok) {
        let errorMsg = `Error ${response.status}`;
        try {
          const errData = userdata//await userResponse.json();
          errorMsg = errData.message || errorMsg;
        } catch {
          // si no hay body JSON, deja el mensaje por defecto
        }
        throw new Error(errorMsg);
      }

      if (response.ok) {
        setNombre(userdata.data.nombre)
        //setUserId(userdata.data.id)
      }
    } catch (error: any) {
      console.error("❌ fetch user info error:", error.message);
      throw new Error(error.message || "Error de conexión con el servidor");
    }
  }


  const fetchUserRoutines = async () => {
    if (!userId) return;

    try {
      setLoadingRoutines(true);
      const response = await fetch(`${API_URL}/workout/routines/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMsg = `Error ${response.status}`;
        try {
          const errData = data//await response.json();
          errorMsg = errData.message || errorMsg;
        } catch {
          // si no hay body JSON, deja el mensaje por defecto
        }
        throw new Error(errorMsg);
      }
      if (data.success && data.routines) {
        setRoutines(data.routines);
      }
    } catch (error: any) {
      console.error("❌ fetch user routines error:", error.message);
      throw new Error(error.message || "Error de conexión con el servidor");
    } finally {
      setLoadingRoutines(false);
    }
  };

  const fetchAlreadyAssignedDays = async () => {
    if (!userId) return;
    setLoadingProgram(true)
    try {
      const userResponse = await fetch(`${API_URL}/programar_workout/findschedule?userId=${userId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
      )
      const datos = await userResponse.json()
      if (!userResponse.ok) {
        let errorMsg = `Error ${userResponse.status}`;
        try {
          const errData = datos//await userResponse.json();
          errorMsg = errData.message || errorMsg;
        } catch {
          // si no hay body JSON, deja el mensaje por defecto
        }
        throw new Error(errorMsg);
      }
      const programa = datos.assigned

      const loaded = DAYS_OF_WEEK.map(day => ({
        dayName: day.name,
        dayIndex: day.index,
        routineId: null,
        routineName: null,
      }))

      setDayAssignments(loaded.map(day => {
        const match = programa.find((dia: { dayIndex: number; }) => dia.dayIndex === day.dayIndex)
        return match
          ? {
            ...day,
            routineId: match.Routine.id,
            routineName: match.Routine.nombre
          } : day
      }))

    }
    catch (error: any) {
      console.error("❌ fetch assingned days error:", error.message);
      throw new Error(error.message || "Error de conexión con el servidor");
    } finally {
      setLoadingProgram(false)
    }
  }



  const fetchTodaysProgram = async () => {
    if (!userId) return;
    try {
      setLTR(true)
      const userResponse = await fetch(`${API_URL}/programar_workout/todayschedule?userId=${userId}`)

      const datos = await userResponse.json()

      if (!userResponse.ok) {
        let errorMsg = `Error ${userResponse.status}`;
        try {
          const errData = datos//await userResponse.json();
          errorMsg = errData.message || errorMsg;
        } catch {
          // si no hay body JSON, deja el mensaje por defecto
        }
        throw new Error(errorMsg);
      }

      if (datos.assigned.length > 0) {
        setTodaysRoutine(datos.assigned[0].Routine)
      }
      else {
        setTodaysRoutine(undefined)
      }

    }
    catch (error: any) {
      console.error("❌ fetch todays program error:", error.message);
      throw new Error(error.message || "Error de conexión con el servidor");
    }
    finally {
      setLTR(false)
    }
  }

  // Load data when screen is focused
  useFocusEffect(
    useCallback(() => {
      handleSession()
      fetchUserRoutines()
      fetchAlreadyAssignedDays()
      fetchTodaysProgram()
    }, [userId])
  );

  // HAY QUE GUARDAR UNA COPIA DE LA RUTINA EN EL HISTORIA
  const handleEditRoutine = () => {
    Alert.alert("oops 🫣", "aún no está implementado")
  }
  const handleDeleteRoutine = () => {
    Alert.alert("oops 🫠", "aún no está implementado")
  }



  return (
    <View style={[styles.container, { backgroundColor: theme.overlay, width: "100%" }]}>

      <StatusBar style={mode == "light" ? "dark" : "light"} />

      {/* Header */}
      <Header theme={theme} backButton={false} >
        <Text style={[{ color: theme.text, backgroundColor: theme.header }]}>GymBuddy</Text>
      </Header>


      {/* 🔝 sub Header con saludo y selector */}
      <View style={styles.topBar}>
        <Text style={[styles.greeting, { color: theme.text }]}>Hola {nombre} 👋</Text>
        <View style={styles.modeButtons}>
          <TouchableOpacity onPress={() => contextoTema?.setThemeContext({ theme: 'dark' })}>
            <Ionicons
              name="moon"
              size={26}
              color={mode === 'dark' ? theme.accent : theme.textMuted}
              style={styles.modeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => contextoTema?.setThemeContext({ theme: 'light' })}>
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
        {/*-- Rutina de hoy -- */}
        <Boton
          onPress={() => {
            todaysRoutine == undefined ? Alert.alert("Esperá! 👋👋", "Primero programá una rutina") :
              router.push({
                pathname: '../(modals)/workout_screen',
                params: { userId: userId.toString(), routineId: todaysRoutine.id, nombre: todaysRoutine.nombre }
              })
          }}
          viewStyle={[
            styles.mainCard,
            { backgroundColor: theme.accent, shadowColor: theme.text },
          ]}
        >
          <Ionicons name="barbell" size={60} color="#fff" />
          <Text style={[styles.mainTitle, { color: theme.text }]}>Entrenamiento para Hoy</Text>
          <Text style={[styles.mainSubtitle, { color: theme.text }]}>{fechaDeHoy}</Text>
          <Text style={[styles.smallTitle, { color: theme.text }]}>
            {todaysRoutine == undefined ? "No tenes una rutina programada" : todaysRoutine?.nombre}
          </Text>
        </Boton>

        {/* --- Programa de la semana --- */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Esta semana</Text>
        <FlatList
          style={{ width: "100%" }}
          horizontal
          showsHorizontalScrollIndicator={true}
          data={dayAssignments.filter(day => day.routineId)}
          keyExtractor={(item) => item.dayIndex.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => {
            return (<View style={{
              width: 2,
              height: 120,
              padding: 0,
              marginTop: 10,
              backgroundColor: theme.text
            }}
            />)
          }}
          ListEmptyComponent={
            <View
              style={[
                styles.programCard,
                { backgroundColor: "transparent", borderColor: theme.border },
              ]}
            >
              <Ionicons name="calendar-outline" size={42} color={theme.text} />
              <Text style={[styles.workoutTitle, { color: theme.text }]} numberOfLines={2}>
                {loadingProgram ? 'Cargando...' : 'No tienes rutinas programadas'}
              </Text>
            </View>
          }

          renderItem={({ item }) => (

            <View
              style={[
                styles.programCard,
                { backgroundColor: "transparent", borderColor: theme.border, marginVertical: 10 },
              ]}
            >
              <Ionicons name="calendar-outline" size={42} color={theme.text} />
              <Text style={[styles.workoutTitle, { color: theme.text }]} numberOfLines={2}>
                {item.routineName}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                {item.dayName}
              </Text>
            </View>
          )}
        />

        {/*-- Acciones -- */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Acciones</Text>
        <View style={styles.row}>
          <Boton
            onPress={() => router.push('../(modals)/crear_screen')}
            viewStyle={[
              styles.smallCard,
              { backgroundColor: theme.success, shadowColor: theme.text },
            ]}
          >
            <Ionicons name="create-outline" size={40} color="#fff" />
            <Text style={[styles.smallTitle, { color: theme.text }]}>Crear Rutina</Text>
          </Boton>

          <Boton
            onPress={() => router.push('../(modals)/programar_screen')}
            viewStyle={[
              styles.smallCard,
              { backgroundColor: theme.success, shadowColor: theme.text },
            ]}
          >
            <Ionicons name="create-outline" size={40} color="#fff" />
            <Text style={[styles.smallTitle, { color: theme.text }]}>Programar entrenamiento</Text>
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

        {/* -- Modal para editar | eliminar rutina -- */}
        <ModalAlerta
          visible={editar_eliminar_visible}
          setVisible={set_ee_visible}
          titulo='¿Vas a editar o eliminar?'
          subtitulo={`Rutina ${"~~~"}`}
          botonA='editar'
          botonAOnPress={handleEditRoutine}
          botonB='eliminar'
          botonBOnPress={handleDeleteRoutine}
          botonC='cerrar'
          botonCOnPress={() => set_ee_visible(false)}
        />
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
            <Boton
              viewStyle={[
                styles.programCard,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
            >
              <Ionicons name="calendar-outline" size={42} color={theme.text} />
              <Text style={[styles.workoutTitle, { color: theme.text }]} numberOfLines={2}>
                {loadingRoutines ? 'Cargando...' : 'No tienes rutinas creadas'}
              </Text>
            </Boton>
          }
          renderItem={({ item }) => (

            <Boton
              onPress={() => router.push({
                pathname: '../(modals)/workout_screen',
                params: { userId: userId.toString(), routineId: item.id, nombre: item.nombre }
              })}
              onLongPress={() => {
                set_ee_visible(true)
              }}
              viewStyle={[
                styles.workoutCard,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
              ]}
            >
              <View style={{ flexDirection: "row-reverse" }}>

                {/* //editar | eliminar 
                <View style={{ flexDirection: "column", alignItems: "center", right: 0 }}>
                  <Ionicons name="pencil-outline" size={15} color={theme.text} />
                  <Ionicons name="trash" size={15} color={theme.text} />
                </View>
                */}

                <View style={{}} >
                  <Ionicons name="barbell-outline" size={42} color={theme.text} />
                  <Text style={[styles.workoutTitle, { color: theme.text }]} numberOfLines={2}>
                    {item.nombre}
                  </Text>
                  <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                    {item.exercises.length} ejercicio{item.exercises.length > 1 ? "s" : ""}
                  </Text>
                </View>
              </View>


            </Boton>
          )}
        />
        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Ionicons name="information-circle-outline" size={24} color="#4DB6FF" />
          <Text style={[styles.instructionText, { color: theme.textMuted }]}>
            Manten apretado sobre una rutina para editarla o eliminarla.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Noticias..</Text>

        <Boton
          onPress={() => Alert.alert("Perdón 😭", "Esto aún no está implementado")}
          viewStyle={[
            styles.mainCard,
            { backgroundColor: theme.accent, shadowColor: theme.text },
          ]}
        >
          <Ionicons name="newspaper" size={60} color="#fff" />
          <Text style={[styles.mainTitle, { color: theme.text }]}>Noticias de la semana</Text>
          <Text style={[styles.mainSubtitle, { color: theme.text }]}>{fechaDeHoy}</Text>
        </Boton>

      </ScrollView>

    </View>
  );
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


const styles = StyleSheet.create({
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(77, 182, 255, 0.1)',
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    height: 70,
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 255, 0.3)',
  },
  instructionText: {
    flex: 1,
    marginLeft: 12,
    color: '#e8f0ff',
    fontSize: 14,
    lineHeight: 20,
  },
  secondaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.4,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#1b1d23',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    height: 100
  },
  backButton: {
    padding: 12,
    borderRadius: 100
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  container: { flex: 1, width: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject },
  topBar: {
    marginTop: 20,
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
  programCard: {
    width: 140,
    height: 120,
    borderRadius: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
    //shadowOpacity: 0.3,
    //shadowOffset: { width: 0, height: 5 },
    //shadowRadius: 8,
    //elevation: 3,
  },
  workoutTitle: { fontSize: 16, fontWeight: '600', marginTop: 8 },
});
