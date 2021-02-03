import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";

interface CoachActionsProps {}

export const CoachActions: React.FC<CoachActionsProps> = ({}) => {
  return (
    <Menu>
      <MenuButton as={Button}>Actions</MenuButton>
      <MenuList>
        <MenuItem>Edit Details</MenuItem>
        <MenuItem>Remove</MenuItem>
      </MenuList>
    </Menu>
  );
};
