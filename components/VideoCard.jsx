import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setplay] = useState(false);

  const videoSource = {
    uri: "https://assets.mixkit.co/videos/47310/47310-720.mp4",
  };

  // Modified video player initialization
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    if (play) player.play();
  });

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
              onError={(error) =>
                console.log("Image Load Error:", error.nativeEvent)
              }
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-sm font-psemibold text-white">{title}</Text>
          </View>
        </View>
      </View>

      {play ? (
        <View className="w-full h-60 rounded-xl mt-3 overflow-hidden">
          <VideoView
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            className="w-full h-full bg-white/10"
            style={{ width: "100%", height: "100%" }}
            nativeControls={true}
            contentFit="cover"
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setplay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
            onError={(error) =>
              console.log("Image Load Error:", error.nativeEvent)
            }
          />
          <Image
            source={icons.play}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
