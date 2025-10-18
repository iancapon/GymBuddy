import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { ReactNode } from 'react'

type buttonProps = {
    name?: string,
    onLongPress?: () => void
    onPress?: () => void;
    onPressIn?: () => void
    onPressOut?: () => void
    children?: ReactNode
    viewStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>

}

export default function Boton(props: buttonProps) {
    const unpressedView = props.viewStyle != null ? [styles.button, props.viewStyle] : styles.button
    const unpressedText = props.textStyle != null ? [styles.text, props.textStyle] : styles.text

    return (
        <Pressable
            onPress={props.onPress}
            onLongPress={props.onLongPress}
            onPressIn={props.onPressIn}
            onPressOut={props.onPressOut}
            style={({ pressed }) => [pressed ? { opacity: 0.5 } : { opacity: 1 }, unpressedView]}
        >

            {props.name != undefined ? <Text style={[unpressedText]}>{props.name}</Text> : props.children}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    button: {
        padding: 7,
        margin: 6,
        borderRadius: 3,
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },

    text: {
        color: "black",
        fontSize: 15
    },

});