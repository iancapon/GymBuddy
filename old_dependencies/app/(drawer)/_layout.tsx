import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function DrawerLayout() {
    useEffect(() => {
        NavigationBar.setVisibilityAsync("hidden");
        //NavigationBar.setBehaviorAsync("overlay-swipe");
      }, []);
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen name="index" options={{
                    title: "GymBuddy - Página principal",
                    drawerLabel: 'Página principal',
                }} />
                <Drawer.Screen name="perfil" options={{
                    title: "GymBuddy - Mi perfil",
                    drawerLabel: 'Mi perfil',
                }} />
                <Drawer.Screen name="calendario" options={{
                    title: "GymBuddy - Calendario",
                    drawerLabel: 'Calendario'
                }} />
                <Drawer.Screen name="about" options={{
                    title: "GymBuddy - Sobre nosotros",
                    drawerLabel: 'Sobre nosotros'
                }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}