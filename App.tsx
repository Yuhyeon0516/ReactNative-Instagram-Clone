import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import FeedListItem from "./src/components/FeedListItem";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FeedListItem
          image="https://docs.expo.dev/static/images/tutorial/background-image.png"
          isLiked={false}
          likeCount={10}
          writer="Yuhyeon Kim"
          comment="Test Feed"
          onPressFeed={() => {
            console.log("Press");
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
