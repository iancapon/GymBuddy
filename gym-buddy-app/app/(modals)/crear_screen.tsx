import { ActivityIndicator, Image, Alert, Keyboard, Platform, FlatList, ImageBackground, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, } from 'react-native';
import { useState, useMemo, useContext } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Boton from '../../components/Boton';
import Tarjeta from '../../components/Tarjeta';
import { ContextoPerfil } from '../_layout'

import api_url from "../API_URL"
const API_URL = api_url()



export default function CrearScreen() {
  const router = useRouter();

  const contexto = useContext(ContextoPerfil);

  const [titulo, setTitulo] = useState('');
  const [ejercicios, setEjercicios] = useState<ejercicio[]>([]);
  const [nuevaTarjetaVisible, setNuevaTarjetaVisible] = useState(false);
  const [savingRoutine, setSavingRoutine] = useState(false);


  const handleGuardarRutina = async () => {
    if (!titulo.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para la rutina');
      return;
    }

    if (ejercicios.length === 0) {
      Alert.alert('Error', 'Por favor agrega al menos un ejercicio');
      return;
    }

    setSavingRoutine(true);

    try {

      // 0. findUser
      const userResponse = await fetch(`${API_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: contexto?.userContext.id
      })
    });

      // para confirmar bien que encuentra el usuario
      const user_Id = (await userResponse.json()).data.id

      if (!userResponse.ok) {
        Alert.alert('Error', 'No se encontró el usuario');
        setSavingRoutine(false);
        return;
      }
      
      // 1. Create routine
      const routineResponse = await fetch(`${API_URL}/workout/routine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: titulo.trim(),
          userId: user_Id
        }),
      });

      const routineData = await routineResponse.json();

      if (!routineData.success) {
        Alert.alert('Error', routineData.error || 'No se pudo crear la rutina');
       // setSavingRoutine(false);
        return;
      }

      const routineId = routineData.routine.id;

      // 2. Create all exercises for this routine
      for (const ejercicio of ejercicios) {
        await fetch(`${API_URL}/workout/exercise`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            routineId,
            titulo: ejercicio.titulo,
            media: ejercicio.media,
            info1: ejercicio.info1,
            info2: ejercicio.info2,
          }),
        });
      }

      Alert.alert('Éxito', 'Rutina y ejercicios guardados correctamente');
      setTitulo('');
      setEjercicios([]);
      router.back();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      Alert.alert('Error de conexión', errorMsg);
      console.error('Error al guardar rutina:', error);
    } finally {
      setSavingRoutine(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww',
      }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="dark" />

          <NuevaTarjeta
            ejercicios={ejercicios}
            setEjercicios={setEjercicios}
            visible={nuevaTarjetaVisible}
            setVisible={setNuevaTarjetaVisible}
            API_URL={API_URL}
          />

          <View style={styles.header}>
            <Text style={styles.headerLabel}>Título de la rutina</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Ej.: Full Body A"
              placeholderTextColor="#666"
              value={titulo}
              onChangeText={setTitulo}
              autoCorrect={false}
              editable={!savingRoutine}
            />
          </View>

          <View style={styles.listWrap}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={ejercicios}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              ListEmptyComponent={
                <View style={styles.emptyWrap}>
                  <Text style={styles.emptyText}>
                    Aún no agregaste ejercicios. Toca "Nuevo ejercicio".
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <Tarjeta viewStyle={styles.exerciseCard} pressedOptions={[{ opacity: 0.95 }]}>
                  <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
                    <Text style={styles.exerciseTitle} numberOfLines={1}>
                      {item.titulo}
                    </Text>
                  </View>
                  <View style={styles.exerciseImageWrap}>
                    <Image
                      source={{ uri: item.media || PLACEHOLDER_IMG }}
                      style={styles.exerciseImage}
                    />
                  </View>
                  <View style={styles.exerciseInfoWrap}>
                    <Text style={styles.exerciseInfo} numberOfLines={1}>
                      {item.info1}
                    </Text>
                    <Text style={styles.exerciseInfo} numberOfLines={2}>
                      {item.info2}
                    </Text>
                  </View>
                </Tarjeta>
              )}
            />
          </View>

          <View style={styles.actionsRow}>
            <Boton
              name="Nuevo ejercicio"
              onPress={() => setNuevaTarjetaVisible(true)}
              viewStyle={[styles.primaryButton, { flex: 1, marginRight: 10, opacity: savingRoutine ? 0.6 : 1 }]}
              textStyle={styles.primaryButtonText}
            />
            <Boton
              name={savingRoutine ? 'Guardando...' : 'Guardar rutina'}
              onPress={handleGuardarRutina}
              viewStyle={[styles.secondaryButton, { flex: 1, marginLeft: 10, opacity: savingRoutine ? 0.6 : 1 }]}
              textStyle={styles.secondaryButtonText}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop';

