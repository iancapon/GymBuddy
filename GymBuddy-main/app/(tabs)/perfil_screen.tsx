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
            <View style={[{ flex: 2, marginTop: 20, padding: 20, borderRadius:10 ,alignSelf: "center", width: "90%", backgroundColor: "#f7f7f7de" }]}>
                <Text style={[styles.titulo, styles.celeste, {}]}>Ian Capon</Text>
            </View>
            <View style={[styles.verticalContainer, { backgroundColor: "transparent" }]}>
                <Boton name="Cerrar Sesión" viewStyle={styles.button} textStyle={[styles.medio]} onPress={() => router.push("..//index")} />
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
        width: "90%",
        maxHeight: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flex: 1,
    },
    verticalContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",

        justifyContent: "space-around",

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
    negro: {
        color: "black"
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