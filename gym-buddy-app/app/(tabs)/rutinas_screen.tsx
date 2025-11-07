import { useState, useEffect, useContext, use } from 'react';
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
import { useAuth } from '../_layout';
import Boton from '../../components/Boton';
import { StatusBar } from 'expo-status-bar';
import Header from '../../components/Header';

import useTheme from '../../hooks/useTheme';

import { API_URL } from '../../constants/API_URL';

type Routine = {
  userId: number;
  id: number;
  nombre: string;
  exercises: Array<any>;
};

export default function ProgramarScreen() {
  const { theme } = useTheme()

  const router = useRouter();
  const { user, token, setUser, setToken, login, logout } = useAuth()

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loadingRoutines, setLoadingRoutines] = useState(false);


  const fetchUserRoutines = async () => {
    if (!user) return;

    try {
      setLoadingRoutines(true);
      const response = await fetch(`${API_URL}/workout/routines`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
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


  useEffect(() => {
    fetchUserRoutines()
  }, [user]);


  return (

    <View style={[styles.container, { backgroundColor: theme.overlay }]}>

      {/* Header */}
      <Header theme={theme} backButton={true} >
        <Text style={[{ color: theme.text, backgroundColor: theme.header }]}>Rutinas</Text>
      </Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Create Button */}
        <Boton
          viewStyle={[
            styles.saveButton,
            styles.saveButtonDisabled,
            { backgroundColor: theme.success, opacity: 0.9 }
          ]}
          onPress={() => { }}
        >
          <Ionicons name="create-outline" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>Crear una nueva rutina</Text>
        </Boton>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Todas las rutinas</Text>

        {/* Instructions */}
        <View style={styles.instructionCard}>
          <Ionicons name="information-circle-outline" size={24} color="#4DB6FF" />
          <Text style={[styles.instructionText, { color: theme.textMuted }]}>
            Estas son tus rutinas.
            Tocá para abrirlas, editarlas o eliminarlas.
          </Text>
        </View>

        {/* -- Rutinas creadas -- */}
        {routines.map((routine) => (
          <TouchableOpacity
            key={routine.id}
            onPress={() => router.push({
              pathname: '../(modals)/workout_screen',
              params: { userId: user?.id?.toString(), routineId: routine.id, nombre: routine.nombre }
            })}
          >
            <View style={[styles.dayCard, { backgroundColor: theme.overlay, borderColor: theme.border }]}>
              <View style={[styles.dayInfo, { backgroundColor: theme.overlay }]}>
                <Text style={[styles.dayName, { color: theme.text }]}>{routine.nombre}</Text>
                {true ? (
                  <View style={styles.assignedRoutine}>
                    <Ionicons name="barbell" size={16} color="#43e97b" />
                    <Text style={styles.routineName}>{'algo'}</Text>
                  </View>
                ) : (
                  <Text style={styles.noRoutine}>{'algo más'}</Text>
                )}
              </View>

              <View style={styles.dayActions}>
                <View
                  style={styles.dayCard}
                >
                  <Ionicons name="pencil-outline" size={25} color="#6bbcffff" />
                </View>
              </View>

              <View style={styles.dayActions}>
                <View
                  style={styles.dayCard}
                >
                  <Ionicons name="trash-outline" size={25} color="#ff6b6b" />
                </View>
              </View>

            </View>

          </TouchableOpacity>
        ))}
        <View style={{ paddingVertical: 60 }}></View>
      </ScrollView>
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