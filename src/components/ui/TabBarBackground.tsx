import React from "react";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

const TabBarBackground = () => {
  return (
    <BlurView
      intensity={150} // Adjust the blur intensity as needed
      style={{
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default TabBarBackground;
