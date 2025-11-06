import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar";

export default function ModalsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="main_screen"
                options={{ presentation: "transparentModal", animation: "simple_push", headerShown: false }}
            />
            <Stack.Screen
                name="workout_screen"
                options={{ presentation: "transparentModal", animation: "simple_push", headerShown: false }}
            />
            <Stack.Screen
                name="historial_screen"
                options={{ presentation: "transparentModal", animation: "simple_push", headerShown: false }}
            />
            <Stack.Screen
                name="registro_screen"
                options={{ presentation: "modal", animation: "fade", title: "Registro" }}
            />
            <Stack.Screen
                name="crear_screen"
                options={{ presentation: "modal", animation: "fade", title: "Crear Workout", headerShown: false }}
            />

            <Stack.Screen
                name="programar_screen"
                options={{ presentation: "modal", animation: "simple_push", headerShown: false }}
            />
            <StatusBar style='light'/>
        </Stack>
    );
}
