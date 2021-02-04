import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Student } from "../generated/graphql";
import { StudentContext } from "./student-context";

interface StudentModalStateProps {}

export const StudentModalState: React.FC<StudentModalStateProps> = ({
  children,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [student, setStudent] = useState<
    Pick<Student, "id" | "email" | "firstName" | "lastName" | "createdAt">
  >();

  const updateStudent = (
    _student: Pick<
      Student,
      "id" | "email" | "firstName" | "lastName" | "createdAt"
    >
  ) => {
    setStudent(_student);
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
