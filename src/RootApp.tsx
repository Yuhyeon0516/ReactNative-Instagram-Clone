import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigations/StackNavigation";
import SplashView from "./SplashView";

export default function RootApp() {
  const [init, setInit] = useState(false);

  if (!init) return <SplashView onFinishLoad={() => setInit(true)} />;

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
