import { Image, Alert, Button, ScrollView, StyleSheet, StyleProp, TextStyle, Text, View, } from "react-native"
import { TextInput, FlatList, ImageBackground, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState, ReactNode, } from "react";
import { useRouter } from "expo-router"
import Boton from "../../components/Boton";
import { StatusBar } from "expo-status-bar";
import Tarjeta from '../../components/Tarjeta';


type ejercicio = {
    id: string
    titulo: string
    media: string
    info1: string
    info2: string
}

type NuevaTarjetaProp = {
    ejercicios: Array<ejercicio>
    setEjercicios: any
    visible: boolean
    setVisible: any
}


function NuevaTarjeta(props: NuevaTarjetaProp) {
    const [titulo, setTitulo] = useState("")
    const [media, setMedia] = useState("https://static.wikia.nocookie.net/gatopedia/images/2/2e/El_gatoo.png/revision/latest?cb=20230103150310&path-prefix=es")
    const [info1, setInfo1] = useState("")
    const [info2, setInfo2] = useState("")

    return (
        <View
            style={[StyleSheet.absoluteFillObject, {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#94949444"
            }]}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.visible}
                onRequestClose={() => props.setVisible(false)}
                style={{ flex: 1 }}
            >
                <View style={[{ alignSelf: "center", top: 150, padding: 10, borderRadius: 10, backgroundColor: "#ffecc4ef", width: "90%", height: "70%", justifyContent: "center", alignItems: "center" }]}>
                    <Tarjeta
                        viewStyle={[styles.tarjeta, { width: 150, height: 250, }]}
                        pressedOptions={[{ opacity: 1 }]}
                    >
                        <View style={[{ flex: 2, borderWidth: 0, margin: 5 }]}>
                            <Text style={[styles.negro, styles.grande, {}]}>{titulo}</Text>
                        </View>
                        <View style={[{ flex: 4, borderWidth: 1, margin: 5, width: "90%", height: "100%" }]}>
                            <Image
                                source={{ uri: media }}
                                style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
                            />
                        </View>
                        <View style={[{ flex: 1, borderWidth: 0, margin: 5 }]}>
                            <Text style={[styles.negro, {}]}>{info1}</Text>
                        </View>
                        <View style={[{ flex: 2, borderWidth: 0, margin: 5 }]}>
                            <Text style={[styles.negro, {}]}>{info2}</Text>
                        </View>

                    </Tarjeta>

                    <TextInput
                        style={styles.input}
                        placeholder="Ejercicio"
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="www.abc.com"
                        value={media}
                        onChangeText={setMedia}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="info1"
                        value={info1}
                        onChangeText={setInfo1}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="info2"
                        value={info2}
                        onChangeText={setInfo2}
                    />

                    <Boton
                        name="guardar"
                        viewStyle={{ width: 70 }}
                        onPress={() => {
                            const arregloAnterior = [...props.ejercicios]
                            props.setEjercicios([...arregloAnterior, { id: (arregloAnterior.length + 1).toString(), titulo: titulo, media: media, info1: info1, info2: info2 }])
                            props.setVisible(false)
                            setTitulo("")
                            setMedia("")
                            setInfo1("")
                            setInfo2("")
                        }} />
                </View>
            </Modal>
        </View>
    )
}


export default function CrearScreen() {
    const router = useRouter()
    const [titulo, setTitulo] = useState("")
    const workoutId = "random1234"
    const [ejercicios, setEjercicios] = useState(Array<ejercicio>)
    const [nuevaTarjetaVisible, setNuevaTarjetaVisible] = useState(false)

    return (
        <ImageBackground
            source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"

        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { ...StyleSheet.absoluteFillObject, backgroundColor: "#72727273", flex: 1 }]}>
                    <NuevaTarjeta
                        ejercicios={ejercicios}
                        setEjercicios={setEjercicios}
                        visible={nuevaTarjetaVisible}
                        setVisible={setNuevaTarjetaVisible}
                    />

                    <View style={{ flex: 2 }}>
                        <TextInput
                            style={styles.modal}
                            placeholder="titulo"
                            value={titulo}
                            onChangeText={setTitulo}
                            autoCorrect={false}
                            autoFocus={false}
                        />
                    </View>

                    <View style={{ flex: 10, backgroundColor: "transparent" }}>
                        <FlatList
                            horizontal
                            data={ejercicios}
                            keyExtractor={item => item.id}
                            style={[{}]}
                            contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
                            renderItem={({ item }) => (
                                <Tarjeta
                                    viewStyle={[styles.tarjeta, { width: 300, height: 500, }]}
                                    pressedOptions={[{ opacity: 0.9 }]}
                                >
                                    <View style={[{ flex: 2, borderWidth: 0, margin: 10 }]}>
                                        <Text style={[styles.negro, styles.subtitulo, {}]}>{item.titulo}</Text>
                                    </View>
                                    <View style={[{ flex: 4, borderWidth: 1, margin: 10, width: "90%", height: "100%" }]}>
                                        <Image
                                            source={{ uri: item.media }}
                                            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
                                        />
                                    </View>
                                    <View style={[{ flex: 1, borderWidth: 0, margin: 10 }]}>
                                        <Text style={[styles.negro, styles.grande, {}]}>{item.info1}</Text>
                                    </View>
                                    <View style={[{ flex: 2, borderWidth: 0, margin: 10 }]}>
                                        <Text style={[styles.negro, styles.grande, {}]}>{item.info2}</Text>
                                    </View>

                                </Tarjeta>
                            )}
                        />
                    </View>

                    <View style={[styles.container, { flex: 2, borderWidth: 0, flexDirection: 'row', backgroundColor: "transparent" }]}>

                        <Boton name="NUEVO EJERCICIO"
                            onPress={() => setNuevaTarjetaVisible(true)}
                            viewStyle={[styles.tarjeta, { width: '40%', height: '70%', backgroundColor: "orange" }]}
                            textStyle={[styles.grande, styles.negro]} />

                        <Boton name="GUARDAR"
                            onPress={() => {
                                Alert.alert("Muy Bien!!!", "Se ha guardado correctamente!")
                                router.back()
                            }}
                            viewStyle={[styles.tarjeta, { width: '40%', height: '70%', backgroundColor: "orange" }]}
                            textStyle={[styles.grande, styles.negro]} />

                    </View>

                    <View style={[{ flex: 1 }]}></View>

                </View>

            </TouchableWithoutFeedback>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}




const styles = StyleSheet.create({
    modal: {
        borderRadius: 5,
        marginVertical: 20,
        width: 300,
        height: 70,
        fontSize: 30,
        textAlign: "center",
        backgroundColor: "#ffffffb0"
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tarjeta: {
        padding: 10,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "powderblue",//'#00b7ffff',
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
