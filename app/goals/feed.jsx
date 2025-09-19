import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "../../firebaseConfig"; // Adjust path as needed
import { signOut } from "firebase/auth";

// ----------------- Posts -----------------
const initialPosts = [
  {
    id: "1",
    type: "question",
    title: "How do I improve my coding logic?",
    description:
      "Start solving small algorithm problems daily. Platforms like LeetCode and HackerRank help build thinking patterns.",
    tag: "Programming",
  },
  {
    id: "2",
    type: "advice",
    title: "Expert Advice: Tips to get better at system design",
    description:
      "Start with basics like scalability, availability, and caching. Try Grokking the System Design Interview book.",
    tag: "System Design",
  },
  {
    id: "3",
    type: "question",
    title: "How to stay consistent with learning IT skills?",
    description:
      "Set a schedule, join a community, and break your goals into weekly tasks. Track progress regularly.",
    tag: "Learning Tips",
  },
  {
    id: "4",
    type: "advice",
    title: "Expert Advice: Should I learn DevOps in 2025?",
    description:
      "Yes! DevOps is in high demand. Start with Docker, CI/CD, and learn about cloud platforms like AWS or Azure.",
    tag: "DevOps",
  },
  {
    id: "5",
    type: "advice",
    title: "Expert Advice: Best way to learn APIs as a beginner",
    description:
      "Understand REST first. Practice by building small apps that consume public APIs like OpenWeather or TMDB.",
    tag: "Web Development",
  },
  {
    id: "6",
    type: "question",
    title: "How to prepare for tech interviews effectively?",
    description:
      "Practice coding questions, mock interviews, and behavioral questions. Focus on problem-solving and communication skills.",
    tag: "Interview Tips",
  },
  {
    id: "7",
    type: "advice",
    title: "Expert Advice: Importance of version control",
    description:
      "Using Git is essential. It helps you track changes, collaborate, and manage your codebase efficiently.",
    tag: "Tools",
  },
  {
    id: "8",
    type: "question",
    title: "What’s the best way to learn a new programming language?",
    description:
      "Start with fundamentals, build small projects, and read others’ code. Consistency and practice are key.",
    tag: "Programming",
  },
  {
    id: "9",
    type: "advice",
    title: "Expert Advice: How to manage burnout in tech",
    description:
      "Take regular breaks, set realistic goals, and maintain work-life balance. Mental health is crucial for long-term success.",
    tag: "Career Advice",
  },
  {
    id: "10",
    type: "question",
    title: "How do I get started with machine learning?",
    description:
      "Start with Python basics, then explore libraries like Scikit-learn and TensorFlow. Take online courses and practice with datasets.",
    tag: "Machine Learning",
  },
];

// ----------------- Profile Header -----------------
function ProfileHeader({ toggleMenu }) {
  return (
    <View style={styles.profileHeaderContainer}>
      <View style={styles.profileInfo}>
        <Ionicons name="person-circle-outline" size={40} color="#b94877ff" />
        <Text style={styles.profileName}>Maan Tolibao</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Ionicons name="menu" size={32} color="#b94877ff" />
      </TouchableOpacity>
    </View>
  );
}

// ----------------- Menu Overlay -----------------
function MenuOverlay({ visible, onClose, onLogout }) {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableOpacity
        style={styles.overlayBackground}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => alert("Go to Profile")}
          >
            <Ionicons name="person-outline" size={20} color="#b94877ff" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => alert("Settings clicked")}
          >
            <Ionicons name="settings-outline" size={20} color="#b94877ff" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          {/* ✅ Functional Logout Button */}
          <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
            <Ionicons name="log-out-outline" size={20} color="#b94877ff" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

// ----------------- Feed Component -----------------
export default function Feed() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [posts, setPosts] = useState(initialPosts);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Load new post from AsyncStorage when feed mounts
  useEffect(() => {
    async function loadNewPost() {
      try {
        const newPostStr = await AsyncStorage.getItem("newPost");
        if (newPostStr) {
          const newPost = JSON.parse(newPostStr);

          setPosts((prevPosts) => {
            // Avoid duplicates by checking id
            if (prevPosts.some((p) => p.id === newPost.id)) return prevPosts;
            return [newPost, ...prevPosts];
          });

          await AsyncStorage.removeItem("newPost");
        }
      } catch (e) {
        console.error("Error loading new post from storage:", e);
      }
    }
    loadNewPost();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuVisible(false); // Close menu
      router.replace("/login"); // Redirect to login screen
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SkillSwap Feed</Text>

      <ProfileHeader toggleMenu={toggleMenu} />
      <MenuOverlay visible={menuVisible} onClose={toggleMenu} onLogout={handleLogout} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/goals/post/[id]",
                params: {
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  tag: item.tag,
                },
              })
            }
          >
            <View
              style={[
                styles.post,
                item.type === "advice" && styles.expertAdvicePost,
              ]}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.tag}>{item.tag}</Text>
              {item.type === "advice" && (
                <View style={styles.expertBadge}>
                  <Text style={styles.expertBadgeText}>Expert Advice</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/goals/create")}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#b94877ff",
    marginBottom: 20,
    textAlign: "center",
  },
  profileHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#b94877ff",
  },
  menuButton: {
    padding: 6,
  },
  post: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#eee",
  },
  expertAdvicePost: {
    backgroundColor: "#ffe6f8ff",
    borderColor: "#e6a8b2ff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
    color: "#555",
  },
  tag: {
    fontSize: 13,
    fontWeight: "600",
    color: "#b94877ff",
  },
  expertBadge: {
    marginTop: 8,
    backgroundColor: "#b94877ff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  expertBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#b94877ff",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#b94877ff",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#b94877ff",
    fontWeight: "600",
  },
});
