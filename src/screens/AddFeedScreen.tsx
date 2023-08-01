import { View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Header } from "../components/Header/Header";
import { useRootNavigation } from "../navigations/StackNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "../components/CustomButton";
import { RemoteImage } from "../components/RemoteImage";
import { Icon } from "../components/Icons";
import MultiLineInput from "../components/MultiLineInput";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import * as ImagePicker from "expo-image-picker";

export default function AddFeedScreen() {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const canSave = useMemo(() => {
    if (!selectedPhoto) return false;
    if (!inputValue) return false;

    return true;
  }, [selectedPhoto, inputValue]);
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressGetPhoto = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) return;

    setSelectedPhoto(result.assets[0].uri);
  }, []);

  const onPressSave = useCallback(() => {
    if (!canSave) return;
  }, [canSave, selectedPhoto, inputValue]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="Add Feed" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 32 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomButton onPress={onPressGetPhoto}>
            {selectedPhoto ? (
              <RemoteImage url={selectedPhoto} width={100} height={100} />
            ) : (
              <View style={{ width: 100, height: 100, backgroundColor: "lightgray", alignItems: "center", justifyContent: "center" }}>
                <Icon iconName="add" color="gray" size={32} />
              </View>
            )}
          </CustomButton>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <MultiLineInput value={inputValue} onChangeText={setInputValue} placeholder="입력해주세요." height={80} fontSize={16} />
          </View>
        </View>
      </View>
      <CustomButton onPress={onPressSave}>
        <View style={{ backgroundColor: canSave ? "black" : "gray" }}>
          <View style={{ height: 52, alignItems: "center", justifyContent: "center" }}>
            <Typography fontSize={18} color={canSave ? "white" : "lightgray"}>
              저장하기
            </Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </CustomButton>
    </View>
  );
}
