import { FlatList, View } from "react-native";
import React, { useEffect } from "react";
import { Header } from "../components/Header/Header";
import { useTotalFeedList } from "../selectors/feed";
import FeedListItem from "../components/FeedListItem";
import { useDispatch } from "react-redux";
import { TypeFeedListDispatch, getFeedList } from "../actions/feed";
import { Spacer } from "../components/Spacer";

export default function HomeScreen() {
  const feedList = useTotalFeedList();
  const dispatch = useDispatch<TypeFeedListDispatch>();

  useEffect(() => {
    dispatch(getFeedList());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="Home" />
      </Header>
      <FlatList
        data={feedList}
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
