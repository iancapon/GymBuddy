import { Stack } from "expo-router";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export default function RootLayout() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    //NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

      <Stack.Screen name="(modals)" options={{headerShown: false}} />
    </Stack>
  );
}
