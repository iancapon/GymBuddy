import { StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, ImageBackground } from 'react-native';
import Boton from '../../components/Boton';
//import {Calendar} from "react-native-calendars"

export default function Calendario() {
    return (
        <View style={[{flex:1}]}>
            <ImageBackground
                source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
            />
            <Text style={[styles.subtitulo, styles.negro]}>
                Calendario de workouts...
            </Text>
            <Text style={[styles.subtitulo, styles.negro]}>
                Acá podes programar workouts en la semana
            </Text>
        </View>
    )
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