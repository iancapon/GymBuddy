import { StyleSheet, StyleProp, ViewStyle, TextStyle, Text, View, FlatList, ImageBackground } from 'react-native';
import Boton from '../../components/Boton';
import {Calendar} from "react-native-calendars"

export default function Calendario() {
    return (
        <View style={[{flex:1}]}>
            <ImageBackground
                source={{ uri: "https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3ltfGVufDB8fDB8fHww" }}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
            />
            <Text>
                Calendario de workouts
            </Text>
        </View>
    )
}