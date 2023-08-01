import React from "react";
import { ImageProps, Image as RNImage, StyleProp } from "react-native";

export function RemoteImage({ url, style, width, height }: { url: string; style?: StyleProp<ImageProps>; width: number; height: number }) {
  return <RNImage source={{ uri: url }} style={[style, { width: width, height: height }]} />;
}
