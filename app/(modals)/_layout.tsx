import { Stack } from 'expo-router'
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function ModalLayout() {
    useEffect(() => {
        NavigationBar.setVisibilityAsync("hidden");
        //NavigationBar.setBehaviorAsync("overlay-swipe");
    }, []);
    return (
        <Stack>

            <Stack.Screen name="modal" options={{ title: "modal de prueba" }} />

            <Stack.Screen name="workout" options={{ title: "workout" }} />

        </Stack>
    )
}