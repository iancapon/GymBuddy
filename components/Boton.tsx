import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'

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

}


export default function Boton(props: buttonProps) {
    const styles = props.customStyle == undefined ? defaultStyles : props.customStyle
    return (
        <Pressable style={({ pressed }) => [
            { borderWidth: 1 },
            styles.button,
            pressed ? styles.pressedButton : styles.unpressedButton
        ]}
            onPress={props.onPress}>
            <Text style={[styles.font]}>{props.name}</Text>
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
    font: {
        fontSize: 15
    },
    pressedButton: {
        backgroundColor: 'lightgrey',
    },
    unpressedButton: {
        backgroundColor: 'white',
    }
});