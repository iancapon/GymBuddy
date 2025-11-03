import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"
import { ContextoTema } from "../_layout";
import { useContext } from "react";
import THEMES from "../../constants/THEMES";
import { StyleSheet } from "react-native";


export default function Layout() {
    const contextoTema = useContext(ContextoTema)
    const mode = contextoTema?.themeContext.theme
    const theme = THEMES()[mode != undefined ? mode : 'light'];

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: theme.text,
            tabBarInactiveTintColor: theme.textMuted,
            tabBarStyle: [styles.tabBar, { backgroundColor: theme.header }]
        }}>
            <Tabs.Screen
                name="index_tab"
                options={{ headerShown: false, title: "Inicio", tabBarIcon: ({ size }) => <Ionicons name="fitness" size={size} color={theme.text} /> }}
            />

            <Tabs.Screen
                name="perfil_screen"
                options={{ headerShown: false, title: "Perfil", tabBarIcon: ({ size }) => <Ionicons name="person" size={size} color={theme.text} /> }}
            />

        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
    }
})