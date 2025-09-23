import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />

      <Stack.Screen name="workout_screen" options={{ title: "Workout Screen" }} />

      <Stack.Screen name="select_workouts_screen" options={{ title: "Choose a Workout" }} />
    </Stack>
  );
}
