import { FlatList, View, useWindowDimensions } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Header } from "../components/Header/Header";
import { useMyFeedList } from "../selectors/user";
import { CustomButton } from "../components/CustomButton";
import { RemoteImage } from "../components/RemoteImage";
import { useRootNavigation } from "../navigations/StackNavigation";
import { useDispatch } from "react-redux";
import { TypeUserInfoDispatch, getMyFeedList } from "../actions/user";

export default function MyPageScreen() {
  const data = useMyFeedList();
  const rootNavigation = useRootNavigation();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch<TypeUserInfoDispatch>();

  const photoSize = useMemo(() => {
    return width / 3;
  }, [width]);

  useEffect(() => {
    dispatch(getMyFeedList());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="My Page" />
      </Header>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <CustomButton
              onPress={() => {
                rootNavigation.navigate("FeedList", { list: data });
              }}
            >
              <RemoteImage url={item.image} width={photoSize} height={photoSize} />
            </CustomButton>
          );
        }}
      />
    </View>
  );
}
