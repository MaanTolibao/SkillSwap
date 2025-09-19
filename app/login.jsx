import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/goals");
    } catch (err) {
      alert("Login error: " + err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#e6a8b2ff", "#b94877ff", "#a49107cc"]}  // Updated gradient colors
      style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
    >
      <Text style={{ fontSize: 28, color: "#fff", fontWeight: "bold", marginBottom: 30 }}>
        𝐋𝐨𝐠 𝐈𝐧
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        style={{
          width: "45%",  // shorter width
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          width: "45%",  // shorter width
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: "45%",  // shorter width
          backgroundColor: "#e76daaff",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>𝐋𝐨𝐠 𝐈𝐧</Text>
      </TouchableOpacity>

      {/* Sign up Link */}
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={{ color: "#fff" }}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
