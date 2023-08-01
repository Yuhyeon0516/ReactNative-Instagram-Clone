import { FlatList, View } from "react-native";
import React from "react";
import { Header } from "../components/Header/Header";
import FeedListItem from "../components/FeedListItem";
import { Spacer } from "../components/Spacer";
import { useRootNavigation, useRootRoute } from "../navigations/StackNavigation";

export default function FeedListScreen() {
  const route = useRootRoute<"FeedList">();
  const navigation = useRootNavigation<"FeedList">();

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
