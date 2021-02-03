import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { Student } from "../../../generated/graphql";

interface CoordinatorActionsProps {
  student: Pick<
    Student,
    "id" | "email" | "firstName" | "lastName" | "createdAt"
  >;
}

export const CoordinatorActions: React.FC<CoordinatorActionsProps> = ({}) => {
  return (
    <Menu>
      <MenuButton as={Button}>Actions</MenuButton>
      <MenuList>
        <MenuItem>Edit Details</MenuItem>
        <MenuItem>Remove</MenuItem>
        <MenuItem>Assign to Coach</MenuItem>
      </MenuList>
    </Menu>
  );
};
