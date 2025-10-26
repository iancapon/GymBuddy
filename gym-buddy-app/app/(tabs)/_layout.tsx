import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index_tab"
                options={{ headerShown: false, title: "Inicio", tabBarIcon: ({ size }) => <Ionicons name="fitness" size={size} /> }}
            />

            <Tabs.Screen
                name="perfil_screen"
                options={{ title: "Perfil", tabBarIcon: ({ size }) => <Ionicons name="person" size={size} /> }}
            />

        </Tabs>
    );
}
