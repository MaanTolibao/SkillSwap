import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Signup Successful", "Your account has been created!");
      router.replace("/home");
    } catch (err) {
      Alert.alert("Signup Error", err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#e6a8b2ff", "#b94877ff", "#a49107cc"]}
      style={styles.container}
    >
      <Text style={styles.title}>𝐂𝐫𝐞𝐚𝐭𝐞 𝐀𝐜𝐜𝐨𝐮𝐧𝐭</Text>
      <Text style={styles.subtitle}>𝑱𝒐𝒊𝒏 𝑺𝒌𝒊𝒍𝒍𝑺𝒘𝒂𝒑 𝒕𝒐𝒅𝒂𝒚 🏓</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ddd"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ddd"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>𝐒𝐢𝐠𝐧 𝐔𝐩</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.linkText}>
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26, // slightly smaller
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 10, // slightly less padding
    marginBottom: 12,
    width: "45%", // smaller width
    fontSize: 14,
    color: "#fff",
  },
  button: {
    backgroundColor: "#f192c2ff",
    padding: 12, // slightly less padding
    borderRadius: 10,
    width: "45%", // match input width
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  linkButton: {
    marginTop: 8,
  },
  linkText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 13,
  },
});
