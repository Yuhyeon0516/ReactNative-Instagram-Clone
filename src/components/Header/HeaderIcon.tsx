import React from "react";
import { CustomButton } from "../CustomButton";
import { Icon, IconName } from "../Icons";

export function HeaderIcon({ onPress, iconName }: { onPress: () => void; iconName: IconName }) {
  return (
    <CustomButton onPress={onPress}>
      <Icon iconName={iconName} size={28} color="black" />
    </CustomButton>
  );
}
