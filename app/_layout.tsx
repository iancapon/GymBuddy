import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  /*
  <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

      <Stack.Screen name="(modals)" options={{headerShown: false}} />

      <Stack.Screen name="Index"  />
  */
  return (
    <Stack>
      <Stack.Screen name="index"  />
    </Stack>
  );
}
