import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import Boton from "../components/Boton";

export default function Index() {
    const router = useRouter()

    return (
        <View style={{ justifyContent: 'space-around', alignItems: 'center', padding: 50 }}>
            <Text>
                pagina index
            </Text>
            <Boton name='WORKOUT' viewStyle={{ width: 100 }} onPress={() => router.push("./workout_screen")} />
        </View>
    )
}