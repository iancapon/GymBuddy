import { StatusBar } from 'expo-status-bar';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from '../../components/Boton';
import Tarjeta from '../../components/Tarjeta';
import Slides from '../../components/Slides';
import { useRouter } from "expo-router"


const WORKOUTS = [
    {
        id: '1',
        titulo: 'para hoy..',
        workout_id: "chjbksc",
    },
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

export default function SelectWorkout() {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <FlatList
                data={WORKOUTS}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={{ justifyContent: "flex-start", alignItems: "flex-start" }}
                renderItem={({ item }) => (
                    <Boton name={item.titulo}
                        onPress={() => {
                            router.push("../(modals)/workout_screen")// acá con la opcion del item.workout_id
                        }}
                        viewStyle={[styles.tarjeta, { width: 300, height: 80 }]}
                        textStyle={[styles.titulo, styles.blanco]} />
                )}
            />
            <StatusBar style="auto" />
        </View>
    );
}



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
        backgroundColor: '#00b7ffff',
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
