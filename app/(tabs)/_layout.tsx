import { useAuth } from "@/lib/auth-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { user,isLoadingUser } = useAuth();

useEffect(() => {
  if (isLoadingUser) return;

  const inAuthGroup = segments[0] === "auth";

  if (!user && !inAuthGroup) {
    router.replace("/auth");
  } else if (user && inAuthGroup) {
    router.replace("/");
  }
}, [user, segments, isLoadingUser]);


  return (
    <Tabs screenOptions={{ headerStyle:{backgroundColor:"#f5f5f5"},
    headerShadowVisible:false,
    tabBarStyle: {
      backgroundColor: "#f5f5f5",
      borderTopWidth: 0,
      elevation:0,
      shadowOpacity:0,
    },
    tabBarActiveTintColor:"#6200ee",
    tabBarInactiveTintColor:"#666666"
    } }>
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habits",
          tabBarIcon: ({ color, size }) => (
           <MaterialCommunityIcons name="calendar-today" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => (
           <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-habit"
        options={{
          title: "Add Habit",
          tabBarIcon: ({ color, size }) => (
           <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />s
    </Tabs>
  );
}
