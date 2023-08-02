import { SafeAreaProvider } from "react-native-safe-area-context";
import RootApp from "./src/RootApp";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import "react-native-gesture-handler";
import mobileAds, { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { useEffect } from "react";

GoogleSignin.configure({ webClientId: "119531477593-kcak8q13r0gp4gah969ktlds9jk4h510.apps.googleusercontent.com" });

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    console.log(adapterStatuses);
  });

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{ requestNonPersonalizedAdsOnly: true }} />
      </Provider>
    </SafeAreaProvider>
  );
}
