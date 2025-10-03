import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index_tab"
                options={{ title: "GymBuddy", tabBarIcon: ({ size }) => <Ionicons name="fitness" size={size} /> }}
            />
            <Tabs.Screen
                name="calendario_screen"
                options={{ title: "Calendario", tabBarIcon: ({ size }) => <Ionicons name="calendar" size={size} /> }}
            />

            <Tabs.Screen
                name="perfil_screen"
                options={{ title: "Mi Perfil", tabBarIcon: ({ size }) => <Ionicons name="person" size={size} /> }}
            />

        </Tabs>
    );
}
