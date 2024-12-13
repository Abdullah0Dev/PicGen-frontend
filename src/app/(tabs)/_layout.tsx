import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground"; 

export default function TabLayout() { 

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff7e5f",
        tabBarInactiveTintColor: "#feb47b",

        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <TabBarBackground />,

        tabBarStyle: Platform.select({
          default: {
            borderTopColor: "transparent",
            borderTopWidth: 0,
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          // tabBarShowLabel: false, // Hide label when inactive
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          // tabBarShowLabel: false, // Hide label when inactive
        }}
      />
    </Tabs>
  );
}
