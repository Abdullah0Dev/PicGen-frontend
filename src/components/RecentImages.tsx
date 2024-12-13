import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";

const _spacing = 12;
const { width } = Dimensions.get("screen");
const _imageWidth = width * 0.8;
const _imageHeight = _imageWidth * 1.8;
function Photo({
  item,
  index,
  scrollX,
}: {
  item: RecentImageDataType;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.8, 1, 1.8]
          ),
          // translateY: interpolate(
          //   scrollX.value,
          //   [index -1, index, index +1],
          //   [-30, 1, 30]
          // ),
          // rotate: `${interpolate(
          //   scrollX.value,
          //   [index - 1, index, index + 1],
          //   [15, 0, -15]
          // )}deg`,
        },
      ],
    };
  });
  const prompt = `A beautiful field of colorful flowers in full bloom, with vibrant  colors and a clear sky`;
  console.log("prompt:", item.prompt);

  return (
    <Animated.View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        overflow: "hidden",
        borderRadius: 18,
      }}
    >
      <Animated.Image
        source={{ uri: item.url }}
        style={[{ flex: 1 }, stylez]}
      />
      <View className="absolute bottom-0 pb-3 w-full bg-black/30 px-3">
        <Text className="  text-3xl font-JakartaMedium text-white  ">
          {item.prompt.length >= 120
            ? item.prompt.slice(0, 120) + "..."
            : item.prompt}
          {/* {prompt} */}
        </Text>
      </View>
    </Animated.View>
  );
}

// get scrollX

interface imageDataProps {
  url: string;
  id: number;
}

const imageData: imageDataProps[] = [
  {
    url: "https://images.pexels.com/photos/29551243/pexels-photo-29551243/free-photo-of-monochrome-ferris-wheel-in-gothenburg-park.jpeg",
    id: 1,
  },
  {
    url: "https://images.pexels.com/photos/22698026/pexels-photo-22698026/free-photo-of-wind-turbines-on-mountains-with-winding-roads.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: 2,
  },
  {
    url: "https://images.pexels.com/photos/29551243/pexels-photo-29551243/free-photo-of-monochrome-ferris-wheel-in-gothenburg-park.jpeg",
    id: 3,
  },
  {
    url: "https://images.pexels.com/photos/22698026/pexels-photo-22698026/free-photo-of-wind-turbines-on-mountains-with-winding-roads.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: 4,
  },
  {
    url: "https://images.pexels.com/photos/29551243/pexels-photo-29551243/free-photo-of-monochrome-ferris-wheel-in-gothenburg-park.jpeg",
    id: 5,
  },
  {
    url: "https://images.pexels.com/photos/22698026/pexels-photo-22698026/free-photo-of-wind-turbines-on-mountains-with-winding-roads.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: 6,
  },
];
function BackdropPhoto({
  photo,
  index,
  scrollX,
}: {
  photo: RecentImageDataType;
  index: number;
  scrollX: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
    };
  });
  return (
    <Animated.Image
      key={photo._id}
      source={{ uri: photo.url }}
      style={[StyleSheet.absoluteFillObject, stylez]}
      blurRadius={50}
    />
  );
}
interface RecentImageDataType {
  prompt: string;
  url: string;
  _id: string;
}
const RecentImages = () => {
  const [recentImageData, setRecentImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
  });

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://picgen-pro-maker.onrender.com/api/recent-images`
        );
        // console.log(response);

        const data = await response.data;
        console.log(`Data`, data);
        const mainData = {
          prompt: data?.prompt,
          url: data?.url,
        };
        setRecentImageData(data);
        console.log("Recent images", recentImageData);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Error Occurred!",
          text2: "An unexpected error occurred. Please try again later. ❌",
        });
      } finally {
        setLoading(false);
      }
    };
    loadImage();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute z-50 top-9 left-6 bg-black/30 p-3 rounded-full blur"
      >
        <MaterialIcons name={"arrow-back-ios-new"} size={18} color="white" />
      </TouchableOpacity>
      <View style={StyleSheet.absoluteFillObject}>
        {recentImageData.map((photo, index) => {
          return (
            <BackdropPhoto
              key={photo._id}
              photo={
                photo ??
                "https://images.pexels.com/photos/22698026/pexels-photo-22698026/free-photo-of-wind-turbines-on-mountains-with-winding-roads.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              index={index}
              scrollX={scrollX}
            />
          );
        })}
      </View>
      {loading ? (
        <ActivityIndicator size={50} color={"#ffffff"} />
      ) : (
        <Animated.FlatList
          horizontal
          style={{
            flexGrow: 0,
          }}
          data={recentImageData}
          renderItem={({ item, index }) => {
            return <Photo item={item} index={index} scrollX={scrollX} />;
          }}
          contentContainerStyle={{
            gap: _spacing,
            paddingHorizontal: (width - _imageWidth) / 2,
          }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item._id)}
          snapToInterval={_imageWidth + _spacing}
          onScroll={onScroll}
          scrollEventThrottle={1000 / 60} // 16 ms
        />   
      )}
      <Toast />
    </View>
  );
};

export default RecentImages;
