import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjlt-rydfJRvk-Sv6ujSQB1hrFvJEUcdM",
  authDomain: "skillswap-83879.firebaseapp.com",
  projectId: "skillswap-83879",
  storageBucket: "skillswap-83879.appspot.com",
  messagingSenderId: "1671399561",
  appId: "1:1671399561:web:1430f12e55fd48df441e58",
  measurementId: "G-C6ZZ19EFM8",
};

const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { auth, db };
