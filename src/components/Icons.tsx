import { Ionicons } from "@expo/vector-icons";
import React from "react";

export type IconName = keyof typeof Ionicons.glyphMap;

export function Icon({ iconName, size, color }: { iconName: IconName; size: number; color: string }) {
  return <Ionicons name={iconName} size={size} color={color} />;
}
