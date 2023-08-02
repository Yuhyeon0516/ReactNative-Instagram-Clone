import React, { useCallback, useRef } from "react";
import { CustomButton } from "./CustomButton";
import { Animated, View, useWindowDimensions } from "react-native";
import { RemoteImage } from "./RemoteImage";
import { Icon } from "./Icons";
import { Typography } from "./Typography";
import { Spacer } from "./Spacer";
import { DoubleTabButton } from "./DoubleTabButton";

export default function FeedListItem({
  image,
  isLiked,
  likeCount,
  writer,
  comment,
  onPressFeed,
  onPressFavorite,
}: {
  image: string;
  isLiked: boolean;
  likeCount: number;
  writer: string;
  comment: string;
  onPressFeed: () => void;
  onPressFavorite: () => void;
}) {
  const { width } = useWindowDimensions();

  const scaleValue = useRef(new Animated.Value(0)).current;
  const alphaValue = useRef(new Animated.Value(0)).current;

  const onPressDoubleTab = useCallback(() => {
    onPressFavorite();

    if (isLiked) return;

    scaleValue.setValue(0);
    alphaValue.setValue(1);

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        alphaValue.setValue(0);
      }, 1000);
    });
  }, [scaleValue, alphaValue, isLiked]);

  return (
    <View>
      <DoubleTabButton onPressDoubleTab={onPressDoubleTab}>
        <View style={{ width: width, height: width }}>
          <RemoteImage url={image} width={width} height={width} />
          <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, alignItems: "center", justifyContent: "center" }}>
            <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: alphaValue }}>
              <Icon iconName="heart" size={64} color="red" />
            </Animated.View>
          </View>
        </View>
      </DoubleTabButton>
      <View>
        <View style={{ flex: 1, width: width, paddingHorizontal: 12, paddingVertical: 6, flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <CustomButton onPress={onPressFavorite}>
              <View style={{}}>
                <Icon iconName={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "red" : "black"} />
              </View>
            </CustomButton>
            <Spacer space={10} horizontal />
            <Icon iconName="chatbubble-outline" size={20} color="black" />
            <Spacer space={10} horizontal />
            <Icon iconName="arrow-redo-outline" size={20} color="black" />
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Icon iconName="bookmark-outline" size={20} color="black" />
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <Typography fontSize={16}>{`좋아요 ${likeCount}개`}</Typography>
        <Spacer space={4} />
        <View style={{ flexDirection: "row" }}>
          <Typography fontSize={16}>{writer}</Typography>
          <Spacer space={8} horizontal />
          <Typography fontSize={15}>{comment}</Typography>
        </View>
      </View>
    </View>
  );
}