type ejercicio = {
  id: string;
  titulo: string;
  media: string;
  info1: string;
  info2: string;
};

type NuevaTarjetaProp = {
  ejercicios: Array<ejercicio>;
  setEjercicios: (e: ejercicio[]) => void;
  visible: boolean;
  setVisible: (v: boolean) => void;
  API_URL: string;
};

function NuevaTarjeta(props: NuevaTarjetaProp) {
  const [titulo, setTitulo] = useState('');
  const [media, setMedia] = useState(PLACEHOLDER_IMG);
  const [info1, setInfo1] = useState('');
  const [info2, setInfo2] = useState('');
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => !titulo.trim(), [titulo]);

  const onGuardar = async () => {
    if (disabled || loading) return;
    setLoading(true);

    try {
      const nuevo: ejercicio = {
        id: (props.ejercicios.length + 1).toString(),
        titulo: titulo.trim(),
        media: media.trim() || PLACEHOLDER_IMG,
        info1: info1.trim(),
        info2: info2.trim(),
      };
      props.setEjercicios([...props.ejercicios, nuevo]);

      //Alert.alert('Éxito', 'Ejercicio agregado');

      setTitulo('');
      setMedia(PLACEHOLDER_IMG);
      setInfo1('');
      setInfo2('');
      props.setVisible(false);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      Alert.alert('Error', errorMsg);
      console.error('Error al agregar ejercicio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.visible}
      onRequestClose={() => props.setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalCard}
          >
            <View style={styles.modalBody}>
              <View style={styles.previewWrap}>
                <Tarjeta viewStyle={styles.previewCard} pressedOptions={[{ opacity: 1 }]}>
                  <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                    <Text style={styles.previewTitle} numberOfLines={1}>
                      {titulo || 'Nuevo ejercicio'}
                    </Text>
                  </View>
                  <View style={styles.previewImageWrap}>
                    <Image
                      source={{ uri: media || PLACEHOLDER_IMG }}
                      style={styles.previewImage}
                    />
                  </View>
                  <View style={styles.previewFooter}>
                    <Text style={styles.previewInfo} numberOfLines={1}>
                      {info1 || '–'}
                    </Text>
                    <Text style={styles.previewInfo} numberOfLines={2}>
                      {info2 || '–'}
                    </Text>
                  </View>
                </Tarjeta>
              </View>

              <View style={styles.formWrap}>

                <TextInput
                  style={styles.input}
                  placeholder="Ejercicio (título)"
                  placeholderTextColor="#666"
                  value={titulo}
                  onChangeText={setTitulo}
                  autoCorrect={false}
                  editable={!loading}
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL de imagen"
                  placeholderTextColor="#666"
                  value={media}
                  onChangeText={setMedia}
                  autoCorrect={false}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Info 1 (por ej. 10 x 5)"
                  placeholderTextColor="#666"
                  value={info1}
                  onChangeText={setInfo1}
                  editable={!loading}
                />
                <TextInput
                  style={[styles.input, { marginBottom: 0 }]}
                  placeholder="Info 2 (por ej. descanso 1 min)"
                  placeholderTextColor="#666"
                  value={info2}
                  onChangeText={setInfo2}
                  editable={!loading}
                />

                <View style={styles.modalActions}>
                  <Boton
                    name="Cancelar"
                    onPress={() => !loading && props.setVisible(false)}
                    viewStyle={[
                      styles.secondaryButton,
                      { marginRight: 10, opacity: loading ? 0.6 : 1 },
                    ]}
                    textStyle={styles.secondaryButtonText}
                  />
                  <Boton
                    name="Agregar"
                    onPress={onGuardar}
                    viewStyle={[
                      styles.primaryButton,
                      (disabled || loading) && { opacity: 0.6 },
                    ]}
                    textStyle={styles.primaryButtonText}
                  />
                </View>

              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
/* ===================== STYLES ===================== */

const PALETTE = {
  overlay: 'rgba(0,0,0,0.50)',
  card: 'rgba(255,255,255,0.08)',
  cardBorder: 'rgba(255,255,255,0.14)',
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.75)',
  inputBg: 'rgba(255,255,255,0.9)',
  inputBorder: 'rgba(0,0,0,0.08)',
  brand: '#FF7A00',
  brandDark: '#E36E00',
  shadow: 'rgba(0,0,0,0.45)',
};


const styles = StyleSheet.create({
  /* Layout base */
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: PALETTE.overlay },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 18,
  },

  /* Header / título de la rutina */
  header: {
    marginBottom: 18,
  },
  headerLabel: {
    color: PALETTE.textMuted,
    fontSize: 14,
    marginBottom: 6,
  },
  titleInput: {
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: PALETTE.inputBg,
    borderWidth: 1,
    borderColor: PALETTE.inputBorder,
    fontSize: 18,
  },

  /* Lista de ejercicios */
  listWrap: {
    flex: 1,
    marginBottom: 16,
  },
  emptyWrap: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: PALETTE.text,
    opacity: 0.85,
    textAlign: 'center',
  },

  /* Card de ejercicio */
  exerciseCard: {
    width: 300,
    height: 450,
    marginHorizontal: 8,
    backgroundColor: PALETTE.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: PALETTE.cardBorder,
    shadowColor: PALETTE.shadow,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    justifyContent: 'flex-start',
  },
  exerciseTitle: {
    color: PALETTE.text,
    fontWeight: '800',
    fontSize: 22,
  },
  exerciseImageWrap: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 12,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  exerciseInfoWrap: {
    padding: 12,
  },
  exerciseInfo: {
    color: PALETTE.textMuted,
    fontSize: 14,
    marginTop: 4,
  },

  /* Row de acciones */
  actionsRow: {
    flexDirection: 'row',
    marginBottom: 60,
  },

  /* Modal creación */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 900,
    backgroundColor: 'rgba(20,20,20,0.85)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    shadowColor: PALETTE.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
    overflow: 'hidden',
  },
  modalBody: {
    flexDirection: 'row',
    padding: 16,
    gap: 16 as any, // RN no soporta gap en todas las versiones; safe
    flexWrap: 'wrap',
  },
  previewWrap: {
    flexGrow: 1,
    minWidth: 280,
    maxHeight: 350
  },
  previewCard: {
    width: '100%',
    height: 420,
    backgroundColor: PALETTE.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PALETTE.cardBorder,
  },
  previewTitle: {
    color: PALETTE.text,
    fontWeight: '800',
    fontSize: 20,
  },
  previewImageWrap: {
    flex: 0.8,
    marginTop: 8,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewFooter: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  previewInfo: {
    color: PALETTE.textMuted,
    fontSize: 14,
    marginTop: 4,
  },

  formWrap: {
    flexGrow: 1,
    minWidth: 280,
    paddingHorizontal: 6,
  },
  input: {
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: PALETTE.inputBg,
    borderWidth: 1,
    borderColor: PALETTE.inputBorder,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'flex-end',
  },

  /* Botones */
  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: PALETTE.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PALETTE.shadow,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  primaryButtonText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
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
    color: PALETTE.text,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.4,
  },
});
