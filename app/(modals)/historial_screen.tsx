import { StyleSheet, Modal, Text, View, FlatList, ImageBackground } from 'react-native';
import Boton from '../../components/Boton';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

type resumenProps = {
  visible: boolean;
  setVisible: (v: boolean) => void;
  titulo: string;
  fecha: string;
};

function WorkoutResumidoModal(props: resumenProps) {
  return (
    <Modal animationType="fade" transparent visible={props.visible} onRequestClose={() => props.setVisible(false)}>
      <View style={styles.modalOverlay}>
        {/* Fondo oscuro sin blur */}
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>🏋️‍♂️ Workout del {props.fecha}</Text>
          <Text style={styles.modalSubtitle}>{props.titulo}</Text>
          <Boton
            name="Cerrar"
            viewStyle={styles.modalButton}
            textStyle={styles.modalButtonText}
            onPress={() => props.setVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

export default function Historial() {
  const fechasMarcadas = WORKOUTS.reduce((fechas: any, programa: any) => {
    fechas[programa.fecha] = { selected: true, selectedColor: '#FF7A00' };
    return fechas;
  }, {});

  const [modal, setModal] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [fechaModal, setFechaModal] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww',
        }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      <WorkoutResumidoModal visible={modal} setVisible={setModal} titulo={tituloModal} fecha={fechaModal} />

      <View style={styles.container}>
        <Text style={styles.title}>📅 Calendario de Workouts</Text>

        <Calendar
          style={styles.calendar}
          markedDates={fechasMarcadas}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            dayTextColor: '#fff',
            monthTextColor: '#fff',
            textDisabledColor: 'rgba(255,255,255,0.4)',
            todayTextColor: '#FFB46B',
            arrowColor: '#fff',
            textSectionTitleColor: '#FFB46B',
            selectedDayBackgroundColor: '#FF7A00',
            selectedDayTextColor: '#111',
          }}
          onDayPress={(dia) => {
            const item = WORKOUTS.find((programa) => programa.fecha === dia.dateString);
            if (item) {
              setTituloModal(item.titulo);
              setFechaModal(item.fecha);
              setModal(true);
            }
          }}
        />

        <Text style={styles.sectionTitle}>Historial completo</Text>

        <FlatList
          data={WORKOUTS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View>
                <Text style={styles.listTitle}>{item.titulo}</Text>
                <Text style={styles.listDate}>{item.fecha}</Text>
              </View>
              <Boton
                name="Ver"
                onPress={() => {
                  setTituloModal(item.titulo);
                  setFechaModal(item.fecha);
                  setModal(true);
                }}
                viewStyle={styles.listButton}
                textStyle={styles.listButtonText}
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
    paddingTop: 60,
    paddingHorizontal: 20,
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
});
