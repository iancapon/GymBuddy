import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, Appearance } from "react-native";
import { THEMES } from "../constants/THEMES";
import { Alert } from "react-native";

type themeType = {
    header: string,
    overlay: string,
    text: string,
    textMuted: string,
    accent: string,
    accentMuted: string,
    success: string,
    warning: string,
    cardBg: string,
    border: string,
    progressTrack: string,
    progressFill: string,
    tabBar: string,
    tabBarText: string
}

export default function useTheme() {
    const [themeValue, setTV] = useState('dark')
    const [theme, setTheme] = useState<themeType>(THEMES.dark)

    useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            const isDark = colorScheme === 'dark'
            setTV(isDark ? 'dark' : 'light')
            setTheme(isDark ? THEMES.dark : THEMES.light)
        })
        return () => sub.remove()
    }, [])


    return { themeValue, theme, globalStyles }
}

const globalStyles = StyleSheet.create({

})

