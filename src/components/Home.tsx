import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { CustomButton } from "@/components";
import AntDesign from "react-native-vector-icons/AntDesign";
import AnimatedNumbers from "react-native-animated-numbers";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { PostData } from "@/app/[id]";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeModal from "react-native-modal";
import LottieView from "lottie-react-native";
import { APIKeyContext } from "@/context/APIKeyContext";
const HomeScreen = () => {
  const [text, setText] = useState("");
  const [navigatePrompt, setNavigatePrompt] = useState("bad quality");
  const [showNegativePromptField, setShowNegativePromptField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textLength, setTextLength] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState(AspectRationData[0].ratio);
  const { APIKey } = useContext(APIKeyContext);
  const height = useSharedValue(0); // Animation value for height
  const opacity = useSharedValue(0); // Animation value for opacity
  const [model, setModel] = useState<ModelType[]>([
    {
      modelName: "Dynamic",
      modelImage:
        "https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F5925736%2Fcover_image%2Fretina_500x200%2FUntitled-0152678286b0a762e2fdd8a26da25180.png",
    },
    {
      modelName: "Classic",
      modelImage:
        "https://cdn.pixabay.com/photo/2023/04/13/17/49/dare-7923106_640.jpg",
    },
    {
      modelName: "Digital",
      modelImage:
        "https://emudhra.com/hubfs/Imported_Blog_Media/Z9zIzio7SX3Ys9vlfCnh.webp",
    },
  ]);

  const [selectedModel, setSelectedModel] = useState(model[0]);

  const rotation = useSharedValue(0); // Initial rotation value
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const handleTextChange = (input: string) => {
    if (input.length <= 3500) {
      setText(input);
      setTextLength(input.length);
    }
  };
  const handleNegativePromptChange = (input: string) => {
    setNavigatePrompt(input);
  };
  const { width } = Dimensions.get("window");
  const phone_height = Dimensions.get("window").height;

  const handleResetChange = () => {
    setText("");
    setTextLength(0);
    rotation.value = withTiming(720, { duration: 1000 }, () => {
      // Reset the rotation to 0 after the animation
      rotation.value = 0;
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // handleSelectRatio
  const handleSelectRatio = (aspect: AspectRatioProps) => {
    setSelectedRatio(aspect.ratio);
  };
  interface ModelType {
    modelName: string;
    modelImage: string;
  }
  const handleSelectModel = (model: ModelType) => {
    setSelectedModel(model);
  };
  // handleGenerate
  const handleGenerate = async () => {
    console.log("API KEY:", APIKey);
    // create a request to the backend...
    setLoading(true);
    try {
      const response = await fetch(
        "https://picgen-api.devmindslab.com:8445/api/generate-image",
        {
          // replace it with 10.0.2.2
          method: "POST",
          headers: {
            // it doesn't giving good results because the headers..
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            prompt: text,
            negative_prompt: navigatePrompt,
            aspect_ratio: selectedRatio,
            api_key: APIKey,
          }),
        }
      );
      console.log(response);

      if (!response.ok) {
        console.log("Error fetching DATA", response.status);
        Toast.show({
          type: "error",
          text1: "Failed to generate Image!",
          text2:
            "You run out of credits Make sure you provide a new API Key in the setting tab ❌",
        });
        return;
      }
      // if it's ok proceed, and set the data to response...

      const data = await response.json();
      console.log("Image generated:", data);
      if (!data.imageUrl) {
        console.error("Image data is missing from the response");
        Toast.show({
          type: "error",
          text1: "Image generation failed!",
          text2: "The response does not contain an image. Please try again. ❌",
        });
        return; // Exit early if the image is missing
      }
      const imgUrl = data.imageUrl;
      const post: PostData = {
        prompt: text,
        image: imgUrl,
      };
      function getRandomWords(str, numWords = 3) {
        const words = str.split(" ");
        return words
          .sort(() => 0.5 - Math.random())
          .slice(0, numWords)
          .join("-");
      }

      router.push({
        pathname: `/${getRandomWords(post.prompt)}`,
        params: { postData: JSON.stringify(post) },
      });

      console.log(post);
    } catch (error) {
      console.log("Error fetching data from the backend: ", error);
      Toast.show({
        type: "error",
        text1: "Error Occurred!",
        text2: "An unexpected error occurred. Please try again later. ❌",
      });
    } finally {
      setLoading(false);
      setText("");
      setTextLength(0);
      setNavigatePrompt("");
    }
  };
  const handleGenerateTest = async () => {
    router.push("/asi323e");
  };
  const handleShowComingSoon = () => {
    Toast.show({
      type: "error",
      text1: "Coming Soon",
      text2: "This feature we're going to add in the next update.",
    });
  };
  // setShowNegativePromptField
  const handleShowTextInputForNegativePrompt = () => {
    const isExpanding = !showNegativePromptField;
    setShowNegativePromptField(isExpanding);

    const animationDuration = isExpanding ? 500 : 900;

    height.value = withTiming(isExpanding ? 200 : 0, {
      duration: animationDuration,
    });
    opacity.value = withTiming(isExpanding ? 1 : 0, {
      duration: animationDuration,
    });
  };
  // Animated styles
  const animatedPromptStyle = useAnimatedStyle(() => ({
    height: height.value, // Height animates
    opacity: opacity.value, // Opacity animates
    overflow: "hidden", // Ensures content doesn't overflow
  }));
  const addons = [
    {
      onPress: handleShowComingSoon,
      title: "Add Photo",
      icon: <Ionicons name="image-outline" size={24} color="#ADADAD" />,
    },
    {
      onPress: handleShowTextInputForNegativePrompt,
      title: "Negative Prompt",
      icon: <FontAwesome6 name="lightbulb" size={24} color="#ADADAD" />,
    },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-white dark:b g-black p-4 flex-1 h-full"
    >
      <View>
        <View className="my-5 flex flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.push("/recent-images")}>
            <Entypo name="images" style={{ fontSize: 26, color: "#feb47b" }} />
          </TouchableOpacity>
          <View />
          <View className="flex flex-row gap-x-4  item-center">
            <TouchableOpacity
              onPress={handleShowComingSoon}
              className="bg-[#ff7e5f] flex flex-row gap-x-1 py-1 justify-center items-center px-2 rounded-full"
            >
              <FontAwesome6
                name="crown"
                style={{ fontSize: 20, color: "#feb47b" }}
              />
              <Text className="text-white text-base font-bold"> PRO </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* prompt */}
      <View className="h-[30vh] rounded-3xl bg-white shadow-2xl drop-shadow-md p-4 ">
        <Text className="text-black text-xl mt-4 font-semibold">
          {" "}
          Enter Prompt{" "}
        </Text>
        <TextInput
          placeholder="Type anything...."
          placeholderTextColor={"#ADADAD"}
          multiline={true}
          value={text}
          onChangeText={handleTextChange} // will do it later..
          style={{
            textAlignVertical: "top", // Ensures text starts from the top
          }}
          className="text-lg font-regular rounded-lg flex-wrap text-black/90 w-full h-[70%]"
        />
        <View className="flex flex-row justify-between items-center">
          <AnimatedTouchableOpacity
            style={animatedStyle}
            onPress={handleResetChange}
          >
            <AntDesign name="reload1" size={26} color={"#ff7e5f"} />
          </AnimatedTouchableOpacity>
          <View className="flex flex-row items-center gap-x-6">
            <View
              className={`flex items-center flex-row justify-center   `}
              style={[
                textLength >= 100 && { gap: 16 },
                // textLength >= 3500 && { gap: 40 },
                textLength >= 10 && textLength < 100 && { gap: 8 },
                textLength >= 100 && textLength < 3500 && { gap: 26 },
              ]}
            >
              <AnimatedNumbers
                fontStyle={{ fontSize: 16, fontWeight: "bold" }}
                containerStyle={{ width: 9 }}
                animateToNumber={textLength}
              />
              <Text className="text-lg font-semibold  text-black/70 ">
                {/* <AnimatedText animateToNumber={textLength} />  */}
                {""} /3500{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* addons ... */}
      <View className="flex flex-col h- ">
        <View className="flex flex-row mt-5 justify-around">
          {addons.map((item, index) => (
            <TouchableOpacity
              onPress={item.onPress}
              className={` flex flex-row bg-white items-center gap-x-3 px-4 py-3 rounded-2xl shadow ${
                index === 0 && "opacity-50"
              }`}
              key={index}
            >
              <View>{item.icon}</View>
              <Text className="text-black text-base font-semibold">
                {" "}
                {item.title}{" "}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* {showNegativePromptField && ( */}
        <Animated.View
          style={animatedPromptStyle}
          className="bg-white shadow-xl mt-3 px-3 mx-5 right-1"
        >
          <TextInput
            placeholder="bad quality...."
            placeholderTextColor={"#ADADAD"}
            multiline={true}
            style={{ textAlignVertical: "top" }}
            className="text-lg font-regular rounded-lg flex-wrap text-black/90 w-full min-h-52"
            value={navigatePrompt}
            onChangeText={handleNegativePromptChange}
          />
        </Animated.View>
        {/* )} */}
      </View>
      {/* select MOdels */}
      <View className="my-5 rounded-xl bg-white drop-shadow-md shadow-xl pt-3 pb-5 px-4">
        <Text className="text-black text-xl my-3 capitalize font-semibold">
          Select Model
        </Text>
        <View className=" ">
          <FlatList
            data={model}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectModel(item)}
                className={`${
                  item.modelName === selectedModel.modelName
                    ? "border-[#ff7e5f] border-4 "
                    : "bg-black/5"
                } w-60 h-52  flex justify-center items-center justify-items-center rounded-md py-2 px-3 `}
              >
                <Image
                  source={{ uri: item.modelImage }}
                  className="w-full h-4/5"
                />
                <Text
                  className={`${
                    item.modelName === selectedModel.modelName
                      ? "text-[#ff7e5f]"
                      : "text-black"
                  } self-center font-bold text-xl `}
                >
                  {" "}
                  {item.modelName}{" "}
                </Text>
              </Pressable>
            )}
            horizontal
            removeClippedSubviews={false}
            // onViewableItemsChanged={(item) => setSelectedModel(item)}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => <View className="w-6" />}
            ListHeaderComponent={() => <View className="w-6" />}
            ItemSeparatorComponent={() => <View className="w-6" />}
            keyExtractor={(item) => item.modelName}
          />
        </View>
      </View>
      {/* <View className="h-32  ">
        <Image
          source={require("@/assets/images/ad.png")}
          className="object-contain w-32"
        />
      </View> */}
      {/* Aspect Ratio */}
      <View className="my-5 rounded-xl bg-white drop-shadow-md shadow-xl pt-3 pb-5 px-4">
        <Text className="text-black text-xl my-3 capitalize font-semibold">
          Aspect Ratio
        </Text>
        <View className="flex flex-row gap-x-5 gap-y-4   flex-wrap">
          {AspectRationData.map((item, index) => (
            <Pressable
              onPress={() => handleSelectRatio(item)}
              key={index}
              className={`${
                item.ratio === selectedRatio ? "bg-[#ff7e5f]" : "bg-black/5"
              } w-[27%] flex justify-center items-center justify-items-center rounded-md py-2 px-3 `}
            >
              <Text
                className={`${
                  item.ratio === selectedRatio ? "text-white" : "text-black"
                } self-center font-medium text-base `}
              >
                {" "}
                {item.ratio}{" "}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <ReactNativeModal
        isVisible={loading}
        style={{
          position: "absolute",
          top: phone_height * 0.32,
          marginLeft: width * 0.13,
        }}  
      >
        <View className="bg-white   rounded-3xl h-80 flex justify-center items-center">
          <LottieView
            autoPlay
            style={{
              width: 300,
              height: 300,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={{
              uri: `https://lottie.host/fda911a6-d5cd-4daa-8720-7e74d87d5d81/v9hWZf3bGQ.lottie`,
            }}
          />
          <Text className="text-xl absolute bottom-5">Generating Image...</Text>
        </View>
      </ReactNativeModal>
      {/* generate btn */}
      <View className=" pb-24">
        <CustomButton
          loading={loading}
          disabled={loading || textLength < 3}
          onPress={handleGenerate}
          title="Generate"
        />
      </View>
      <Toast />
      <StatusBar style="dark" />
    </ScrollView>
  );
};

export default HomeScreen;

//aspect ratio props
type AspectRatioProps = {
  ratio: string;
};
const AspectRationData: AspectRatioProps[] = [
  {
    ratio: "1:1",
  },
  {
    ratio: "9:16",
  },
  {
    ratio: "16:9",
  },
  {
    ratio: "3:2",
  },
  {
    ratio: "2:3",
  },
  {
    ratio: "4:2",
  },
  {
    ratio: "5:4",
  },
  {
    ratio: "4:5",
  },
  {
    ratio: "9:21",
  },
  {
    ratio: "21:9",
  },
];
