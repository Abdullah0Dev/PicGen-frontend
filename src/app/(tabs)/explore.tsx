import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  Keyboard,
  TouchableOpacity,
  Linking,
} from "react-native";
import { colorScheme, useColorScheme } from "nativewind";
import { CustomButton, InputField } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import Toast from "react-native-toast-message";
import Collapsible from "react-native-collapsible";
import { APIKeyContext } from "@/context/APIKeyContext";
// Use imperatively to set the initial theme (optional)
colorScheme.set("light");

const Setting = () => {
  const { colorScheme: currentScheme, setColorScheme } = useColorScheme();
  // const [APIKey, setAPIKey] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const toggleTheme = () => {
    setColorScheme(currentScheme === "light" ? "dark" : "light");
  };

  const { APIKey, saveAPIKey } = useContext(APIKeyContext);
  const [localAPIKey, setLocalAPIKey] = useState(APIKey);

  // Load API Key from AsyncStorage when the component is mounted
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
        setIsCollapsed(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSave = () => {
    if (localAPIKey.startsWith("sk-")) {
      saveAPIKey(localAPIKey);
      console.log("API KEY->:", APIKey);
      
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "API Key saved successfully 🎉",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid API Key!",
        text2: "The API Key must start with 'sk-' ❌",
      });
    }
  };
  return (
    <View className="flex-1 h-full flex p-4 bg-white dark:bg-gray-900">
      <Text className="text-3xl font-bold text-center pt-9 text-black dark:text-white">
        App Setting
      </Text>

      {/* Theme Switch */}
      {/* <View className="mt-10 items-center flex flex-row justify-center gap-x-4">
        <Text className="text-lg text-gray-800 dark:text-gray-300">
          {currentScheme === "light" ? "Light Mode" : "Dark Mode"}
        </Text>
        <Switch
          value={currentScheme === "dark"}
          onValueChange={toggleTheme}
          thumbColor={currentScheme === "dark" ? "#f4f3f4" : "#333"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View> */}
      <View className="mt-10 items-center flex flex- row justify-center gap-x-4">
        <Text className="text-lg text-gray-800 dark:text-gray-300">
          API Key
        </Text>
        <InputField
          value={localAPIKey}
          onChangeText={setLocalAPIKey}
          placeholder="sk-eif**************bqz"
        />
      </View>
      <CustomButton
        containerClassName={`absolute self-center ${
          isKeyboardVisible ? "bottom-16" : "bottom-32"
        }`}
        onPress={handleSave}
        title="Save"
      />
      {/* how to get the API KEY */}
      {/* Collapsible Section for How to Get the API Key */}
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <Text className="text-lg text-blue-500 mt-5">
          How to Get Your API Key? 👇
        </Text>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        <View className="mt-4 bg-gray-100 p-4 rounded-lg">
          <Text className="text-lg text-gray-800 dark:text-gray-300">
            Follow these simple steps to get your API Key 🚀:
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            1️⃣ Sign up at:{" "}
            <Text
              className="text-blue-500"
              onPress={() => Linking.openURL("https://platform.stability.ai/")}
            >
              https://platform.stability.ai/
            </Text>
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            2️⃣ Make sure to confirm your email and ensure you have more than 7
            credits at:{" "}
            <Text
              className="text-blue-500"
              onPress={() =>
                Linking.openURL("https://platform.stability.ai/account/credits")
              }
            >
              https://platform.stability.ai/account/credits
            </Text>
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            3️⃣ Go to your API Keys page:{" "}
            <Text
              className="text-blue-500"
              onPress={() =>
                Linking.openURL("https://platform.stability.ai/account/keys")
              }
            >
              https://platform.stability.ai/account/keys
            </Text>
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            4️⃣ Copy your API Key and paste it into the field above, then hit
            "Save" 💾
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            And you're done! 🎉
          </Text>
        </View>
      </Collapsible>

      <Toast />
    </View>
  );
};

export default Setting;
