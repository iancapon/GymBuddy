import { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ContextoPerfil, ContextoTema } from '../_layout';
import api_url from '../API_URL';
import Boton from '../../components/Boton';
import { StatusBar } from 'expo-status-bar';
import THEMES from '../THEMES'

const API_URL = api_url();

type Routine = {
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

export default function ProgramarScreen() {
  const contextoTema = useContext(ContextoTema)
  const mode = contextoTema?.themeContext.theme
  const theme = THEMES()[mode != undefined ? mode : 'light'];

  const router = useRouter();
  const contextoPerfil = useContext(ContextoPerfil);

  const userId = contextoPerfil?.userContext.id ? contextoPerfil?.userContext.id : 0

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loadingRoutines, setLoadingRoutines] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false)
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Store day assignments
  const [dayAssignments, setDayAssignments] = useState<DayAssignment[]>(
    DAYS_OF_WEEK.map(day => ({
      dayName: day.name,
      dayIndex: day.index,
      routineId: null,
      routineName: null,
    }))
  );

  // Seleccionador de dia para implementar una rutina
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

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
    setLoadingSchedule(true)
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
      const loaded = dayAssignments.map(day => {
        const match = programa.find((dia: { dayIndex: number; }) => dia.dayIndex === day.dayIndex)
        return match
          ? {
            ...day,
            routineId: match.Routine.id,
            routineName: match.Routine.nombre
          } : day
      })
      setDayAssignments(loaded);
    }
    catch (error: any) {
      console.error("❌ fetch assingned days error:", error.message);
      throw new Error(error.message || "Error de conexión con el servidor");
    } finally {
      setLoadingSchedule(false)
    }
  }

  useEffect(() => {
    fetchUserRoutines()
    fetchAlreadyAssignedDays()
  }, [userId]);


  // Asigno rutina a un dia
  const assignRoutineToDay = (routineId: number, routineName: string) => {
    if (selectedDayIndex === null) return;

    setDayAssignments(prev =>
      prev.map(day =>
        day.dayIndex === selectedDayIndex
          ? { ...day, routineId, routineName }
          : day
      )
    );
    setSelectedDayIndex(null);
  };

  // borro rutina a un dia
  const removeRoutineFromDay = (dayIndex: number) => {
    setDayAssignments(prev =>
      prev.map(day =>
        day.dayIndex === dayIndex
          ? { ...day, routineId: null, routineName: null }
          : day
      )
    );
  };

  const saveSchedule = async () => {
    if (!userId) {
      Alert.alert('Error', 'Usuario no identificado');
      return;
    }

    const assignedDays = dayAssignments.filter(day => day.routineId !== null);

    const unassignedDays = dayAssignments.filter(day => day.routineId === null);

    try {
      setSavingSchedule(true);

      // Crea y borrar para cada dia
      for (const day of dayAssignments) {

        if (day.routineId != null) { // Si tiene una rutina asignada

          const response = await fetch(`${API_URL}/programar_workout/schedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              routineId: day.routineId,
              dayIndex: day.dayIndex
            }),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.message || 'Error al guardar');
          }
        }

        else {
          const response = await fetch(`${API_URL}/programar_workout/unschedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              dayIndex: day.dayIndex
            }),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.message || 'Error al guardar');
          }
        }
      }
      router.back()
      Alert.alert(
        '¡Éxito!',
        'Tu programación semanal ha sido guardada correctamente',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error saving schedule:', error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'No se pudo guardar la programación'
      );
    } finally {
      setSavingSchedule(false);
    }
  };

  return (

    <View style={[styles.container, { backgroundColor: theme.overlay }]}>
      <StatusBar style={mode == "light" ? "dark" : "light"} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.header }]}>
        <Boton
          onPress={() => router.back()}
          viewStyle={[styles.backButton, { backgroundColor: theme.header }]}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Boton>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Programar Semana</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Ionicons name="information-circle-outline" size={24} color="#4DB6FF" />
          <Text style={[styles.instructionText, { color: theme.textMuted }]}>
            Toca un día para asignarle una rutina. Luego guarda tu programación.
          </Text>
        </View>

        {/* Days List */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Días de la Semana</Text>
        {dayAssignments.map((day) => (
          <View key={day.dayIndex} style={[styles.dayCard, { backgroundColor: theme.overlay, borderColor: theme.border }]}>
            <View style={[styles.dayInfo, { backgroundColor: theme.overlay }]}>
              <Text style={[styles.dayName, { color: theme.text }]}>{day.dayName}</Text>
              {day.routineName ? (
                <View style={styles.assignedRoutine}>
                  <Ionicons name="barbell" size={16} color="#43e97b" />
                  <Text style={styles.routineName}>{day.routineName}</Text>
                </View>
              ) : (
                <Text style={styles.noRoutine}>Sin rutina asignada</Text>
              )}
            </View>

            <View style={styles.dayActions}>
              {day.routineId ? (
                <TouchableOpacity
                  onPress={() => removeRoutineFromDay(day.dayIndex)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={28} color="#ff6b6b" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setSelectedDayIndex(day.dayIndex)}
                  style={styles.addButton}
                >
                  <Ionicons name="add-circle" size={28} color="#4DB6FF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
        <View style={{ paddingBottom: 20 }}></View>
      </ScrollView>

      {/* Save Button */}
      <Boton
        viewStyle={[
          styles.saveButton,
          savingSchedule && styles.saveButtonDisabled,
          { marginTop: 0, marginBottom: 60, backgroundColor: theme.success }
        ]}
        onPress={() => {
          if (!savingSchedule) {
            saveSchedule()
          }
        }}
      >
        {savingSchedule ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
            <Text style={styles.saveButtonText}>Guardar Programación</Text>
          </>
        )}
      </Boton>

      {/* Modal de seleccion de rutina */}
      {selectedDayIndex !== null && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Selecciona una rutina para{' '}
                {dayAssignments.find(d => d.dayIndex === selectedDayIndex)?.dayName}
              </Text>
              <TouchableOpacity onPress={() => setSelectedDayIndex(null)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.routineList}>
              {loadingRoutines ? (
                <ActivityIndicator size="large" color="#4DB6FF" style={{ marginTop: 20 }} />
              ) : routines.length === 0 ? (
                <Text style={styles.emptyText}>
                  No tienes rutinas creadas. Crea una primero.
                </Text>
              ) : (
                routines.map((routine) => (
                  <TouchableOpacity
                    key={routine.id}
                    style={styles.routineItem}
                    onPress={() => assignRoutineToDay(routine.id, routine.nombre)}
                  >
                    <Ionicons name="barbell-outline" size={24} color="#4DB6FF" />
                    <View style={styles.routineItemInfo}>
                      <Text style={styles.routineItemName}>{routine.nombre}</Text>
                      <Text style={styles.routineItemExercises}>
                        {routine.exercises.length} ejercicio{routine.exercises.length > 1 ? 's' : ''}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1115',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    marginRight: 12,
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