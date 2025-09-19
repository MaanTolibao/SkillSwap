import { useEffect } from "react";
import { Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
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
      colors={["#49022bff", "#570a30f8", "#a91076ff"]}
      style={styles.container}
    >
      {/* App Name */}
      <Text style={styles.appName}>SkillSwap</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>
        "Your Skills, Your Schedule — Master Both with SkillSwap."
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
  appName: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    letterSpacing: 2,
  },
  tagline: {
    color: "#ddd",
    textAlign: "center",
    marginBottom: 50,
    fontSize: 20,
    fontStyle: "italic",
  },
  loginButton: {
    backgroundColor: "#ea337f",
    paddingVertical: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
    marginBottom: 15,
  },
  signupButton: {
    borderColor: "#fff",
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
