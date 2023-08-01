import React from "react";
import { CustomButton } from "./CustomButton";
import { View, useWindowDimensions } from "react-native";
import { RemoteImage } from "./RemoteImage";
import { Icon } from "./Icons";
import { Typography } from "./Typography";
import { Spacer } from "./Spacer";

export default function FeedListItem({
  image,
  isLiked,
  likeCount,
  writer,
  comment,
  onPressFeed,
}: {
  image: string;
  isLiked: boolean;
  likeCount: number;
  writer: string;
  comment: string;
  onPressFeed: () => void;
}) {
  const { width } = useWindowDimensions();
  return (
    <CustomButton onPress={onPressFeed}>
      <View>
        <RemoteImage url={image} width={width} height={width} />
        <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
          <Icon iconName={isLiked ? "heart" : "heart-outline"} size={20} color={isLiked ? "red" : "black"} />
        </View>
        <View style={{ paddingHorizontal: 12 }}>
          <Typography fontSize={16}>{`좋아요 ${likeCount}개`}</Typography>
          <Spacer space={4} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Typography fontSize={16}>{writer}</Typography>
            <Spacer space={8} horizontal />
            <Typography fontSize={16}>{comment}</Typography>
          </View>
        </View>
      </View>
    </CustomButton>
  );
}
