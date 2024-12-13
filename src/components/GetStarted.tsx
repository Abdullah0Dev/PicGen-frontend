import { View, Text, ImageBackground, Animated, ScrollView } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CustomButton } from "@/components";
import { router } from "expo-router";
import { Easing } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const GetStarted = () => {
  const NavigateToHome = () => {
    // Navigate to the home screen
    router.navigate("/(tabs)");
  };

  // Animation references
  const imageAnim = useRef(new Animated.Value(0)).current;
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animations when the screen loads
    Animated.sequence([
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(gradientAnim, {
        toValue: 1,
        duration: 1300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1300,
        delay: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 1300,
        delay: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 1300,
        delay: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return ( 
    <ImageBackground
      className="flex w-full h-full"
      source={require("@/assets/images/getstarted_img.png")}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: gradientAnim, // Animated opacity for the gradient
        }}
      >
        <LinearGradient
          colors={["transparent", "#ffffff"]}
          className="w-full h-full"
          style={{ flex: 1 }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 0.7 }}
        >
          {/* view to push the items to the bottom */}
          <View className="h-[66%]" />
          <View className="text-  items-center">
            <Animated.Text
              style={{
                opacity: titleAnim,
                transform: [
                  {
                    translateY: titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0], // Slide from bottom to top
                    }),
                  },
                ],
              }}
              className="text-4xl font-JakartaExtraBold text-start  text-[#f0a76f] "
            >
              Ignite your Ideas with Captivating Visuals{" "}
            </Animated.Text>
            <Animated.Text
              style={{
                opacity: titleAnim,
                transform: [
                  {
                    translateY: subtitleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0], // Slide from bottom to top
                    }),
                  },
                ],
              }}
              className="text-lg font-bold mt-3 text-center  px-3 text-secondary-700"
            >
              {" "}
              Unlock your imagination and bring your creative visions to life
              like never before—get ready to turn dreams into reality! 🚀✨
            </Animated.Text>
            {/* btn */}
            <Animated.View
              style={{
                opacity: buttonAnim,
                transform: [
                  {
                    translateY: buttonAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0], // Slide from bottom to top
                    }),
                  },
                ],
              }}
              className={"w-full flex items-center"}
            >
              <CustomButton title="Get Started" onPress={NavigateToHome} />
            </Animated.View>
          </View>
        </LinearGradient>
      </Animated.View>
      <StatusBar backgroundColor="transparent" />
    </ImageBackground> 
  ); 
};

export default GetStarted;
