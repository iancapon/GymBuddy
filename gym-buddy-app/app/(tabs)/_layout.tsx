import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar";
import useTheme from "../../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    const { theme } = useTheme()

    return (
        <Tabs screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                position: 'absolute',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: 100,
                backgroundColor: theme.tabBar
            },
            tabBarActiveTintColor: theme.tabBarText,
            tabBarInactiveTintColor: theme.cardBg,
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarLabelStyle: {
                fontSize: 12,
                marginBottom: 5,
            },

        }}>
            <Tabs.Screen
                name="main_screen"
                options={{
                    headerShown: false, title: "Inicio",
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="rutinas_screen"
                options={{
                    headerShown: false, title: "Rutinas",
                    tabBarIcon: ({ color, size }) => <Ionicons name="barbell" size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="programar_screen"
                options={{
                    headerShown: false, title: "Programa",
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="historial_screen"
                options={{
                    headerShown: false, title: "Historial",
                    tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
                }}
            />

            <StatusBar style='light' />
        </Tabs>
    );
}
