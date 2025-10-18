import { useEffect } from "react";
import { Text, TouchableOpacity, Platform, StyleSheet, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "web") {
      document.title = "Welcome to SkillSwap";
    }
  }, []);

  return (
    <LinearGradient
      colors={["#e6a8b2ff", "#b94877ff", "#a49107cc"]}
      style={styles.container}
    >
      <View style={styles.centerContent}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App Name */}
        <Text style={styles.appName}>SkillSwap</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          From Beginner to Pro — Skill Up with SkillSwap.
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={styles.loginButton}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={() => router.push("/signup")}
          style={styles.signupButton}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180, // bigger
    height: 180, // bigger
    marginBottom: 25,
  },
  appName: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    letterSpacing: 2,
    textAlign: "center",
  },
  tagline: {
    color: "#f5f5f5",
    textAlign: "center",
    marginBottom: 60,
    fontSize: 18,
    fontStyle: "italic",
    maxWidth: 300,
  },
  loginButton: {
    backgroundColor: "#ea337f",
    paddingVertical: 12,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    marginBottom: 15,
  },
  signupButton: {
    borderColor: "#fff",
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
