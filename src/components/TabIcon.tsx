import React from "react";
import { Badge } from "./Badge";
import { Icon, IconName } from "./Icons";

export function TabIcon({ visibleBadge, iconName, iconColor }: { visibleBadge: boolean; iconName: IconName; iconColor: string }) {
  if (visibleBadge) {
    return (
      <Badge>
        <Icon iconName={iconName} size={20} color={iconColor} />
      </Badge>
    );
  }

  return <Icon iconName={iconName} size={20} color={iconColor} />;
}
