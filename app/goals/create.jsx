import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, auth } from "../../firebaseConfig"; // <-- Added auth import here
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleCreatePost = async () => {
    if (!title.trim() || !description.trim() || !tag.trim()) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Not logged in", "Please log in to create a post.");
        return;
      }

      // Add to Firestore with userId
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        description,
        tag,
        type: "question", // or "advice"
        userId: currentUser.uid, // Attach current user's uid here
        createdAt: serverTimestamp(),
      });

      // Prepare post object including Firestore ID and userId
      const newPost = {
        id: docRef.id,
        title,
        description,
        tag,
        type: "question",
        userId: currentUser.uid, // Attach userId here as well
      };

      // Save new post to AsyncStorage so feed can pick it up
      await AsyncStorage.setItem("newPost", JSON.stringify(newPost));

      Alert.alert("Post Created", "Your post has been saved!");
      router.push("/goals/feed");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", "Could not create post. Please try again.");
    }
  };

  const handleBack = () => {
    router.push("/goals/feed");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#1877f2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="What's on your mind?"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Write a description..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.tagInput}
            placeholder="Add a tag (e.g. #career, #advice)"
            value={tag}
            onChangeText={setTag}
            maxLength={30}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.postButton,
            (!title || !description || !tag) && styles.postButtonDisabled,
          ]}
          onPress={handleCreatePost}
          disabled={!title || !description || !tag}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- Styles remain unchanged ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBar: {
    height: 50,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 60,
  },
  backText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#0e0609ff",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  contentContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#f0f2f5",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 50,
    textAlignVertical: "top",
    color: "#050505",
  },
  descriptionInput: {
    fontSize: 14,
    backgroundColor: "#f0f2f5",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 90,
    textAlignVertical: "top",
    color: "#050505",
  },
  tagInput: {
    fontSize: 13,
    backgroundColor: "#f0f2f5",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#606770",
  },
  postButton: {
    backgroundColor: "#b94877ff",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#b94877ff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  postButtonDisabled: {
    backgroundColor: "#e6a8b2ff",
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
