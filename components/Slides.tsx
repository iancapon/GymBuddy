import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, Animated } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from './Boton';
import Tarjeta from './Tarjeta';
import * as Speech from 'expo-speech'



type itemProps = {
    titulo: string
    media: string
    info1: string
    info2: string
    onPress?: () => void
}

function Item(props: itemProps) {
    return (
        <Tarjeta
            onPress={props.onPress}
            viewStyle={[styles.tarjeta, { width: 300, height: 500, }]}
            pressedOptions={[{ opacity: 0.9 }]}
        >
            <View style={[{ flex: 2, borderWidth: 0, margin: 10 }]}>
                <Text style={[styles.negro, styles.subtitulo, {}]}>{props.titulo}</Text>
            </View>
            <View style={[{ flex: 4, borderWidth: 1, margin: 10, width: "90%", height: "100%" }]}>
                <Image
                    source={{ uri: props.media }}
                    style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
                />
            </View>
            <View style={[{ flex: 1, borderWidth: 0, margin: 10 }]}>
                <Text style={[styles.negro, styles.grande, {}]}>{props.info1}</Text>
            </View>
            <View style={[{ flex: 2, borderWidth: 0, margin: 10 }]}>
                <Text style={[styles.negro, styles.grande, {}]}>{props.info2}</Text>
            </View>

        </Tarjeta>
    )
}

type myListProps = {
    data: Array<itemProps>
    currentIndex: number
    slider?: React.Dispatch<React.SetStateAction<number>>// no estoy seguro
    style?: StyleProp<ViewStyle>
}

export default function Slides(props: myListProps) {
    if (props.currentIndex < 0 || props.currentIndex >= props.data.length) {
        throw new Error('Workout current index outside of bounds')
    }

    const card = (index: number, action?: () => void) => <Item onPress={action} titulo={props.data[index].titulo} media={props.data[index].media} info1={props.data[index].info1} info2={props.data[index].info2} />

    const noCard = <Tarjeta viewStyle={[styles.tarjeta, { width: 300, height: 500, opacity: 0 }]} pressedOptions={[{ opacity: 0 }]} ></Tarjeta>

    const previous = props.currentIndex - 1 < 0 ? noCard : card(props.currentIndex - 1)
    const current = card(props.currentIndex)
    const next = props.currentIndex + 1 > props.data.length - 1 ? noCard : card(props.currentIndex + 1)

    const animation = new Animated.Value(0)

    const startAnimation = (() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    })()

    const goForwardAnimationStyleProp: StyleProp<ViewStyle> = {
        transform: [{
            translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [300, 0] })
        }]
    }

    const descripcionTTS = `${props.data[props.currentIndex].titulo}. ${props.data[props.currentIndex].info1}. ${props.data[props.currentIndex].info2}`
    
    Speech.speak(descripcionTTS, {
        language: "es-SP",
        pitch: 1.0,
        rate: 1.1
    })


    return (
        <Animated.View style={[styles.container, goForwardAnimationStyleProp, { borderWidth: 0, flexDirection: 'row' }, props.style]}>
            {previous}
            {current}
            {next}
        </Animated.View>

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
    tarjeta: {
        padding: 10,
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'powderblue',
        borderRadius: 10,
    },
    amarillo: {
        color: 'rgba(201, 245, 6, 1)'
    },
    negro: {
        color: 'rgba(0, 0, 0, 1)'
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
