import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");


const TODAY_ROUTINE = [
  {
    id: "1",
    titulo: "Flexiones de brazo",
    detalle: "3x15",
    media: "https://img.youtube.com/vi/IODxDxX7oi4/hqdefault.jpg",
    explicacion: "Mantener la espalda recta y bajar hasta casi tocar el piso.",
  },
  {
    id: "2",
    titulo: "Plancha",
    detalle: "3x60s",
    media: "https://img.youtube.com/vi/pSHjTRCQxIw/hqdefault.jpg",
    explicacion: "Mantener abdomen y glúteos contraídos, espalda recta.",
  },
  {
    id: "3",
    titulo: "Sentadillas",
    detalle: "3x20",
    media: "https://img.youtube.com/vi/aclHkVaku9U/hqdefault.jpg",
    explicacion: "Rodillas alineadas con los pies, bajar lento y subir firme.",
  },
];

export default function HomeScreen() {
  const [current, setCurrent] = useState(0);

  const handlePress = (action: string) => {
    Alert.alert("Navegación", `Abrir pantalla: ${action}`);
  };

  const next = () => {
    if (current < TODAY_ROUTINE.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <FlatList
      data={[{ id: "greet" }, { id: "btns" }, { id: "today" }, { id: "guide" }, { id: "history" }]}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        switch (item.id) {
          case "greet":
            return <Text style={styles.greeting}>Hola Pablo 👋</Text>;

          case "btns":
            return (
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.bigButton, { backgroundColor: "#2563eb" }]}
                  onPress={() => handlePress("Nueva Rutina")}
                >
                  <Ionicons name="add-circle-outline" size={32} color="#fff" />
                  <Text style={styles.buttonText}>Nueva Rutina</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.bigButton, { backgroundColor: "#10b981" }]}
                  onPress={() => handlePress("Cargar Rutina")}
                >
                  <Ionicons name="cloud-upload-outline" size={32} color="#fff" />
                  <Text style={styles.buttonText}>Cargar Rutina</Text>
                </TouchableOpacity>
              </View>
            );

          case "today":
            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Rutina de hoy 🏋️‍♂️</Text>
                {TODAY_ROUTINE.map((ex) => (
                  <View key={ex.id} style={styles.routineItem}>
                    <Ionicons name="checkmark-circle-outline" size={22} color="#10b981" />
                    <Text style={styles.routineText}>
                      {ex.titulo} — <Text style={styles.routineDetail}>{ex.detalle}</Text>
                    </Text>
                  </View>
                ))}
              </View>
            );

          case "guide":
            const ex = TODAY_ROUTINE[current];
            return (
              <View style={styles.guideCard}>
                <TouchableOpacity onPress={prev} disabled={current === 0}>
                  <Ionicons name="chevron-back-outline" size={40} color={current === 0 ? "#ccc" : "#2563eb"} />
                </TouchableOpacity>

                <View style={styles.guideContent}>
                  <Image source={{ uri: ex.media }} style={styles.guideImage} />
                  <Text style={styles.guideTitle}>{ex.titulo}</Text>
                  <Text style={styles.guideDetail}>{ex.explicacion}</Text>
                  <Text style={styles.guideReps}>{ex.detalle}</Text>
                </View>

                <TouchableOpacity onPress={next} disabled={current === TODAY_ROUTINE.length - 1}>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={40}
                    color={current === TODAY_ROUTINE.length - 1 ? "#ccc" : "#2563eb"}
                  />
                </TouchableOpacity>
              </View>
            );

          case "history":
            return (
              <TouchableOpacity
                style={[styles.extraButton, { backgroundColor: "#f59e0b" }]}
                onPress={() => handlePress("Historial")}
              >
                <Ionicons name="time-outline" size={28} color="#fff" />
                <Text style={styles.extraText}>Historial</Text>
              </TouchableOpacity>
            );

          default:
            return null;
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  bigButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  routineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  routineText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#374151",
  },
  routineDetail: {
    color: "#6b7280",
  },
  guideCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  guideContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  guideImage: {
    width: width * 0.7,
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  guideTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  guideDetail: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 4,
  },
  guideReps: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563eb",
  },
  extraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  extraText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
