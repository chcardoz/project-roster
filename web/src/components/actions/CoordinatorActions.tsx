import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";

interface CoordinatorActionsProps {}

export const CoordinatorActions: React.FC<CoordinatorActionsProps> = ({}) => {
  return (
    <Menu>
      <MenuButton as={Button}>Actions</MenuButton>
      <MenuList>
        <MenuItem>Request to be removed</MenuItem>
        <MenuItem>Edit Details</MenuItem>
        <MenuItem>Remove</MenuItem>
        <MenuItem>Add outreach</MenuItem>
        <MenuItem>Add a meeting</MenuItem>
      </MenuList>
    </Menu>
  );
};
