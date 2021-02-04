import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { StudentContext } from "./student-context";

interface StudentModalStateProps {}

export const StudentModalState: React.FC<StudentModalStateProps> = ({
  children,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [student, setStudent] = useState("");

  const updateStudent = (_student: string) => {
    console.log(student);
  };

  return (
    <StudentContext.Provider
      value={{
        onClose,
        onOpen,
        isOpen,
        student,
        updateStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
