import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}  // cooler, darker gradient
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to SkillSwap</Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("/goals/feed")}
        activeOpacity={0.8}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 80,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#E0E0E0",
    textAlign: "center",
    fontFamily: "HelveticaNeue", // if supported
    letterSpacing: 1,
  },
  continueButton: {
    backgroundColor: "#ff7f50", // coral color
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textTransform: "uppercase",
  },
});
