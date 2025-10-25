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
import { ContextoPerfil } from '../_layout';
import api_url from '../API_URL';

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
  const router = useRouter();
  const contextoPerfil = useContext(ContextoPerfil);

  const [userId, setUserId] = useState<number | null>(null);
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

  // fetch para el user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await fetch(`${API_URL}/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: contextoPerfil?.userContext.id
          }),
        });

        const userdata = await userResponse.json();
        if (userResponse.ok) {
          const id = 1//userdata.data.id;
          setUserId(id);

        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // fetch para las rutinas de un determinado usuario
  useEffect(() => {
    const fetchUserRoutines = async () => {
      if (!userId) return;

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



    fetchUserRoutines();
  }, [userId]);

  // fetch para las rutinas asignadas del usuario
  useEffect(() => {

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

        const programa = datos.assigned

        const loaded = dayAssignments.map(day => {
          const match = programa.find(dia => dia.dayIndex === day.dayIndex)
          return match
            ? {
              ...day,
              routineId: match.Routine.id,
              routineName: match.Routine.nombre
            } : day
        })

        setDayAssignments(loaded);
        setLoadingSchedule(false)
      }
      catch (error) { }
    }
    fetchAlreadyAssignedDays()

  }, [userId, routines,])

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

    //Alert.alert("asignados "+assignedDays)
    //Alert.alert("no asignados "+unassignedDays)

    try {
      setSavingSchedule(true);

      // Crea y borrar para cada dia
      for (const day of dayAssignments) {

        if (day.routineId != null) { // Si tiene una rutina asignada
          /*console.log('Sending schedule request:', {
            userId,
            routineId: day.routineId,
            dia: day.dayIndex
          });*/

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

        else { // si no tiene una rutina asignada
          /*console.log('Sending unschedule request:', {
            userId,
            dia: day.dayIndex
          });*/

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

      Alert.alert(
        '¡Éxito!',
        'Tu programación semanal ha sido guardada correctamente',
        [{ text: 'OK', onPress: () => router.back() }]
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Programar Semana</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Ionicons name="information-circle-outline" size={24} color="#4DB6FF" />
          <Text style={styles.instructionText}>
            Toca un día para asignarle una rutina. Luego guarda tu programación.
          </Text>
        </View>

        {/* Days List */}
        <Text style={styles.sectionTitle}>Días de la Semana</Text>
        {dayAssignments.map((day) => (
          <View key={day.dayIndex} style={styles.dayCard}>
            <View style={styles.dayInfo}>
              <Text style={styles.dayName}>{day.dayName}</Text>
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

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            savingSchedule && styles.saveButtonDisabled,
          ]}
          onPress={saveSchedule}
          disabled={savingSchedule}
        >
          {savingSchedule ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.saveButtonText}>Guardar Programación</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

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
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1b1d23',
  },
  backButton: {
    padding: 8,
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