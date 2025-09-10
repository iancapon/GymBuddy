import { ReactNode } from 'react'
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from 'react-native'

type buttonProps = {
    name?: string
    textStyle?: StyleProp<TextStyle>
    viewStyle?: StyleProp<ViewStyle>
    onPress?: () => void
    children?: ReactNode
}

export default function Boton(props: buttonProps) {
    const view = props.viewStyle != undefined ? props.viewStyle : defaultStyles.button
    const text = props.textStyle != undefined ? props.textStyle : defaultStyles.text
    return (
        <Pressable style={({ pressed }) => [
            { borderWidth: 1 },
            pressed ? defaultStyles.pressedButton : defaultStyles.unpressedButton,
            view
        ]}
            onPress={props.onPress}>
            <View>
                {props.children}
                <Text style={[text]}>{props.name}</Text>
            </View>
        </Pressable>
    )
}

const defaultStyles = StyleSheet.create({
    button: {
        padding: 7,
        margin: 6,
        borderRadius: 3,
        justifyContent: "center",
        alignSelf: "baseline"
    },
    text: {
        fontSize: 15
    },
    pressedButton: {
        backgroundColor: '#26667F',
    },
    unpressedButton: {
        backgroundColor: '#67C090',
    }
});