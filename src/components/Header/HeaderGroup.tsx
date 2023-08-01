import React, { ReactElement } from "react";
import { View } from "react-native";

export function HeaderGroup({ children }: { children: ReactElement | ReactElement[] }) {
  return <View style={{ flexDirection: "row", alignItems: "center" }}>{children}</View>;
}
