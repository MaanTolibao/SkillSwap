import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function PostDetails() {
  const { title, description, tag } = useLocalSearchParams();
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  // Comments state
  const [comments, setComments] = useState([
    { id: "1", text: "Great post! Thanks for sharing." },
    { id: "2", text: "Very helpful information." },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${description}`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share the post.");
    }
  };

  // Add comment handler
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    setComments((prevComments) => [
      ...prevComments,
      { id: Math.random().toString(), text: newComment.trim() },
    ]);
    setNewComment("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/goals/feed")}
        >
          <Ionicons name="arrow-back" size={24} color="#5a0b4d" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Like / Share Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "#e0245e" : "#333"}
            />
            <Text style={styles.actionText}>{liked ? "Liked" : "Like"}</Text>
          </TouchableOpacity>

          {/* Just to keep Comment button for UX consistency, but it won’t do anything now */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              // Scroll to comment section or open keyboard could be implemented
              Alert.alert("Comments", "Scroll down to comment below.");
            }}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#333" />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Feather name="share" size={22} color="#333" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Comments</Text>

          {comments.length === 0 ? (
            <Text style={styles.noCommentsText}>
              No comments yet. Be the first to comment!
            </Text>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Ionicons
                    name="person-circle-outline"
                    size={24}
                    color="#a91c7e"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              )}
            />
          )}
        </View>

        {/* Add New Comment */}
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { opacity: newComment.trim() === "" ? 0.5 : 1 },
            ]}
            onPress={handleAddComment}
            disabled={newComment.trim() === ""}
          >
            <Ionicons name="send" size={24} color="#5a0b4d" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#5a0b4d",
    fontWeight: "600",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  tag: {
    fontSize: 14,
    backgroundColor: "#fce4ec",
    color: "#a91c7e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
  },
  commentsSection: {
    marginTop: 30,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#5a0b4d",
  },
  noCommentsText: {
    fontStyle: "italic",
    color: "#666",
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
});
