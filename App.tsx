import { SafeAreaProvider } from "react-native-safe-area-context";
import RootApp from "./src/RootApp";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </SafeAreaProvider>
  );
}
