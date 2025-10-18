import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function GoalsScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#e6a8b2ff", "#b94877ff", "#a49107cc"]}  // Updated gradient colors
      style={styles.container}
    >
      <Text style={styles.title}>WELCOME TO SKILLSWAP</Text>

      <TouchableOpacity
        style={styles.continueButton}
        activeOpacity={0.8}
        onPress={() => router.push('/goals/feed')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#e7d8d9ff',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  continueButton: {
    backgroundColor: '#db719eff',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  continueText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e6d5d6ff',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
