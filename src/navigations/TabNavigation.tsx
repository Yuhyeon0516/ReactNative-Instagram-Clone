import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MyPageScreen from "../screens/MyPageScreen";
import { IconName } from "../components/Icons";
import { TabIcon } from "../components/TabIcon";

type TabParamList = {
  Home: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        function getIconName(): IconName {
          if (route.name === "Home") return "person";

          return "home";
        }

        const routeIconName = getIconName();

        return {
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <TabIcon iconColor={color} iconName={routeIconName} visibleBadge={false} />;
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
