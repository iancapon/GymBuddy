import { StyleSheet, Modal, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, ImageBackground, Alert } from 'react-native';
import Boton from '../../components/Boton';
import { Calendar } from "react-native-calendars"
import { useState } from 'react';


type resumenProps = {
    visible: any
    setVisible: any
    titulo: string
    fecha: string
}

function WorkoutResumidoModal(props: resumenProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.setVisible(false)}
        >
            <View
                style={[StyleSheet.absoluteFillObject, {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#9494947c"
                }]}>
                <View style={styles.ventanaModal}>
                    <Text style={[styles.grande, styles.negro, { alignSelf: "center" }]}>
                        Workout para el: {props.fecha}
                    </Text>
                    <Text style={[styles.subtitulo, styles.negro, { alignSelf: "center" }]}>
                        {props.titulo}
                    </Text>
                    <Boton name="cerrar" viewStyle={{}} onPress={() => props.setVisible(false)}></Boton>
                </View>
            </View>
        </Modal>
    )
}

export default function Calendario() {
    const hoy = new Date().toISOString().split("T")[0]
    const fechasMarcadas = WORKOUTS.reduce((fechas: any, programa: any) => {
        fechas[programa.fecha] = {
            selected: true,
            selectedColor: '#008cffff'
        }
        return fechas
    }, {})
    fechasMarcadas[hoy] = { selected: true, selectedColor: '#ffd000ff' }
    const [modal, setModal] = useState(false)
    const [tituloModal, setTituloModal] = useState("")
    const [fechaModal, setFechaModal] = useState(hoy)

    return (
        <View style={[{ flex: 1 }]}>
            <ImageBackground
                source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
            />
            <View style={[StyleSheet.absoluteFillObject, { flex: 1, backgroundColor: "#855c5c5e" }]}>
                <WorkoutResumidoModal
                    visible={modal}
                    setVisible={setModal}
                    titulo={tituloModal}
                    fecha={fechaModal}
                />
                <Calendar
                    style={[styles.calendario, {}]}
                    markedDates={fechasMarcadas}
                    current={hoy}
                    onDayLongPress={(dia) =>{
                        Alert.alert("Programar para este dia ==>","aún no está implementado" )
                    }}
                    onDayPress={(dia) => {
                        const item = WORKOUTS.find(programa => programa.fecha == dia.dateString)
                        if (item != undefined) {
                            setTituloModal(item.titulo)
                            setFechaModal(item.fecha)
                            setModal(true)
                        }
                        else if (dia.dateString == hoy) {
                            Alert.alert(`Fecha de hoy: ${hoy}\n`,
                                "No hay workouts programados para hoy"
                            )
                        }
                    }}
                />

                <Text style={[styles.subtitulo, styles.blanco, { alignSelf: "center" }]}>
                    Workouts programados
                </Text>

                <FlatList
                    data={WORKOUTS}
                    keyExtractor={item => item.id}
                    style={[styles.list, {}]}
                    contentContainerStyle={{}}
                    renderItem={({ item }) => (
                        <Boton
                            viewStyle={[styles.tarjeta, {}]}
                            onPress={() => {
                                setTituloModal(item.titulo)
                                setFechaModal(item.fecha)
                                setModal(true)
                            }}
                        >
                            <Text style={styles.medio}>{item.titulo}</Text>
                            <Text style={styles.medio}>{item.fecha}</Text>
                        </Boton>
                    )}
                />

            </View>
        </View>
    )
}

const WORKOUTS = [
    {
        id: '2',
        titulo: 'core',
        workout_id: "chjbksc",
        fecha: '2025-10-08'
    },
    {
        id: '3',
        titulo: 'tren superior',
        workout_id: "chjbksc",
        fecha: '2025-10-10'
    },
    {
        id: '4',
        titulo: 'core',
        workout_id: "chjbksc",
        fecha: '2025-10-12'
    },

]


const styles = StyleSheet.create({
    ventanaModal: {
        width: "95%",
        height: "30%",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly"

    },
    calendario: {
        margin: 20,
        borderRadius: 20,
        height: 370
    },
    tarjeta: {
        flex: 1,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        width: "90%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between"
    },
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
    },
    medio: {
        fontWeight: 'bold',
        fontSize: 16
    }
});