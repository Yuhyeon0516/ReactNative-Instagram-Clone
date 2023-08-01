import { FlatList, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useTotalFeedList } from "../selectors/feed";
import FeedListItem from "../components/FeedListItem";
import { useDispatch } from "react-redux";
import { TypeFeedListDispatch, getFeedList } from "../actions/feed";
import { Spacer } from "../components/Spacer";
import { useRootNavigation } from "../navigations/StackNavigation";

export default function HomeScreen() {
  const data = useTotalFeedList();
  const navigation = useRootNavigation();
  const dispatch = useDispatch<TypeFeedListDispatch>();
  const onPressAdd = useCallback(() => {
    navigation.navigate("AddFeed");
  }, []);

  useEffect(() => {
    dispatch(getFeedList());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="Home" />
        <Header.Icon iconName="add" onPress={onPressAdd} />
      </Header>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <FeedListItem
              image={item.image}
              comment={item.content}
              isLiked={false}
              likeCount={item.likeHistory.length}
              writer={item.writer.name}
              onPressFeed={() => {
                console.log("Press Feed");
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <Spacer space={24} />}
      />
    </View>
  );
}
