import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type CustomButtonType = {
  title: string;
  onPress?: () => void;
  containerClassName?: string;
  startColor?: string;
  endColor?: string;
  textClassName?: string;
  loading?: boolean;
  disabled?: boolean;
};

const CustomButton: React.FC<CustomButtonType> = ({
  title,
  onPress,
  containerClassName = "",
  textClassName = "text-2xl text-white font-semibold",
  startColor = "#ff7e5f",
  endColor = "#feb47b",
  loading,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-[95%] ${
        loading ? "opacity-70" : "opacity-100"
      } mt-5 ${containerClassName}`}
      disabled={disabled}
    >
      <LinearGradient
        colors={[startColor, endColor]}
        // className=" py-4 px-4 items-center justify-center"
        
        style={{ borderRadius: 60, paddingHorizontal: 20, paddingVertical: 15, alignContent: 'center' }}
      >
        <Text className={textClassName} style={{textAlign: "center"}}>
          {" "}
          {loading ? "Generating.." : title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
