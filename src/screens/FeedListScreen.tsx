import { FlatList, View } from "react-native";
import React from "react";
import { Header } from "../components/Header/Header";
import FeedListItem from "../components/FeedListItem";
import { Spacer } from "../components/Spacer";
import { useRootNavigation, useRootRoute } from "../navigations/StackNavigation";
import { useDispatch } from "react-redux";
import { TypeFeedListDispatch, favoriteFeed } from "../actions/feed";
import { useMyInfo } from "../selectors/user";

export default function FeedListScreen() {
  const route = useRootRoute<"FeedList">();
  const navigation = useRootNavigation<"FeedList">();
  const dispatch = useDispatch<TypeFeedListDispatch>();
  const myInfo = useMyInfo();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="Feed List" />
        <Header.Icon iconName="close" onPress={() => navigation.goBack()} />
      </Header>
      <FlatList
        data={route.params.list}
        renderItem={({ item }) => {
          return (
            <FeedListItem
              image={item.image}
              comment={item.content}
              isLiked={item.likeHistory.filter((like) => like === myInfo?.uid || "Unknown").length > 0}
              likeCount={item.likeHistory.length}
              writer={item.writer.name}
              onPressFeed={() => {
                console.log("Press Feed");
              }}
              onPressFavorite={() => {
                dispatch(favoriteFeed(item));
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <Spacer space={24} />}
      />
    </View>
  );
}
