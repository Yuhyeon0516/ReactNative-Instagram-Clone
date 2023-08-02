import { View } from "react-native";
import React, { ReactElement } from "react";
import { GestureHandlerRootView, State, TapGestureHandler } from "react-native-gesture-handler";

export function DoubleTabButton({ onPressDoubleTab, children }: { onPressDoubleTab: () => void; children: ReactElement }) {
  return (
    <GestureHandlerRootView>
      <TapGestureHandler
        numberOfTaps={2}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            onPressDoubleTab();
          }
        }}
      >
        <View>{children}</View>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
}
