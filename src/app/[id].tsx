import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton } from "@/components";
import Animated from "react-native-reanimated";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
import * as Sharing from "expo-sharing"; // Import the library
import { Asset } from "expo-asset";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  copyImageToClipboard,
  downloadAndSaveImage,
  shareImage,
} from "@/utils/Image";
export interface PostData {
  prompt: string;
  image: string;
}
2;  

const GeneratedImage = () => {
  const { postData }: { postData?: string } = useLocalSearchParams();
  // Parse postData if it exists, fallback to an empty object
  const { prompt = "", image = "" }: Partial<PostData> = postData
    ? JSON.parse(postData)
    : {};
  console.log(prompt, image, postData);

  const [imageUri, setImageUri] = useState<string | null>("");
  const handlePress = async () => {
    console.log("brh");
  };

  // load image
  // Download the HTTPS image to the app's local file system
  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageUrl = image; // Use your actual URL here
        const fileUri = `${FileSystem.documentDirectory}downloadedImage.jpg`;
  
        const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
        setImageUri(uri); // Set the downloaded file URI

        console.log("Image loaded successfully:", uri);
      } catch (error) {
        console.error("Error loading image:", error);
        Toast.show({
          type: "error",
          text1: "Download Error",
          text2: "Unable to download the image.",
        });
      }
    };

    loadImage();
  }, [image]);

  // Save the downloaded image to the device's media library
  const saveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "You need to grant storage permissions to save the image.",
        });
        return;
      }

      if (imageUri) {
        await MediaLibrary.saveToLibraryAsync(imageUri);
        console.log("Image successfully saved");

        Toast.show({
          type: "success",
          text1: "Success!",   
          text2: "Image saved successfully 🎉",
        });
      } else {
        console.error("No image URI found!");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      Toast.show({
        type: "error",
        text1: "Save Error",
        text2: "Unable to save the image.",
      });
    }
  };
  const shareImage = async () => {
    try {
      const message =
        "you can download teh app and generate better with your imaginations";
      // if (imageUri) {
      await Sharing.shareAsync(imageUri, {
        dialogTitle: message,
        mimeType: "image/webp",
      });
      // }
    } catch (error) {
      console.log("not working");
    }
  };
  const deleteImage = async () => {
    router.back();
  };

  const handleTools = [
    {
      icon: "trash",
      handlePress: deleteImage,
    },
    {
      icon: "share",
      handlePress: shareImage,
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: image }} className="w-full h-[55vh]" />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-9 left-6 bg-black/20 p-3 rounded-full blur"
      >
        <MaterialIcons name={"arrow-back-ios-new"} size={18} color="white" />
      </TouchableOpacity>
      <Animated.View className={"w-full flex items-center"}>
        <CustomButton title="Download" onPress={saveImage} />
      </Animated.View>
      <View className="h-fit mx-5 py-4 mt-5 shadow bg-white rounded-xl">
        {/* will change it later to the prompt that you've entered */}
        <Text className="text-black px-3 text-lg font-semibold">{prompt}</Text>
      </View>
      {/* controllers */}
      <View className="flex pb-24 flex-row justify-center gap-x-5 mt-5 items-center">
        {handleTools.map((item, index) => (
          <TouchableOpacity
            onPress={item.handlePress}
            key={index}
            className={`py-4 w-[40%] flex items-center justify-center rounded-xl ${
              index === 1 ? "bg-[#ff7e5f]" : "bg-[#feb47b]"
            } shadow`}
          >
            <Fontisto name={item.icon} size={24} color="white" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Toast Notification */}
      <Toast />
      {/* status bar */}
      <StatusBar style="inverted" />
    </ScrollView>
  );
};

export default GeneratedImage;
