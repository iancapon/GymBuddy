import { Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native'

type CustomButtonStyles = {
    button: ViewStyle
    font: ViewStyle
    pressedButton: ViewStyle
    unpressedButton: ViewStyle
}

type buttonProps = {
    name: string
    onPress?: () => void
    style?: StyleSheet.NamedStyles<CustomButtonStyles>;
}


export default function Boton(props: buttonProps) {
    const styles = props.style == undefined ? defaultStyles : props.style
    return (
        <Pressable style={({ pressed }) => [
            { borderWidth: 1 },
            styles.button,
            pressed ? styles.pressedButton : styles.unpressedButton
        ]}
            onPress={props.onPress}>
            <Text style={styles.font}>{props.name}</Text>
        </Pressable>
    )
}
const defaultStyles = StyleSheet.create({
    button: {
        padding: 7,
        margin: 6,
        borderRadius: 3,
        
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