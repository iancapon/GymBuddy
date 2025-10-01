import { Stack } from "expo-router"


export default function ModalsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="workout_screen"
                options={{ presentation: "modal", animation: "fade", title: "Workout" }}
            />
            <Stack.Screen
                name="registro_screen"
                options={{ presentation: "modal", animation: "fade", title:"Registro" }}
            />
        </Stack>
    );
}
