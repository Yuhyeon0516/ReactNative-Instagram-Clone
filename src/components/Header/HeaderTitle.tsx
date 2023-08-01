import React from "react";
import { Typography } from "../Typography";

export function HeaderTitle({ title }: { title: string }) {
  return <Typography fontSize={18}>{title}</Typography>;
}
