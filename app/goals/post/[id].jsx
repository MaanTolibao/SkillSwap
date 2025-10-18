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
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function PostDetails() {
  const { title, description, tag, id } = useLocalSearchParams();
  const router = useRouter();

  const [likedPosts, setLikedPosts] = useState({});
  const [newComment, setNewComment] = useState("");

  // ✅ Unique comments per POST ID
  const getInitialComments = () => {
    switch (id) {
      case "1":
        return [
          {
            id: "1",
            name: "Mika",
            avatar: { uri: "https://i.pravatar.cc/150?img=3" },
            text: "Logic challenges helped me so much too! 🔥",
            isUser: false,
          },
          {
            id: "2",
            name: "Noah",
            avatar: { uri: "https://i.pravatar.cc/150?img=9" },
            text: "LeetCode streaks are tough but worth it.",
            isUser: false,
          },
        ];
      case "2":
        return [
          {
            id: "1",
            name: "Sophia",
            avatar: { uri: "https://i.pravatar.cc/150?img=4" },
            text: "That book changed the way I think about design!",
            isUser: false,
          },
          {
            id: "2",
            name: "Ethan",
            avatar: { uri: "https://i.pravatar.cc/150?img=6" },
            text: "Solid advice — I need to focus on scalability more.",
            isUser: false,
          },
        ];
      case "3":
        return [
          {
            id: "1",
            name: "Ava",
            avatar: { uri: "https://i.pravatar.cc/150?img=7" },
            text: "Breaking projects into milestones saved my sanity 😅",
            isUser: false,
          },
          {
            id: "2",
            name: "Leo",
            avatar: { uri: "https://i.pravatar.cc/150?img=8" },
            text: "Totally agree — small wins keep me going!",
            isUser: false,
          },
        ];
      case "4":
        return [
          {
            id: "1",
            name: "Isabella",
            avatar: { uri: "https://i.pravatar.cc/150?img=10" },
            text: "Grokking is such a must-read for interviews!",
            isUser: false,
          },
          {
            id: "2",
            name: "Liam",
            avatar: { uri: "https://i.pravatar.cc/150?img=11" },
            text: "YouTube talks helped me visualize things better.",
            isUser: false,
          },
        ];
      case "5":
        return [
          {
            id: "1",
            name: "Olivia",
            avatar: { uri: "https://i.pravatar.cc/150?img=12" },
            text: "Debugging takes patience — this is a great reminder.",
            isUser: false,
          },
          {
            id: "2",
            name: "Mason",
            avatar: { uri: "https://i.pravatar.cc/150?img=13" },
            text: "Learning to read error messages properly is key!",
            isUser: false,
          },
        ];
      case "6":
        return [
          {
            id: "1",
            name: "Emma",
            avatar: { uri: "https://i.pravatar.cc/150?img=14" },
            text: "Time blocking works wonders for me ⏰",
            isUser: false,
          },
          {
            id: "2",
            name: "Lucas",
            avatar: { uri: "https://i.pravatar.cc/150?img=15" },
            text: "Avoiding multitasking really boosted my focus.",
            isUser: false,
          },
        ];
      default:
        return [
          {
            id: "1",
            name: "Aiden",
            avatar: { uri: "https://i.pravatar.cc/150?img=16" },
            text: "Loved this post, super insightful!",
            isUser: false,
          },
        ];
    }
  };

  const [comments, setComments] = useState(getInitialComments());

  const handleLike = () => {
    setLikedPosts((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${description}`,
      });
    } catch {
      Alert.alert("Error", "Failed to share the post.");
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const randomAvatar = `https://i.pravatar.cc/150?img=${
        Math.floor(Math.random() * 70) + 1
      }`;
      const comment = {
        id: Date.now().toString(),
        name: "You",
        avatar: { uri: randomAvatar },
        text: newComment.trim(),
        isUser: true,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const liked = likedPosts[title];

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentName}>{item.name}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
      {item.isUser && (
        <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
          <Ionicons name="trash-outline" size={18} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/goals/feed")}
        >
          <Ionicons name="arrow-back" size={24} color="#ea337f" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Post Content */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Like / Share / Comment Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={22}
              color={liked ? "#e0245e" : "#333"}
            />
            <Text style={styles.actionText}>{liked ? "Liked" : "Like"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              Alert.alert("Comments", "Scroll down to comment below.")
            }
          >
            <Ionicons name="chatbubble-outline" size={22} color="#333" />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Feather name="share" size={20} color="#333" />
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
              renderItem={renderComment}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>

        {/* Add New Comment */}
        <View style={styles.addCommentContainer}>
          <TextInput
            placeholder="Add a comment..."
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            style={[
              styles.sendButton,
              { opacity: newComment.trim() === "" ? 0.5 : 1 },
            ]}
            disabled={newComment.trim() === ""}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 40 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backText: { marginLeft: 8, fontSize: 16, color: "#5a0b4d", fontWeight: "600" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 12, color: "#333" },
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
  description: { fontSize: 16, lineHeight: 24, color: "#555" },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  actionButton: { alignItems: "center" },
  actionText: { marginTop: 4, fontSize: 12, color: "#333" },
  commentsSection: { marginTop: 30 },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#5a0b4d",
  },
  noCommentsText: { fontStyle: "italic", color: "#666" },
  commentContainer: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  commentContent: { flex: 1 },
  commentName: { fontWeight: "600" },
  commentText: { color: "#333" },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#ea337f",
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
});
