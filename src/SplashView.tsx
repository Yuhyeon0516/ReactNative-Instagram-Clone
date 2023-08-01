import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Typography } from "./components/Typography";

export default function SplashView({ onFinishLoad }: { onFinishLoad: () => void }) {
  useEffect(() => {
    setTimeout(() => {
      onFinishLoad();
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Typography fontSize={36}>Splash View</Typography>
    </View>
  );
}
