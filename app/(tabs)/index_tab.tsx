import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, ImageBackground } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from '../../components/Boton';
import Tarjeta from '../../components/Tarjeta';
import Slides from '../../components/Slides';
import { useRouter } from "expo-router"
import { Ionicons } from '@expo/vector-icons';


export default function SelectWorkout() {
    const router = useRouter()
    const fechaDeHoy = new Date().toISOString().split("T")[0]
    const noImplementado = () => {
        Alert.alert("No implementado", "esto aún no ha sido implementado")
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
            />
            <View style={[StyleSheet.absoluteFillObject, { flex: 1, backgroundColor: "#855c5c5e" }]}>

                <Boton
                    onPress={() => {
                        router.push("../(modals)/workout_screen")
                    }}
                    viewStyle={[styles.tarjeta, { width: "96%", height: 200, backgroundColor: "powderblue" }]}
                    textStyle={[styles.titulo, styles.blanco]} >
                    <Text style={[styles.titulo, styles.negro]}>para hoy</Text>
                    <Text style={[styles.subtitulo, styles.negro]}>{fechaDeHoy}</Text>
                    <Ionicons name="barbell" size={50} />
                </Boton>

                <View style={[{ flexDirection: "row", height: 160, paddingBottom: 20 }]}>
                    <Boton
                        onPress={noImplementado}
                        viewStyle={[styles.tarjeta, { flex: 1, height: "100%", backgroundColor: "lightgreen" }]}
                        textStyle={[styles.subtitulo, styles.blanco]} >
                        <Text style={[styles.subtitulo, styles.negro]}>crear</Text>
                        <Ionicons name="create" size={50} />
                    </Boton>

                    <Boton
                        onPress={() => router.push("../(modals)/historial_screen")}
                        viewStyle={[styles.tarjeta, { flex: 1, height: "100%", backgroundColor: "orange" }]}
                    >
                        <Text style={[styles.subtitulo, styles.negro]}>historial</Text>
                        <Ionicons name="book" size={50} />
                    </Boton>

                </View>

                <Text style={[styles.subtitulo, styles.blanco]}>Workouts creados</Text>

                <FlatList
                    horizontal
                    data={WORKOUTS}
                    keyExtractor={item => item.id}
                    style={[styles.list, {}]}
                    contentContainerStyle={{ justifyContent: "flex-start", alignItems: "flex-start" }}
                    renderItem={({ item }) => (
                        <Boton
                            onPress={noImplementado}// acá con la opcion del item.workout_id
                            viewStyle={[styles.tarjeta, { width: 300, height: "90%", backgroundColor: '#00b7ffff' }]}
                            textStyle={[styles.titulo, styles.negro]} >
                            <Text style={[styles.titulo]}>{item.titulo}</Text>
                            <Ionicons name="barbell" size={50} />
                        </Boton>
                    )}
                />
                <StatusBar style="auto" />
            </View>
        </View>
    );
}


const WORKOUTS = [
    {
        id: '2',
        titulo: 'core',
        workout_id: "chjbksc",
    },
    {
        id: '3',
        titulo: 'tren superior',
        workout_id: "chjbksc",
    },
    {
        id: '4',
        titulo: 'core',
        workout_id: "chjbksc",
    },
    {
        id: '5',
        titulo: 'tren inferior',
        workout_id: "chjbksc",
    },
    {
        id: '6',
        titulo: 'custom 1',
        workout_id: "chjbksc",
    },
    {
        id: '7',
        titulo: 'custom 2',
        workout_id: "chjbksc",
    },
    {
        id: '8',
        titulo: 'custom 3',
        workout_id: "chjbksc",
    },
    {
        id: '9',
        titulo: 'custom 4',
        workout_id: "chjbksc",
    },
]




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    list: {
        flex: 1,
    },
    tarjeta: {
        padding: 10,
        margin: 10,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderRadius: 10,
    },
    amarillo: {
        color: 'rgba(201, 245, 6, 1)'
    },
    negro: {
        color: 'rgba(0, 0, 0, 1)'
    },
    celeste: {
        color: '#00b7ffff'
    },
    blanco: {
        color: 'rgba(255, 255, 255, 1)'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 40,
    },
    subtitulo: {
        fontWeight: 'bold',
        fontSize: 30
    },
    grande: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
