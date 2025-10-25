import { StyleSheet, Text, View, ImageBackground, Modal } from 'react-native';
import Boton from '../../components/Boton';
import { useRouter, Router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ModalAlerta from '../../components/ModalAlerta';
import THEMES from '../THEMES'
import { ContextoPerfil, ContextoTema } from '../_layout';


import api_url from "../API_URL"
const API_URL = api_url()


export default function PerfilScreen() {
  const router = useRouter();
  const contextoPerfil = useContext(ContextoPerfil);

  const [mail, setMail] = useState("...")
  const [nombre, setNombre] = useState("...")
  const [apellido, setApellido] = useState("...")
  const [edad, setEdad] = useState("...")
  const [dni, setDNI] = useState<BigInt>(BigInt(-1))
  const [telefono, setTelefono] = useState("...")
  const [modal, setModal] = useState(false)

  const contextoTema = useContext(ContextoTema)
  const mode = contextoTema?.themeContext.theme
  const theme = THEMES()[mode != undefined ? mode : 'light'];


  const handleSession = (async () => {
    const response = await fetch(`${API_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: contextoPerfil?.userContext.id
      })
    });

    const data = (await response.json()).data;

    if (response.ok) {
      setNombre(data.nombre)
      setApellido(data.apellido)
      setEdad(data.edad)
      setDNI(data.DNI)
      setTelefono(data.telefono)
      setMail(data.email)
    }
  })()



  return (
    <View style={[styles.container, { backgroundColor: theme.overlay, width: "100%" }]}>

      {/* Modal resumen */}

      <ModalAlerta
        visible={modal} setVisible={setModal}
        titulo={'🏋️ Estas por cerrar sesión'}
        subtitulo={'¿Seguro que deseas continuar?'}
        botonA='Mantener sesion' botonAOnPress={() => setModal(false)}
        botonB={'Cerrar sesion'} botonBOnPress={() => {
          setModal(false);
          contextoPerfil?.setUserContext({ id: 0 }) // (a ver si esto es suficiente)
          router.replace("../../"); // creo que es suficiente
        }}
      />

      <View style={[styles.overlay, { backgroundColor: theme.overlay }]} />

      {/* Tarjeta de perfil */}
      <View style={[styles.profileCard, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.name, { color: theme.text }]}>{nombre + " " + apellido}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Cliente</Text>

        {/* Datos personales */}
        <View style={[styles.infoSection, { borderColor: theme.border }]}>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={22} color={theme.accent} />
            <Text style={[styles.infoText, { color: theme.text }]}>{mail}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={22} color={theme.accent} />
            <Text style={[styles.infoText, { color: theme.text }]}>{edad} años</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={22} color={theme.accent} />
            <Text style={[styles.infoText, { color: theme.text }]}>{telefono}</Text>
          </View>
        </View>
      </View>

      {/* Botón de logout */}
      <View style={styles.buttonWrap}>
        <Boton
          name="Cerrar Sesión"
          viewStyle={[styles.logoutButton, { backgroundColor: theme.warning }]}
          textStyle={[styles.logoutText, { color: theme.text }]}
          onPress={() => setModal(true)}
        />
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const COLORS = {
  overlay: 'rgba(0,0,0,0.55)',
  card: 'rgba(255,255,255,0.12)',
  white: '#fff',
  border: 'rgba(255,255,255,0.2)',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.75)',
  accent: '#FFB46B',
  shadow: 'rgba(0,0,0,0.5)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  profileCard: {
    width: '88%',
    backgroundColor: COLORS.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    paddingVertical: 40,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  name: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginBottom: 20,
  },
  infoSection: {
    width: '85%',
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingTop: 20,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    color: COLORS.text,
    fontSize: 16,
  },
  buttonWrap: {
    width: '85%',
    marginTop: 40,
  },
  logoutButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  logoutText: {
    color: '#111',
    fontWeight: '800',
    fontSize: 16,
  },
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
    backgroundColor: 'rgba(30,30,30,0.9)',
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
    backgroundColor: COLORS.accent,
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
