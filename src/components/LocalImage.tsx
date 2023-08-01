import React from "react";
import { ImageProps, Image as RNImage, StyleProp } from "react-native";

export function LocalImage({ localAsset, style, width, height }: { localAsset: number; style?: StyleProp<ImageProps>; width: number; height: number }) {
  return (
    <RNImage
      source={localAsset}
      style={[
        style,
        {
          width: width,
          height: height,
        },
      ]}
    />
  );
}
