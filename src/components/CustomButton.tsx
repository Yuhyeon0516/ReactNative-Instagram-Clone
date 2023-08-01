import React, { ReactElement } from "react";
import { Pressable } from "react-native";

export function CustomButton({
  onPress,
  onPressIn,
  onPressOut,
  hitSlop,
  backgroundColor,
  children,
  paddingH,
  paddingV,
}: {
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  hitSlop?: { left: number; right: number; top: number; bottom: number };
  backgroundColor?: string;
  paddingH?: number;
  paddingV?: number;
  children?: ReactElement | ReactElement[];
}) {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop ?? { left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ paddingHorizontal: paddingH, paddingVertical: paddingV, backgroundColor: backgroundColor }}
    >
      {children}
    </Pressable>
  );
}
