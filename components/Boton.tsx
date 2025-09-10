import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'

/*
type CustomButtonStyles = {
    button: ViewStyle
    font: TextStyle
    pressedButton: ViewStyle
    unpressedButton: ViewStyle
}

type buttonProps = {
    name: string
    onPress?: () => void
    customStyle?: StyleSheet.NamedStyles<CustomButtonStyles>;

}*/

type buttonProps = {
    name: string
    textStyle? : StyleProp<TextStyle>
    viewStyle? : StyleProp<ViewStyle>
    onPress? : () => void
}

export default function Boton(props: buttonProps) {
    const view = props.viewStyle != undefined ? props.viewStyle : defaultStyles.button
    const text = props.textStyle != undefined ? props.textStyle : defaultStyles.text
    return (
        <Pressable style={({ pressed }) => [
            { borderWidth: 1 },
            view,
            pressed ? defaultStyles.pressedButton : defaultStyles.unpressedButton
        ]}
            onPress={props.onPress}>
            <Text style={[text]}>{props.name}</Text>
        </Pressable>
    )
}

const defaultStyles = StyleSheet.create({
    button: {
        padding: 7,
        margin: 6,
        borderRadius: 3,
        justifyContent: "center",
        alignSelf:"baseline"
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