import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { StudentContext } from "../../../context/student-context";
import { Student } from "../../../generated/graphql";

interface CoachActionsProps {
  student: Pick<
    Student,
    "id" | "email" | "firstName" | "lastName" | "createdAt"
  >;
}

export const CoachActions: React.FC<CoachActionsProps> = ({ student }) => {
  return (
    <StudentContext.Consumer>
      {(context) => (
        <Menu>
          <MenuButton as={Button}>Actions</MenuButton>
          <MenuList>
            <MenuItem>Record outreach</MenuItem>
            <MenuItem
              onClick={() => {
                console.log(student.firstName);
                context.updateStudent(student);
                context.onOpen();
              }}
            >
              Record meeting
            </MenuItem>
            <MenuItem>Request to be removed</MenuItem>
          </MenuList>
        </Menu>
      )}
    </StudentContext.Consumer>
  );
};
