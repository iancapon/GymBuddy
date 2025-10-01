import { StyleSheet, ScrollView, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, ImageBackground } from 'react-native';
import Boton from '../../components/Boton';
import { useRouter } from "expo-router"
import { StatusBar } from 'expo-status-bar';


export default function PerfilScreen() {
    const router = useRouter()

    return (
        <View style={[styles.verticalContainer, { flex: 1 }]}>

            <ImageBackground
                source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
            />

            <Text style={[styles.titulo, { flex: 2 }]}>Ian Capon</Text>

            <Text style={[styles.medio, { flex: 1 }]}>fecha de admisión: 09/09/2025</Text>

            <Text style={[styles.medio, { flex: 1 }]}>plan: básico</Text>

            <View style={{ height: 400, flex: 6, borderWidth: 2, borderColor: "#26667F", justifyContent: "center", alignItems: "center" }}>

                <Text>Algo habria que poner acá</Text>

            </View>

            <View style={[styles.horizontalContainer, { flex: 2, backgroundColor: "transparent" }]}>

                <View style={{ flex: 1 }}>

                    <Boton name="volver atras" viewStyle={styles.button} textStyle={[styles.medio, styles.blanco]} onPress={() => router.back()} />

                </View>

                <View style={[styles.verticalContainer, { flex: 2, backgroundColor: "transparent" }]}>

                    <Boton name="ingresar datos" viewStyle={styles.button} textStyle={[styles.medio, styles.blanco]} onPress={() => router.push("/modal")} />

                    <Boton name="nuevo plan" viewStyle={styles.button} textStyle={[styles.medio, styles.blanco]} onPress={() => router.push("/modal")} />

                </View>

            </View>
            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 0,
        width: "96%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        alignSelf: "center",
        flex: 1,
        backgroundColor: "#00b7ffff"
    },
    verticalContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        padding: 2,
        //justifyContent:"space-between"
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: 'white',
        padding: 5,
    },
    blanco: {
        color: "white"
    },
    celeste: {
        color: "#00b7ffff"
    },
    titulo: {
        fontSize: 80,
        fontWeight: "bold",
    },
    subtitulo: {
        fontSize: 40,
        fontWeight: "bold",
    },
    grande: {
        fontSize: 30,
        fontWeight: "bold",
    },
    medio: {
        fontSize: 20,
        fontWeight: "bold",
    },

    chico: {
        fontSize: 10,
        fontWeight: "bold",
    }

})