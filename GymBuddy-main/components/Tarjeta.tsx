import { StyleProp, ViewStyle } from 'react-native';
import { ReactNode, useState } from 'react';
import Boton from '../components/Boton';

type propsTarjeta = {
  onLongPress?: () => void
  onPress?: () => void
  children?: ReactNode
  viewStyle?: StyleProp<ViewStyle>
  pressedOptions?: StyleProp<ViewStyle>
}


export default function Tarjeta(props: propsTarjeta) {
  const [pressed, setPressed] = useState(false)
  const pressedView = [pressed && props.pressedOptions != undefined ? props.pressedOptions : {}]

  return (
    <Boton viewStyle={[props.viewStyle, pressedView]}
      onLongPress={() => props.onLongPress}
      onPress={() => props.onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      {props.children}
    </Boton>
  )
}