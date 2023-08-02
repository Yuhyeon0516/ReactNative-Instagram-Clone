import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { CustomButton } from "./CustomButton";
import { Typography } from "./Typography";

test("Custom Button Test", async () => {
  const onPressed = jest.fn();
  const expectedButtonName = "Test_Button";

  render(
    <CustomButton onPress={onPressed}>
      <Typography>{expectedButtonName}</Typography>
    </CustomButton>
  );

  expect(screen.toJSON()).toMatchSnapshot();

  fireEvent.press(screen.getByText(expectedButtonName));

  expect(onPressed).toHaveBeenCalled();
});
