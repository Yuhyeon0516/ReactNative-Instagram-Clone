import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { TypeUserInfoDispatch, signIn } from "./actions/user";

export default function SplashView({ onFinishLoad }: { onFinishLoad: () => void }) {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const dispatch = useDispatch<TypeUserInfoDispatch>();
  const appInit = useCallback(async () => {
    try {
      const { idToken } = await GoogleSignin.signInSilently();
      if (idToken) {
        await dispatch(signIn(idToken));
        onFinishLoad();
      }
    } catch (error) {
      setShowLoginButton(true);
    }
  }, []);

  const onPressSignin = useCallback(async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const { idToken } = await GoogleSignin.signIn();
    if (idToken) {
      await dispatch(signIn(idToken));
      onFinishLoad();
    }
  }, []);

  useEffect(() => {
    appInit();
  }, []);

  return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>{showLoginButton && <GoogleSigninButton onPress={onPressSignin} />}</View>;
}
