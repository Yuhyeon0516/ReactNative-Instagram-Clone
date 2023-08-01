import { SafeAreaProvider } from "react-native-safe-area-context";
import RootApp from "./src/RootApp";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({ webClientId: "119531477593-kcak8q13r0gp4gah969ktlds9jk4h510.apps.googleusercontent.com" });

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </SafeAreaProvider>
  );
}
