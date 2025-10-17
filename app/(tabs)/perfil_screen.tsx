import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Boton from '../../components/Boton';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { ContextoPerfil } from '../_layout';

type userInfo = {
    mail: string
    password: string
}

const API_URL = "http://192.168.0.5:4000/perfil";import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen() {
  const router = useRouter();

  // Datos del usuario (por ahora estáticos)
  /*
  const usuario = {
    nombre: 'Ian Capon',
    email: 'ian.capon@uca.edu.ar',
    edad: 22,
    telefono: '+54 11 6789-4321',
  };*/
    const contextoPerfil = useContext(ContextoPerfil);

    const mail = contextoPerfil?.userContext.mail
    const [nombre, setNombre] = useState("...")
    const [apellido, setApellido] = useState("...")
    const [edad, setEdad] = useState("...")
    const [dni, setDNI] = useState<BigInt>(BigInt(-1))
    const [telefono, setTelefono] = useState("...")

    const handleSession = (async () => {
        const response = await fetch(`${API_URL}/perfil`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail: contextoPerfil?.userContext.mail,
                password: contextoPerfil?.userContext.password
            })
        });

        const data = await response.json();

        setNombre(data.data.nombre)
        setApellido(data.data.apellido)
        setEdad(data.data.edad)
        setDNI(data.data.DNI)
        setTelefono(data.data.telefono)

    })()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww',
        }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      {/* Tarjeta de perfil */}
      <View style={styles.profileCard}>
        <Text style={styles.name}>{nombre + " " + apellido}</Text>
        <Text style={styles.subtitle}>Cliente</Text>

        {/* Datos personales */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={22} color={COLORS.accent} />
            <Text style={styles.infoText}>{mail}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={22} color={COLORS.accent} />
            <Text style={styles.infoText}>{edad} años</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={22} color={COLORS.accent} />
            <Text style={styles.infoText}>{telefono}</Text>
          </View>
        </View>
      </View>

      {/* Botón de logout */}
      <View style={styles.buttonWrap}>
        <Boton
          name="Cerrar Sesión"
          viewStyle={styles.logoutButton}
          textStyle={styles.logoutText}
          onPress={() => router.push('../index')}
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const COLORS = {
  overlay: 'rgba(0,0,0,0.55)',
  card: 'rgba(255,255,255,0.12)',
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
});
