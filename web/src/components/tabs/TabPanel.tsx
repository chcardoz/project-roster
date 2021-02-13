import React from "react";
import Box from "@material-ui/core/Box";
import { Direction } from "@material-ui/core/styles/createMuiTheme";

interface TabPanelProps {
  index: number;
  value: number;
  dir: Direction;
}
export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...props
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...props}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
