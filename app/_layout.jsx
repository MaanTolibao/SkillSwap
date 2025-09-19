// app/_layout.jsx
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function Layout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,  // Hide header by default
        headerTitle: '',     // No header title fallback
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="goals/index" />
          <Stack.Screen name="goals/feed" />
          <Stack.Screen
            name="goals/create"
            options={{ headerShown: true, title: "Create Post" }}
          />
          <Stack.Screen
            name="goals/edit"
            options={{ headerShown: true, title: "Edit Post" }}
          />
          <Stack.Screen
            name="goals/post/[id]"
            options={{ headerShown: true, title: "Post Details" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="welcomescreen" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </>
      )}
    </Stack>
  );
}
