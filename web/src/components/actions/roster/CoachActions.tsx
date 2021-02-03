import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { Student } from "../../../generated/graphql";

interface CoachActionsProps {
  student: Pick<
    Student,
    "id" | "email" | "firstName" | "lastName" | "createdAt"
  >;
}

export const CoachActions: React.FC<CoachActionsProps> = ({ student }) => {
  return (
    <Menu>
      <MenuButton as={Button}>Actions</MenuButton>
      <MenuList>
        <MenuItem>Record outreach</MenuItem>
        <MenuItem>Record meeting</MenuItem>
        <MenuItem>Request to be removed</MenuItem>
      </MenuList>
    </Menu>
  );
};
