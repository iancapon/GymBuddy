import { Tabs } from "expo-router";
//import { Ionicons } from "@expo/vector-icons"

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="calendario_screen"
                options={{ title: "Calendario" }}
            />
            <Tabs.Screen
                name="select_workouts_screen"
                /*options={{ title: "Galería", tabBarLabel: "Galería"
                    , tabBarIcon:({size})=> <Ionicons name="camera" size={size}/>
                 }}*/
                options={{ title: "Workouts" }}
            />
            <Tabs.Screen
                name="perfil_screen"
                options={{ title: "Mi Perfil" }}
            />
            <Tabs.Screen
                name="sesion_screen"
                options={{ title: "Sesión" }}
            />

        </Tabs>
    );
}
