import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mapea cada workout_id a su lista de ejercicios
const WORKOUT_SETS: Record<string, { id: string; titulo: string; info1: string; info2: string }[]> = {
  chjbksc: [
    { id: '1', titulo: 'Flexiones de brazo', info1: '10 x 5',           info2: 'Descanso 60s' },
    { id: '2', titulo: 'Plancha',            info1: '60s x 5',           info2: 'Descanso 60s' },
    { id: '3', titulo: 'Abdominales',        info1: '20 x 5',            info2: 'Descanso 60s' },
    { id: '4', titulo: 'Pecho',              info1: '10 x 5',            info2: 'Descanso 60s' },
  ],
};

export default function WorkoutScreen() {
  const { workout_id } = useLocalSearchParams<{ workout_id?: string }>();
  const data = useMemo(
    () => WORKOUT_SETS[workout_id ?? 'chjbksc'] ?? WORKOUT_SETS['chjbksc'],
    [workout_id]
  );

  const [index, setIndex] = useState(0);
  const item = data[index];

  const prev = () => setIndex(i => (i > 0 ? i - 1 : 0));
  const next = () => setIndex(i => (i < data.length - 1 ? i + 1 : i));

  return (
    <View style={styles.container}>
      <Text style={[styles.titulo, styles.celeste]}>
        Workout {workout_id || 'chjbksc'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.itemTitulo}>{item.titulo}</Text>
        <Text style={styles.itemInfo}>{item.info1}</Text>
        <Text style={styles.itemInfo}>{item.info2}</Text>
        <Text style={styles.contador}>~ {index + 1} / {data.length} ~</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={prev} style={[styles.btn, styles.btnPrev]}>
          <Text style={styles.btnText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={next} style={[styles.btn, styles.btnNext]}>
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 16 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  celeste: { color: '#00b7ff' },
  card: {
    width: '90%',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  itemTitulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  itemInfo: { fontSize: 16, marginBottom: 4 },
  contador: { marginTop: 8, fontWeight: '600', color: '#555' },
  row: { flexDirection: 'row', gap: 12 },
  btn: {
    paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10,
    backgroundColor: '#00b7ff', shadowColor: '#000', shadowOpacity: 0.15,
    shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 4,
  },
  btnPrev: { backgroundColor: '#00b7ff' },
  btnNext: { backgroundColor: '#00b7ff' },
  btnText: { color: '#fff', fontWeight: '700' },
});
