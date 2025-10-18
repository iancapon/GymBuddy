import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ContextoPerfil } from '../_layout';

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

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop';

export default function CustomRoutineModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const contexto = useContext(ContextoPerfil);

  const routineId = params.routineId as string;
  const API_URL = contexto?.API_URL;

  const [routine, setRoutine] = useState<Routine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!routineId || !API_URL) {
      Alert.alert('Error', 'Rutina no encontrada');
      router.back();
      return;
    }

    fetchRoutineDetails();
  }, [routineId, API_URL]);

  const fetchRoutineDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/crearEj/routine/${routineId}/exercises`, {
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

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text style={styles.loadingText}>Cargando rutina...</Text>
      </View>
    );
  }

  if (!routine) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>No se pudo cargar la rutina</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{routine.nombre}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Exercises List */}
      <FlatList
        data={routine.exercises}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseCard}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>

            <Image
              source={{ uri: item.media || PLACEHOLDER_IMG }}
              style={styles.exerciseImage}
            />

            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseTitle} numberOfLines={2}>
                {item.titulo}
              </Text>
              <Text style={styles.exerciseDetail}>{item.info1}</Text>
              <Text style={styles.exerciseDetail}>{item.info2}</Text>
            </View>

            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play-circle" size={32} color="#FF7A00" />
            </TouchableOpacity>
          </View>
        )}
      />
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
    backgroundColor: '#1b1d23',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2b2e36',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  listContent: {
    padding: 12,
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
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#1b1d23',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2b2e36',
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDetail: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 2,
  },
  playButton: {
    padding: 8,
  },
});