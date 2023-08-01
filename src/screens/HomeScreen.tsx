import { View } from "react-native";
import React from "react";
import { Header } from "../components/Header/Header";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="Home" />
      </Header>
    </View>
  );
}
