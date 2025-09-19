import { Tabs } from 'expo-router'
import { GoalsProvider } from "../../contexts/GoalsContexts"; 

export default function GoalsLayout() {
  return (
    <GoalsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // hide the bottom tab bar
        }}
      >
        {/* Keep only feed (index) screen */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Feed',
          }}
        />
      </Tabs>
    </GoalsProvider>
  )
}
