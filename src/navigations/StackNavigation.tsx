import React from "react";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import FeedListScreen from "../screens/FeedListScreen";
import AddFeedScreen from "../screens/AddFeedScreen";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type StackPramList = {
  Tab: undefined;
  FeedList: {
    list: {
      id: string;
      content: string;
      writer: string;
      image: string;
      likeCount: number;
    }[];
  };
  AddFeed: undefined;
};

const Stack = createNativeStackNavigator<StackPramList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: "containedModal" }}>
      <Stack.Screen name="Tab" component={TabNavigation} />
      <Stack.Screen name="FeedList" component={FeedListScreen} />
      <Stack.Screen name="AddFeed" component={AddFeedScreen} />
    </Stack.Navigator>
  );
}

export function useRootNavigation<RouteName extends keyof StackPramList>() {
  return useNavigation<NativeStackNavigationProp<StackPramList, RouteName>>();
}

export function useRootRoute<RouteName extends keyof StackPramList>() {
  return useRoute<RouteProp<StackPramList, RouteName>>();
}
