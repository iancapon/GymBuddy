import { Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'

type buttonProps = {
    name: string
    onPress?: () => void
    buttonStyle?: any//StyleProp<ViewStyle>
    textStyle?: any
    pressedButton?: any//StyleProp<ViewStyle>
    unpressedButton?: any//StyleProp<ViewStyle>
}

export default function Boton(props: buttonProps) {
    const pressedColor = props.pressedButton != null ? props.pressedButton : styles.pressedButton
    const unpressedColor = props.unpressedButton != null ? props.unpressedButton : styles.unpressedButton
    return (
        <Pressable style={({ pressed }) => [
            { borderWidth: 1 },
            props.buttonStyle != null ? [styles.button, props.buttonStyle] : styles.button,
            pressed ? pressedColor : unpressedColor
            
        ]}
            onPress={props.onPress}>
            <Text style={props.textStyle != null ? props.textStyle : { fontSize: 15 }}>{props.name}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    button: {
        padding: 7,
        margin: 6,
        borderRadius: 3,
        fontSize: 15,
    },
    pressedButton: {
        backgroundColor: 'lightgrey',
    },
    unpressedButton: {
        backgroundColor: 'white',
    }

});