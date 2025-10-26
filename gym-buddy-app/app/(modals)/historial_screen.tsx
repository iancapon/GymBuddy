import { StyleSheet, ScrollView, Modal, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import Boton from '../../components/Boton';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect, useCallback, useContext } from 'react';
import ModalAlerta from '../../components/ModalAlerta';
import { ContextoPerfil, ContextoTema } from '../_layout';
import THEMES from '../THEMES';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import api_url from "../API_URL"
const API_URL = api_url()

type Routine = {
  id: number;
  nombre: string;
  userId: number;
  exercises: Array<any>;
};
type History = {
  id: number
  userId: number
  Routine: Routine
  routineId: number
  fecha: Date
}

// 🔤 Helper seguro para RN (sin Intl): 16 de Octubre del 2025
function formatFechaES(fecha = new Date()) {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const minutos = fecha.getMinutes()
  const hora = fecha.getHours()
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  return `🗓️ ${dia}/${mes}/${año}           🕑${hora}:${minutos}`;
}

export default function Historial() {
  const router = useRouter()
  const contextoPerfil = useContext(ContextoPerfil);
  const [userId, setUserId] = useState(0)
  const [modal, setModal] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [fechaModal, setFechaModal] = useState('');

  const contextoTema = useContext(ContextoTema)
  const mode = contextoTema?.themeContext.theme
  const theme = THEMES()[mode != undefined ? mode : 'light'];

  const fechasMarcadas = () => {
    if (!history) return
    const wk = history.map(h => new Date(h.fecha))

    return wk.reduce((fechas: any, programa: Date) => {
      fechas[programa.toISOString().split("T")[0]] = { selected: true, selectedColor: theme.accent };
      return fechas;
    }, {})
  }

  const [history, setHistory] = useState<Array<History>>([]);


  //fetch user profile data
  const handleSession = async () => {
    const response = await fetch(`${API_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: contextoPerfil?.userContext.id
      })
    });

    const userdata = await response.json();

    if (response.ok) {
      setUserId(userdata.data.id)
    }
  }

  ////////////// falta trabajo esto
  const fetchUserHistory = async () => {
    if (!userId || !API_URL) return;

    try {
      const response = await fetch(`${API_URL}/history?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok && data.data) {
        setHistory(data.data);
        //Alert.alert("historia", `${history[0].fecha}`)
      }

    }
    catch (error) {
      console.error('Error fetching routines:', error);
      //Alert.alert('Error', 'No se pudieron cargar las rutinas');
    }
  };

  useEffect(() => {
    handleSession()
    fetchUserHistory()
  }, [userId, history])

  //Alert.alert(":", JSON.stringify(fechasMarcadas()))


  return (
    <View style={[styles.overlay, { flex: 1, backgroundColor: theme.overlay }]}>

      {/* Modal resumen */}
      {
        <ModalAlerta visible={modal} setVisible={setModal}
          titulo={fechaModal}
          subtitulo={tituloModal} botonA='cerrar' botonAOnPress={() => setModal(false)} />
      }

      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.header }]}>
          <Boton
            onPress={() => router.back()}
            viewStyle={[styles.backButton, { backgroundColor: theme.header }]}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Boton>
          <Text style={[styles.headerTitle, { color: theme.text }]}>📅 Historial Completo</Text>
          <View style={{ width: 24 }} />
        </View>
        <FlatList
          style={{ paddingHorizontal: 20, paddingVertical: 20 }}
          inverted
          ListFooterComponent={ // es el footer porque la lista está invertida, para aparecer lo más reciente primero
            <View>
              <View style={[styles.calendar, { backgroundColor: "transparent", borderColor: theme.textMuted, borderWidth: 1 }]}>
                <Calendar
                  style={styles.calendar}
                  markedDates={fechasMarcadas()}
                  theme={{
                    calendarBackground: "transparent",
                    dayTextColor: theme.text,
                    monthTextColor: theme.text,
                    textDisabledColor: theme.textMuted,
                    todayTextColor: theme.accent,
                    arrowColor: theme.text,
                    textSectionTitleColor: theme.success,
                    selectedDayBackgroundColor: theme.success,
                    selectedDayTextColor: theme.text,
                  }}
                  onDayPress={(date) => {
                    const item = history.find((programa) => {
                      const fecha = new Date(programa.fecha)
                      const dia = fecha.getDay()
                      const mes = fecha.getMonth()
                      const anio = fecha.getFullYear()
                      return (dia == date.day && mes == date.month && anio == date.year)
                    })
                    if (item) {
                      setTituloModal(item.Routine.nombre);
                      setFechaModal(formatFechaES(new Date(item.fecha)));
                      setModal(true);
                    }
                  }}
                />
              </View>

              <Text style={[styles.sectionTitle, { color: theme.text }]}>Historial completo</Text>
            </View>
          }
          data={history}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={[styles.listItem, { backgroundColor: theme.cardBg }]}>
              <View>
                <Text style={[styles.listTitle, { color: theme.text }]}>{item.Routine.nombre}</Text>
                <Text style={[styles.listDate, { color: theme.text }]}>{formatFechaES(new Date(item.fecha))}</Text>
              </View>
              <Boton
                name="Ver"
                onPress={() => {
                  setTituloModal(item.Routine.nombre);
                  setFechaModal(formatFechaES(new Date(item.fecha)));
                  setModal(true);
                }}
                viewStyle={[styles.listButton, { backgroundColor: theme.accent }]}
                textStyle={[styles.listButtonText, { color: theme.overlay }]}
              />
            </View>
          )}
        />

      </View>
    </View>
  );
}

const WORKOUTS = [
  { id: '2', titulo: 'Core', fecha: '2025-10-08' },
  { id: '3', titulo: 'Tren Superior', fecha: '2025-10-10' },
  { id: '4', titulo: 'Piernas', fecha: '2025-10-12' },
];

const COLORS = {
  orange: '#FF7A00',
  darkOverlay: 'rgba(0,0,0,0.55)',
  card: 'rgba(255,255,255,0.08)',
  border: 'rgba(255,255,255,0.15)',
  white: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.7)',
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.darkOverlay },
  container: {
    flex: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  calendar: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,

  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    alignSelf: 'center',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginVertical: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  listTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  listDate: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  listButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  listButtonText: {
    color: '#111',
    fontWeight: '800',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '90%',
    maxWidth: 380,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(30,30,30,0.9)', // reemplazo de BlurView
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  modalSubtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  modalButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 10,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  instructionCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(77, 182, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
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
  dayCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1b1d23',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2b2e36',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  assignedRoutine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  routineName: {
    fontSize: 14,
    color: '#43e97b',
    marginLeft: 6,
  },
  noRoutine: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  dayActions: {
    marginLeft: 12,
  },
  addButton: {
    padding: 4,
  },
  removeButton: {
    padding: 4,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#43e97b',
    padding: 18,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  routineList: {
    paddingHorizontal: 20,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  routineItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  routineItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  routineItemExercises: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});
